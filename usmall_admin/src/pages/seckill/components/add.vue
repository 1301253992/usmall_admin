<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="getTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="一级分类 " :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="changeFristCateId()">
            <el-option label="--请选择--" value disabled></el-option>

            <!-- 动态数据 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" @change="changeSecondCate()">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
  requestSeckillAdd,
  requestSeckillDetail,
  requestSeckillUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodsList: "goods/list",
    }),
  },
  data() {
    return {
      getTime: "",
      secondCateArr: [],
      goodsArr: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/requestList",
      requestGoodsList: "goods/requestList",
       requestList:'seckill/requestList'
    }),

    // 一级分类发生了改变
    changeFristCateId(bool) {
      let index = this.cateList.findIndex(
        (item) => (item.id == this.form.first_cateid)
      );
      this.secondCateArr = this.cateList[index].children;
      if (!bool) {
        this.form.second_cateid = "";
      }
    },

    // 二级分类发生了改变
    changeSecondCate(bool) {
      this.goodsList.forEach((item, index) => {
        if ((item.second_cateid = this.form.second_cateid)) {
          this.goodsArr.push(item);
        }
      });
      console.log(this.goodsArr);
      if (!bool) {
        this.form.goodsid = "";
      }
    },

    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //重置内容
    empty() {
      this.getTime = "";
      this.secondCateArr = [];
      this.goodsArr = [];
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },
    //添加数据
    add() {
    //     for(var i in this.form){
    //       if(!this.form[i]){
    //         warningAlert('数据不能为空')
    //         return;
    //       }
    //     }
      this.form.begintime = new Date(this.getTime[0]).getTime();
      this.form.endtime = new Date(this.getTime[1]).getTime();

      // console.log(start)

      requestSeckillAdd(this.form).then((res) => {
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

    // 时间
    getYMDHMS(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      var month = (date.getMonth() + "").padStart(2, "0");
      var day = (date.getDate() + "").padStart(2, "0");
      var hours = (date.getHours() + "").padStart(2, "0");
      var minutes = (date.getMinutes() + "").padStart(2, "0");
      var seconds = (date.getSeconds() + "").padStart(2, "0");

      return {
        year: year,
        month: month,
        day: day,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    },

    // 获取某一条数据
    getDetail(id) {

      requestSeckillDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.changeFristCateId(true);
        this.changeSecondCate(true);
        this.form.begintime = JSON.parse(this.form.begintime);
        this.form.endtime = JSON.parse(this.form.endtime);
        const start = this.getYMDHMS(this.form.begintime);
        const end = this.getYMDHMS(this.form.endtime);
        this.getTime = [
          new Date(
            start.year,
            start.month,
            start.day,
            start.hours,
            start.minutes,
            start.seconds
          ),
          new Date(
            end.year,
            end.month,
            end.day,
            end.hours,
            end.minutes,
            end.seconds
          ),
        ];
      });
    },
    // 修改
    update() {
        
       this.form.begintime = new Date(this.getTime[0]).getTime();
      this.form.endtime = new Date(this.getTime[1]).getTime();
      requestSeckillUpdate(this.form).then((res) => {
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

  mounted() {
    this.requestCateList();
    this.requestGoodsList();
  },
};
</script>
<style scoped>
</style>