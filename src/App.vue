<template>
  <div id="app">
    <amplify-authenticator>
      <header class="app-header">
        <app-nav></app-nav>
      </header>
      <router-view></router-view>
      <div>
        <h1>Hey, {{user.username}}!</h1>
        <label>File
          <input type="file" id="file" ref="file" v-on:change="onFileChange()"/>
        </label>
        <label>Uploaded Files:
          <ul><li v-for="u in url" v-bind:key="u">{{ u.key }}</li></ul>
        </label>
        <div v-for="userFile in userFiles" v-bind:key="userFile" class='list-item'>
          <p class="name">{{ userFile }}</p>
        </div>
        <amplify-sign-out></amplify-sign-out>
      </div>
    </amplify-authenticator>
  </div>
</template>
<script>
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { Auth, Storage } from 'aws-amplify'
import AppNav from './components/AppNav'

Auth.currentAuthenticatedUser().then(console.log)

export default {
  name: 'app',
  data() {
    return {
      user: { },
      url: {},
      userFiles: {}
    }
  },
  components: {
    AppNav
  },
  methods: {
    onFileChange(){
      this.file = this.$refs.file.files[0];
      if (this.file)
        console.log("file is present");
      if (this.file) {
        Storage.put(`userFiles/${this.$refs.file.files[0].name}`, this.$refs.file.files[0],{ contentType: this.$refs.file.files[0].type })
        .then(result => console.log(result)) 
        .catch(err => console.log(err));
      }
    },
    getFiles() {
      Storage.list("userFiles/", {level: 'public'}).then((res) => {
        console.log("Access here url:", res)
        this.url = res
        const fileAccessURL = Storage.get(res.key, {download: true});
        console.log(fileAccessURL)
        res.forEach(item => {
          // console.log("ite key", item.key)
          this.userFiles = item.key
          Storage.get(item.key, {download: true}).then((result) => {
            console.log("get", result)
            let mimeType = result.ContentType
            let fileName = result.fileName
            console.log(mimeType, fileName)
          })
        })
      }).catch(err => console.log(err));
    },
  },  
  async created() {
    // authentication state managament
    onAuthUIStateChange((state, user) => {
      // set current user and load data after login
      if (state === AuthState.SignedIn) {
        this.user = user;
      }
    }),
    this.getFiles() 
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
  margin-top: 60px;
}
</style>
