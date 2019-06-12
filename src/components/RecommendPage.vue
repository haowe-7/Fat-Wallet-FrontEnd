<template>
  <div>
    <div v-for="o in 4" :key="o" class="text item">
        <TaskBlock></TaskBlock>
    </div>
  </div>
</template>

<script>
import TaskBlock from '@/components/TaskBlock';

export default {
  name: 'RecommendPage',
  components: {
    TaskBlock
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style>

</style>
