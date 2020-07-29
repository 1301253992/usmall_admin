<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-input class="input" clearable v-model="name" placeholder="请输入用户名"></el-input>
      <el-input class="input" clearable show-password v-model="password" placeholder="请输入密码"></el-input>
      <div class="btn-box">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$router.push("/");
    },
  },
  mounted() {},
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553444, #303d60);
}
.con {
  width: 300px;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h3 {
  line-height: 60px;
  font-size: 30px;
  text-align: center;
}
.input {
  margin-bottom: 20px;
  width: 300px;
}
.btn-box {
  text-align: center;
}
</style>