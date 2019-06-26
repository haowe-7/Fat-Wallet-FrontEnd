<template>
  <div>
    <el-card class="card">
      <div class="nav">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="1" class="nav-menu-item">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <router-link to="/mainpage/setting/info">个人资料</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <router-link to="/mainpage/setting/privacy">隐私</router-link>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SettingPage',
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.card {
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 3%;
  margin-bottom: 3%;
}

.nav {
  display: inline-block;
  width: auto;
  vertical-align: top;
}

.nav-menu-item {
  padding-left: 0px;
}

.content {
  display: inline-block;
  margin-left: 2%;
  width: 75%;
}

</style>
