<template>
  <div class="profile">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <div class="admin-badge">
          <adminIcon class="icon" />
          <span>admin</span>
        </div>
        <div class="input">
          <label for="fullName">Full Name:</label>
          <input type="text" id="fullName" v-model="fullName" />
        </div>
        <div class="input">
          <label for="cycle">Cycle</label>
          <input type="number" id="cycle" v-model="cycle" />
        </div>
        <div class="input">
          <label for="department">Department:</label>
          <input type="text" id="department" v-model="department" />
        </div>
        <div class="input">
          <label for="semester">Semester:</label>
          <input type="number" id="semester" v-model="semester" />
        </div>
        <div class="input">
          <label for="studentID">Student ID:</label>
          <input type="number" id="studentID" v-model="studentID" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import adminIcon from "../assets/Icons/user-crown-light.svg";
export default {
  name: "Profile",
  components: {
    Modal,
    adminIcon,
  },
  data() {
    return {
      modalMessage: "Changes were saved!",
      modalActive: null,
    };
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateUserSettings");
      this.modalActive = !this.modalActive;
    },
    closeModal() {
      this.modalActive = !this.modalActive;
    },
  },
  computed: {
    fullName: {
      get() {
        return this.$store.state.profileFullName;
      },
      set(payload) {
        this.$store.commit("changeFullName", payload);
      },
    },
    cycle: {
      get() {
        return this.$store.state.profilecycle;
      },
      set(payload) {
        this.$store.commit("changeCycle", payload);
      },
    },
    
    semester: {
      get() {
        return this.$store.state.profileSemester;
      },
      set(payload) {
        this.$store.commit("changeSemester", payload);
      },
    },
    studentID: {
      get() {
        return this.$store.state.profileStudentID;
      },
      set(payload) {
        this.$store.commit("changeStudentID", payload);
      },
    },
     department: {
      get() {
        return this.$store.state.profileDepartment;
      },
      set(payload) {
        this.$store.commit("changeDepartment", payload);
      },
    },
    email() {
      return this.$store.state.profileEmail;
    },
  },
};
</script>
<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: rgba(0, 97, 112, 0.158);
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #00E0C7;
        color: black;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #00E0C7;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: center;
        background-color: #00E0C7;
      }
    }
  }
}
</style>
