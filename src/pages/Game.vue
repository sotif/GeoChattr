<template>
</template>

<script>
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
      ws: null
    }
  },

  updated: function() {
    var channel_name = this.channel_name;
    console.log("JOINing channel: " + channel_name);
    this.ws.send('JOIN #' + channel_name);
    this.ws.onmessage = function(event) {
      var message = event.data.split("#" + channel_name + " :", 2)[1];
      console.log(message);
    }
  },

  created: function() {
    var channel_name = this.channel_name;
    console.log("Starting connection to websocket chat server.");
    this.ws = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

    this.ws.onopen = function(event) {
      console.log(event);
      console.log("Successfully connected to " + channel_name);
      this.send('PASS oauth:123');
      this.send('NICK justinfan12347561');
      this.send('JOIN #' + channel_name);
    }

    this.ws.onmessage = function(event) {
      var message = event.data.split("#" + channel_name + " :", 2)[1];
      //console.log(event.data);
      if (message != null) {
        console.log(message);
      }
    }
  },
  beforeCreate: function() {
    document.body.className = 'game';
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
</script>

<style>

#app {
  /*min-height: 100%;*/
}

</style>
