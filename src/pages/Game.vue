<template>
  <div id="flip-list">
    <transition-group name="list" tag="ul">
      <li style="list-style-type: none; text-align: right;" v-for="(country, index) in orderedGuesses" :key="country[0]">
        {{ country[0] }} - {{ country[1] }}
      </li>
    </transition-group>
  </div>
</template>

<script>
import _ from 'lodash';
import tmi from 'tmi.js';
import countries from 'raw-loader!@/assets/countries_list.txt';

export default {
  name: 'Game',
  components: {

  },

  props: [
    'channel_name',
  ],

  data: function() {
    return {
      client: null,
      valid_guesses: [],
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      countries: null,
      guesses: {},
    }
  },

  computed: {
    orderedGuesses: function () {
      console.log(_.sortBy(_.toPairs(this.guesses), 1).reverse());
      return _.sortBy(_.toPairs(this.guesses), 1).reverse();
      //return this.guesses;
      //return _.orderBy(this.guesses, "count", "desc");
    }
  },

  updated: function() {
    if (channel_name != null) {
      this.client.join(channel_name);
    }
  },

  created: function() {
    var vm = this;
    vm.loadAnswers();

    let options = {
      options: {
        debug: true
      },
      connection: {
        reconnect: true,
        secure: true
      },
      identity: {
        username: "justinfan12345677654",
        password: "oauth:123"
      },
      channels: [ "#" + vm.channel_name ]
    }
    this.client = new tmi.client(options);
    this.client.connect();

    this.client.on("chat", (channel, userstate, message, self) => {
      // Don't listen to my own messages..
      if (self) return;
      vm.add_guess(message);
      if (userstate["mod"] || userstate["badges"]["broadcaster"] == 1) {
        console.log("mod or broadcaster said something");
        if(message.trim() == "!reset") {
          console.log("Resetting guesses");
          this.end_round();
        }
      }
      // Do your stuff.
    });

  },

  beforeCreate: function() {
    document.body.className = 'game';
  },

  methods: {
    end_round: function() {
      this.guesses = {};
    },
    add_guess: function(guess) {
      console.log("Adding guess");
      if(this.is_valid_guess(guess)) {


        this.guesses[this.valid_guesses[guess.trim().toLowerCase()]] = (this.guesses[this.valid_guesses[guess.trim().toLowerCase()]] || 0) + 1;
        console.log("Added guess!!!!!");
        console.log(this.guesses);
      }
    },

    is_valid_guess: function(guess) {
      console.log("Checking validity");
      return this.valid_guesses[guess.trim().toLowerCase()] != null;
    },

    loadAnswers: function() {
      console.log("Loading countries");
      var country_dict = {};
      var temp = countries.split("\\n");
      for(var i = 0; i < temp.length; ++i) {
        if(temp[i] != "" && temp[i] != "export default \"" && temp[i] != "\";") {
          var alternatives = temp[i].split(" -- ");
          for(var j = 0; j < alternatives.length; ++j) {
            country_dict[alternatives[j].trim().toLowerCase()] = alternatives[0].trim();
          }
        }
      }
      this.valid_guesses = country_dict;
      console.log(this.valid_guesses);
    }
  }
}
</script>

<style>

body {
  margin: 30px;
  font-size: 3em;
}

#flip-list {
  position: absolute;
  right: 65px;
}

li {
  color: orange;
  font-size: 3rem;
  text-shadow: 0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black;
}

.list-move {
  transition: transform 0.8s ease;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

</style>
