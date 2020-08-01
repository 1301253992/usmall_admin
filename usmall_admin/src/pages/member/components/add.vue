<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态 " :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#ff4949"
            inactive-color="#13ce66"
            :active-value="0"
            :inactive-value="1"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
       <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import {requestMemberDetail,requestMemberUpdate} from '../../../util/request'
import{successAlert,warningAlert} from '../../../util/alert'
export default {
  props:['info'],
    computed:{
        ...mapGetters({
            memberList:'member/list'
        })
    },
  components: {},
  data() {
    return {
      pass:'',
      form: {
        uid:1,
        nickname:'',
        password: "",
        phone: "",
        status: 1,
      },
      formLabelWidth: "80px",
    };
  },
  methods: {
      ...mapActions({
      requestList:"member/requestList",
      }),
      //取消
    cancel(){
      this.info.show=false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //重置
    empty(){
       this.pass='';
       this.form={
          uid:"",
          nickname:'',
          password: "",
          phone: "",
          status: 1,
      }
    },
  //一条信息
  getDetail(uid){
    requestMemberDetail({uid:uid}).then(res=>{
      this.form=res.data.list;
    })
  },
// 修改
update(){
        if(this.pass){
          this.form.password=this.pass
        }
      requestMemberUpdate(this.form).then(res=>{
    if(res.data.code==200){
      successAlert(res.data.msg);
      this.empty();
      this.cancel();
       this.requestList();
    }else{
      warningAlert(res.data.msg)
    }
  })
}

  },
};
</script>
<style scoped>
</style>