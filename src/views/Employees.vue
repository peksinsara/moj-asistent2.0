
<template>
  <div>
    <div v-for="employee in employees" :key="employee.id" class="employee-card">
      <h2>
        <div class="md-title">{{ employee.fullName }}</div>
      </h2>

      <p>Email: {{ employee.email }}</p>
      <p> Position: {{ employee.position }}</p>
      <p>Subjects: {{ employee.subjects }}</p>
    </div>
  </div>
</template>


<script>
import "../firebase/firebaseInit";
import firebase from "firebase/app";
import "firebase/firestore";
import 'vue-material/dist/vue-material.min.css'


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
.employee-card{
  padding: 10px;
  margin-left: 100px;
  margin-top:20px;
  width:30%;
      box-shadow: 2px 2px 2px 2px #d8d8d8;
    border-radius: 5px;
}
.h2{
  font-weight: bold;
}
.p{
  font-size: 14px;
}
</style>

<!-- <template>
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
</style> -->
