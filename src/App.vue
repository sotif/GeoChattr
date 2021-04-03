<template>
</template>

<script>

export default {
  name: 'GeoChattr',
  components: {
  },
  data: function() {
    return {
      connection: null
    }
  },
  created: function() {
    console.log("Starting connection to websocket chat server.");
    this.connection = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

    this.connection.onopen = function(event) {
      console.log(event);
      console.log("Successfully connected lol");
      this.send('PASS oauth:123');
      this.send('NICK justinfan12347561');
      this.send('JOIN #sotif');
    }

    this.connection.onmessage = function(event) {
      var message = event.data.split("sotif :", 2)[1];
      console.log(message);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
