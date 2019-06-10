<template>
  <div id="mainpage">
    <MainPageNavigationBar id="mainpage-navigationbar"></MainPageNavigationBar>
    <MainPageContentModule id="mainpage-content-module"></MainPageContentModule>
  </div>
</template>

<script>
  import MainPageNavigationBar from '@/components/MainPageNavigationBar';
  import MainPageContentModule from '@/components/MainPageContentModule';
  export default {
    name: 'MainPage',
    components: {
      MainPageNavigationBar,
      MainPageContentModule
    },
    data() {
      return {
      };
    },
    methods: {
    },
    mounted() {
    }
  };
</script>

<style>

#mainpage {
  background-size: cover;
  width: 100%;
  height: 100%;
  padding: 0%;
  margin: 0%;
}

#mainpage-navigationbar {
  width: 100%;
  height: 10%;
}

#mainpage-content-module {
  width: 70%;
  height: 90%;
  margin-left: 15%;
  margin-right: 15%;
}

</style>