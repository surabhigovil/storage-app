<template>
  <div>
    <amplify-authenticator>
      <img v-bind:src="{url}"/> 
      <ul><li v-for="u in url" v-bind:key="u">{{ u.key }}</li></ul>
    </amplify-authenticator>
  </div>
</template>

<script>
import Storage from '@aws-amplify/storage'

export default {
  data() {
    return {
      files: [],
      image: [],
      url: {}
    }
  },
  created() {
    this.getFiles() 
  },
  methods: {
    getFiles() {
      Storage.list("userFiles/", {level: 'public'}).then((res) => {
        console.log("Access here url:", res)
        this.url = res
      })
    }
  }
}
</script>