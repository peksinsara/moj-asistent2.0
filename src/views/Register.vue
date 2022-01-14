<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
      </p>
      <h2>Create Your New Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Full Name" v-model="fullName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="number" placeholder="cycle" v-model="cycle" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Department" v-model="department" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Semester" v-model="semester" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="studentID" v-model="studentID" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
export default {
  name: "Register",
  components: {
    email,
    password,
    user,
  },
  data() {
    return {
      fullName: "",
      cycle: "",
      department: "",
      semester: "",
      studentID: "",
      email: "",
      password: "",
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.fullName !== "" &&
        this.cycle !== "" &&
        this.department !== "" &&
        this.studentID !== "" &&
        this.semester !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.email);
        await dataBase.set({
          fullName: this.fullName,
          email: this.email,
          cycle: this.cycle,
          department: this.department,
          studentID: this.studentID,
          semester: this.semester,
        });
        this.$router.push({ name: "Employees" });
        return;
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields!";
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
    line-height: 30px;
  }
}
</style>
