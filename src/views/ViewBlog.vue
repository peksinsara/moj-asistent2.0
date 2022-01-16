<template>
  <div>

    <div class="post-view" v-if="currentBlog">
      <div class="container quillWrapper">
        <h2>{{ this.currentBlog[0].title }}</h2>
        <p>Course: {{ this.currentBlog[0].course }}</p>
        <p>Semester: {{ this.currentBlog[0].semester }}</p>
        <p>Cycle: {{ this.currentBlog[0].cycle }}</p>
        <h4>Posted on: {{ new Date(this.currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
        <p>Content</p>
        <div class="post-content ql-editor" v-html="this.currentBlog[0].description"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewBlog",
  data() {
    return {
      currentBlog: null,
    };
  },
  async mounted() {
    this.currentBlog = await this.$store.state.news.filter((post) => {
      return post.blogID === this.$route.params.blogid;
    });
  },
};
</script>

<style lang="scss">
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
  h2{
    font-weight: bold;
  }
}
</style>
