<template>
  <InputField />
</template>

<script>
import InputField from './components/InputField'

export default {
  name: 'GeoChattr',
  components: {
    InputField,
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

html, body, #app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  justify-content: center;
}

body {
  font-family: "Poppins", sans-serif;
  justify-content: center;
  font-size: 1.5rem;
  background-color: #222222;
  margin: 0;
}

#app {
  min-height: 100%;
}

</style>
