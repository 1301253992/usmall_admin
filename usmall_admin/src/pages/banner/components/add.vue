<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" class="add">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" v-if="form.pid!=0">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  requestBannerAdd,
  requestBannerDetail,
  requestBannerUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  data() {
    return {
      imageUrl: "",
      form: {
        title: "",
        img: null,
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      requestList: "banner/requestList",
    }),
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //重置内容
    empty() {
      this.imageUrl = "";
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
    },
    changeImg(e) {
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("上传图片不能超过2M");
        return;
      }
      var extname = e.name.slice(e.name.lastIndexOf("."));
      var extArr = [".png", ".jpg", ".gif", ".jpeg"];
      if (!extArr.some((item) => item === extname)) {
        warningAlert("上传文件必须是图片");
        return;
      }
      //file是上传的文件
      var file = e.raw;
      //生成一个URL地址，赋值给imageUrl,展示出来
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    //添加数据
    add() {

        for(var i in this.form){
          if(!this.form[i]){
            warningAlert('数据不能为空')
            return;
          }
        }
      requestBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //重置form数据
          this.empty();
          //弹框消失
          this.cancel();
          //再次请求list数据
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取某一条数据
    getDetail(id) {
      requestBannerDetail({ id: id }).then((res) => {
         this.form = res.data.list;
         this.form.id = id;
         this.imageUrl = this.$imgPre + res.data.list.img;
      });
    },
    update() {

  for(var i in this.form){
          if(!this.form[i]){
            warningAlert('数据不能为空')
            return;
          }
        }

      requestBannerUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.add>>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>