<template>
  <div class="footer">
    Copyright © Sotif {{ commitHash }}
  </div>
</template>


<script>
export default {
  name: 'Footer',

  data: function() {
    return {
      commitHash: process.env.VUE_APP_GIT_HASH,
    }
  },
}

</script>

<style scoped>

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: left;
  margin-left: 10px;
  margin-bottom: 10px;
  font-size: 12px;
}

</style>
