<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ this.title }}</h2>
      <p>{{this.course}}</p>
      <p>{{this.cycle}}</p>
      <p>{{this.semester}}</p>
     
      <div class="post-content ql-editor" v-html="description"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostPreview",
  computed: {
    title() {
      return this.$store.state.title;
    },
    course() {
      return this.$store.state.course;
    },
    semester() {
      return this.$store.state.semester;
    },
    cycle() {
      return this.$store.state.cycle;
    },
    description() {
      return this.$store.state.description;
    },
    
  },
};
</script>

<style lang="scss">
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
