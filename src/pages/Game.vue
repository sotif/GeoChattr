<template>
</template>

<script>

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
  }
}
</script>

<style>

#app {
  /*min-height: 100%;*/
}

</style>
