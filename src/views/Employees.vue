<template>
  <div class="employees">
    <table class="table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="employee in employees" :key="employee.id">          <td>{{ employee.fullName }}</td>

          <td>{{ employee.Email }}</td>

          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import "../firebase/firebaseInit";
import firebase from "firebase/app";
import "firebase/firestore";


export default {
  name: "Employees",
  components: {

  },
  data() {
    return {
      employees: []
    }
  },
  created() {
    firebase.firestore().collection("employees").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {


        this.employees.push(doc.data());

        console.log(doc.id, "---", doc.data())
      })
    })
  }

};

</script>

<style lang="css" scoped>
</style>
