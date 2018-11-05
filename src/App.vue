<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "./style/index.scss"
export default {
  name: 'App'
}
</script>

<style>
    .container {
        padding: 20px;
    }
    .form{
      padding: 10px;
    }
    .title {
        text-align: center;
        color: #555;
    }
</style>
