import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    news: [],
    postLoaded: null,
    description: "Write your news content here...",
    title: "",
    course:"",
    semester:"",
    cycle:"",
    email:" ",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    authorName: null,
    profileInitials: null,
  },
  getters: {
    newsFeed(state) {
      return state.news.slice(0, 2);
    },
    newsCards(state) {
      return state.news.slice(2, 6);
    },
  },
  mutations: {
    newBlogPost(state, payload) {
      state.description = payload;
    },
    updatetitle(state, payload) {
      state.title = payload;
    },
    updateCourse(state, payload) {
      state.course = payload;
    },
    updateSemester(state, payload) {
      state.semester = payload;
    },
    updateCycle(state, payload) {
      state.cycle = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setNewsState(state, payload) {
      state.title = payload.title;
      state.course = payload.course;
      state.email = payload.email;
      state.semester = payload.semester;
      state.cycle = payload.cycle;
      state.description = payload.description;
    },
    filterNewsPost(state, payload) {
      state.news = state.news.filter((post) => post.blogID !== payload);
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
      console.log(state.profileAdmin);
    },
    setProfileInfo(state, doc) {
      state.authorName = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFullName = doc.data().fullName;
      state.profileCycle = doc.data().cycle;
      state.profileDepartment= doc.data().department;
      state.profileSemester= doc.data().semester;
      state.profileStudentID= doc.data().studentID;
      console.log(state.authorName);
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFullName.match(/(\b\S)?/g).join("");
    },
    changeFullName(state, payload) {
      state.profileFullName = payload;
    },
    changeCycle(state, payload) {
      state.profileCycle = payload;
    },
    changeSemester(state, payload) {
      state.profileSemester = payload;
    },
    changeStudentID(state, payload) {
      state.profileStudentID = payload;
    },
    changeDepartment(state, payload) {
      state.profileDepartment = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.email);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit("setProfileAdmin", admin);
    },
    async getPost({ state }) {
      const dataBase = await db.collection("news").orderBy("date", "desc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.news.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            description: doc.data().description,           
            title: doc.data().title,
            course: doc.data().course,
            semester: doc.data().semester,
            cycle: doc.data().cycle,
            department: doc.data().department,
            blogDate: doc.data().date,
          };
          state.news.push(data);
        }
      });
      state.postLoaded = true;
    },
    async updatePost({ commit, dispatch }, payload) {
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    },
    async deletePost({ commit }, payload) {
      const getPost = await db.collection("news").doc(payload);
      await getPost.delete();
      commit("filterBlogPost", payload);
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.authorName);
      await dataBase.update({
        fullName: state.profileFirstName,
        cycle: state.profileCycle,
        semester: state.profileSemester,
        department: state.profileDepartment,
        studentID: state.profileStudentID,
      });
      commit("setProfileInitials");
    },
  },
  modules: {},
});
