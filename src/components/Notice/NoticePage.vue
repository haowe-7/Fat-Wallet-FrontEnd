<template>
  <div>
    <el-card class="card">
      <div class="nav">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleClick">
          <el-submenu index="0">
            <el-menu-item slot="title" id="title-el-menu-item" index="0">
              <i class="el-icon-menu"></i>
              <span>{{noticeType}}</span>
            </el-menu-item>
            <el-menu-item-group title="通用消息">
              <el-menu-item index="1">
                <i class="el-icon-minus"></i>
                <span>{{noticeTypeList[0]}}</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-minus"></i>
                <span>{{noticeTypeList[1]}}</span>
              </el-menu-item>
            </el-menu-item-group>
             <el-menu-item-group title="任务消息">
              <el-menu-item index="3">
                <i class="el-icon-minus"></i>
                <span>{{noticeTypeList[2]}}</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-minus"></i>
                <span>{{noticeTypeList[3]}}</span>
              </el-menu-item>
              <el-menu-item index="5">
                <i class="el-icon-minus"></i>
                <span>{{noticeTypeList[4]}}</span>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="交互消息">
              <el-menu-item index="6">
                <i class="el-icon-minus"></i>
                <span>{{noticeTypeList[5]}}</span>
              </el-menu-item>
              <el-menu-item index="7">
                <i class="el-icon-minus"></i>
                <span>{{noticeTypeList[6]}}</span>
              </el-menu-item>
              <el-menu-item index="8">
                <i class="el-icon-minus"></i>
                <span>{{noticeTypeList[7]}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="content">
        <keep-alive>

        </keep-alive>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'NoticePage',
  components: {
  },
  data() {
    return {
      noticeTypeList: ['全部类别', '站内通知', '发起的任务', '参与的任务', '进行的任务', '关注我的', '赞同与感谢', '评论与回复'],
      noticeType: '全部类别'
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key);
    },
    handleClick(tab, event) {
      if(tab == 0) return;
      this.noticeType = this.noticeTypeList[tab-1];
      console.log(this.noticeType);
    }
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

.content {
  display: inline-block;
  margin-left: 2%;
  width: 75%;
}

#title-el-menu-item {
  padding-left: 0px ! important;
}

</style>
