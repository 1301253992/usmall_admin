<template>
  <div>
    <el-button type="primary" @click="showAdd">添加</el-button>
    <v-add ref="add" :info="info"></v-add>
    <v-list @edit='edit'></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: { 
          show: false,
      title:'菜单添加',
      isAdd:true
      },
    };
  },
  methods: {
    showAdd() {
        this.info.title='菜单添加'
      this.info.show = true;
      this.info.isAdd=true
    },
     edit(id){
        this.info.show=true;
         this.info.title="菜单编辑"
         this.info.isAdd=false
        this.$refs.add.getDetail(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>