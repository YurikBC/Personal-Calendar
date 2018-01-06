<template>
  <section class="security">
    <div class="security__container">
      <div class="security__caption">Enter the password</div>
      <div class="security__input">
        <input type="password"
               v-model="formPassword"
               @keyup.enter="submitPassword"
               placeholder="Enter here">
        <div class="button" @click="submitPassword">Submit</div>
      </div>
      <div class="error">{{textError}}</div>
    </div>
  </section>
</template>

<script>
import getConstants from '../static/cosntants'
import storage from '../static/storageService'
const {
  password,
  token
} = getConstants
export default {
  data () {
    return {
      formPassword: '',
      textError: ''
    }
  },
  methods: {
    async submitPassword () {
      try {
        await this.$store.dispatch('login', {
          password: this.formPassword
        })
        this.formPassword = ''
        this.$router.push('/')
      } catch (e) {
        this.validateError()
      }
    },
    validateError (e) {
      if (this.formPassword.length < 3) {
        this.textError = 'Too short password'
      }
      if (this.formPassword !== password) {
        if (e) {
          this.textError = 'Wrong password'
        }
      }
    }
  }
}
</script>

<style>
.security {
  width: 100%;
  height: 100%;
  display: flex;
}

.security__container {
  margin-top: 20%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button {
  font-family: 'Open Sans', sans-serif;
  background-color: blue;
  color: white;
  border-radius: 20px;
  padding: 5px 10px;
  margin-left: 30px;
  cursor: pointer;
  transition: 0.1s;
}

.button:hover {
 filter: brightness(125%);
}

.button:active {
  filter: brightness(85%);
}

.security__input {
  margin-top: 20px;
  display: flex;
}
.security__input input {
  padding-left: 5px;
  border: none;
  border-bottom: 1px solid blue;
}
input:focus {
  border: none;
  outline: none;
  border-bottom: 1px solid blue;
}

.security__caption {
  font-family: 'Open Sans', sans-serif;
}

.error {
  padding-top: 10px;
  color: red;
}

</style>
