<template>
  <div>
    <amplify-authenticator>
      <img v-bind:src="{url}"/> 
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
      Storage.get("userFiles/doge2.jpg", {level: 'public'}).then(function(url){
        console.log("Access url:", url)
        this.url = url
      });
      Storage.list('userFiles/')
      .then(result => {
        this.images = result.data
        console.log(result)
      })
      .catch(err => console.error(err))
    }
  }
}
</script>