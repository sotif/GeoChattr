<template>
  <div id="flip-list-demo">
    <transition-group name="flip-list" tag="ul">
      <li style="list-style-type: none; text-align: center;" v-for="(country, index) in orderedGuesses" :key="country[0]">
        {{ country[0] }} -- {{ country[1] }}
      </li>
    </transition-group>
  </div>
</template>

<script>
import _ from 'lodash';
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
      ws: null,
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
    console.log("JOINing channel: " + channel_name);
    this.ws.send('JOIN #' + channel_name);
    this.ws.onmessage = function(event) {
      var message = event.data.split("#" + channel_name + " :", 2)[1];
      //console.log(message);
    }
  },

  created: function() {
    var vm = this;

    vm.loadAnswers();

    console.log("Starting connection to websocket chat server.");
    this.ws = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

    this.ws.onopen = function(event) {
      console.log(event);
      console.log("Successfully connected to " + vm.channel_name);
      this.send('PASS oauth:123');
      this.send('NICK justinfan12347561');
      this.send('JOIN #' + vm.channel_name);
    }

    this.ws.onmessage = function(event) {
      var message = event.data.split("#" + vm.channel_name + " :", 2)[1];
      if (message != null) {
        if(vm.is_valid_guess(message)) {
          vm.add_guess(message);
        }
      }
    }
  },

  beforeCreate: function() {
    document.body.className = 'game';
  },

  methods: {
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
}

.flip-list-move {
  transition: transform 0.8s ease;
}

</style>
