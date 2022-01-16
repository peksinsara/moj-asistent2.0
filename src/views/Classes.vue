
<template>
<div>

  <div>
    <div v-for="subject in subjects" :key="subject.id" class="subject-card">
      <h2 class="md-title">{{ subject.className }}</h2>
      <p> Professor: {{ subject.professor }}</p>
      <p> Assistant: {{ subject.assistant }}</p>
      <p> Day: {{ subject.day }}</p>
      <p> Courses: {{ subject.courses }}</p>
      <p> Cycle: {{ subject.cycle }}</p>
      <p> Semester: {{ subject.semester }}</p>
      <div class="timing">
      <p> Lecture: {{ subject.lecture }}</p>
      <p> Practice: {{ subject.practice }}</p>
      </div>
      
    </div>
  </div>
  </div>
</template>


<script>
import "../firebase/firebaseInit";
import firebase from "firebase/app";
import "firebase/firestore";



export default {
  name: "Classes",
  components: {

  },
  data() {
    return {
      subjects: []
    }
  },
  created() {
    firebase.firestore().collection("subjects").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.subjects.push(doc.data());
      })
    })
  }

};

</script>

<style>
.subject-card {
  padding: 10px;
  margin-left: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 30%;
  box-shadow: 2px 2px 2px 2px #d8d8d8;
  border-radius: 5px;
}
.h2 {
  font-weight: bold;
}
.p {
  font-size: 14px;
}
.timing p{
    color:red;
    font-weight: bold;
}
</style>