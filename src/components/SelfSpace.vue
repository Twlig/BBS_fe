<template>
  <div>
    <div class="content">
      <div class="title">
        <img src="../assets/img/1.jpg">
        <div class="title_contain">
          <div class="title_contain_top">
            <span class="title_contain_follow"><i class="fa fa-database"></i>&nbsp{{score}}</span>
            <span class="title_contain_letter" @click="getLetters()"><i class="fa fa-comments"></i>私信</span>
            <span class="title_contain_selfInfo" @click="getInfo()"><i class="fa fa-id-card"></i>个人资料>></span>
            <span class="title_contain_last" @click="re()">&nbsp返回</span>
          </div>
          <div class="name">{{name}}</div>
        </div>
      </div>
      <div class="bbs_content">
        <div class="bbs_content_title"><img src="../assets/img/tie.png"><span>帖子</span></div>

        <div class="all_bbs_message">
          <p v-if="havenoPost" class="p1">该用户还没有发过贴QAQ</p>
          <ul><li v-for="(item,index) in post">
            <div class="bbs_message">
              <div class="bbs_message_top">
                <img class="edit" src="../assets/img/edit.png">
                <div class="bbs_message_title" @click="getPost(index)">{{item.post_title}}</div>
                <div class="bbs_message_time">{{item.post_time}}</div>
              </div>
              <div class="bbs_message_detail">
                <div class="text" @click="getPost()">{{item.post_content}}</div>

              </div>
            </div>
          </li></ul>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        havenoPost:false,
        baseUrl: "http://120.79.211.126:8080/javaweb-bbs",
        baseUrl1: "http://119.29.150.121:8080/BBS",
        //帖子信息
        post: [],
        //当前页面的用户id
        account:'',
        //积分
        score:'',
        //用户名
        name:'',
        //访客的id
        mine: localStorage.getItem("account"),
      }
    },
    methods: {
      re(){
        this.$router.go(-1)
      },
      //私信
      getId(){
        this.account=this.$route.query.Id
      },
      getLetters(){
        this.$router.push("/letters");
      },
      //跳转到用户发的帖子中，并判断是否是需求帖
      getPost(index){
        if(this.post[index].category_id==1005){
          this.$router.push({
            path:'/ask',
            query:{
              Id:this.post[index].post_id},
          })
        }
        else{
          this.$router.push({
            path:'/index',
            query:{
              Id:this.post[index].post_id},
          })
        }
      },
      //获取用户积分
      getScore(){
        this.axios.get(this.baseUrl1 + "/api/getUserInformationByAccount?account="+this.account)
          .then(res => {
            this.score = res.data.data.score;
            this.name=res.data.data.user_name;
          })

      },
      //个人资料
      getInfo(){
        this.$router.push("/SelfMessage?account=" +this.account)
      },
      //获取用户发过的帖子
      getMessage() {
        this.axios.get(this.baseUrl1 + "/api/getPostByAccount?account="+this.account)
          .then(res => {
            if (res.data.status == '1') {
              this.post = res.data.data.posts;
            }
            else {
              this.havenoPost=true
            }
          })
      }
    },
    created() {
      this.getId();
      this.getMessage();
      this.getScore();
    }
  }
</script>
<style scoped>
  a {
    cursor: pointer;
  }
  .p1{
    text-align: center;
    font-size: 18px;
    padding: 15px;
    color: darkgray;
  }
  li{
    list-style: none;
  }
  .content {
    width: 50%;
    height: 100%;
    margin: 0 auto;
    border-left: #ccc 1px solid;
    border-right: #ccc 1px solid;
    box-shadow: rgba(0,0,0,0.3) 2px 5px 5px;
  }
  .content .title {
    width: 100%;
    height: 100px;
    background-image: url("../assets/img/1.jpg");
    background-color: black;
    position: relative;
    border-bottom: 1px #888 solid;
    background-repeat: no-repeat !important;
    background-size: 80% !important;
    background-position: center !important;
    overflow: hidden;
  }
  .content .title::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    filter: blur(50px);
    margin: -20%;
    z-index: 0;
  }
  .content .title img {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 50%;
    margin-top: -30px;
    left: 10px;
  }
  .content .title .title_contain {
    display: inline-block;
    width: 300px;
    height: 60px;
    margin-top: 20px;
    margin-bottom: 20px;
    position: absolute;
    top: 0;
    left: 80px;
  }
  .content .title .title_contain .title_contain_top {
    width: 300px;
    height: 30px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .content .title .title_contain .title_contain_top .title_contain_follow {
    width: 50px;
    line-height: 26px;
    position: absolute;
    margin-right: 5px;
    top: 50%;
    margin-top: -13px;
    left: 0;
    background-color: #e64545;
    text-align: center;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
  }
  .content .title .title_contain .title_contain_top .title_contain_last {
    width: 50px;
    line-height: 26px;
    position: absolute;
    margin-right: 5px;
    top: 50%;
    margin-top: -13px;
    left: 600px;
    background-color: darkgray;
    text-align: center;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
  }
  .content .title .title_contain .title_contain_top .title_contain_letter {
    width: 50px;
    line-height: 26px;
    position: absolute;
    top: 50%;
    margin-right: 5px;
    margin-top: -13px;
    left: 55px;
    background-color: rgba(63,137,236,0.5);
    text-align: center;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
  }
  .content .title .title_contain .title_contain_top .title_contain_selfInfo {
    width: 100px;
    line-height: 26px;
    position: absolute;
    top: 50%;
    margin-top: -13px;
    margin-right: 5px;
    left: 110px;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
    background-color: rgba(63,137,236,0.5);
    text-align: center;
    cursor: pointer;
  }
  .content .title .title_contain .name {
    padding: 0 10px;
    line-height: 30px;
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    background-color: rgba(0,0,0,0.2);
    border-radius: 15px;
    font-size: 15px;
    text-align: center;
  }
  .bbs_content {
    width: 100%;
  }
  .bbs_content .bbs_content_title {
    width: 100%;
    height: 30px;
    position: relative;
    border-bottom: 1px #eee solid;
  }
  .bbs_content .bbs_content_title img {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 50%;
    margin-top: -7px;
    left: 5px;
  }
  .bbs_content .bbs_content_title span {
    width: 40px;
    line-height: 20px;
    position: absolute;
    font-size: 14px;
    color: #444;
    top: 50%;
    margin-top: -10px;
    left: 24px;
  }
  .bbs_content .all_bbs_message {
    width: 100%;
  }
  .bbs_content .all_bbs_message .bbs_message{
    width: 100%;
    height: 120px;
    position: relative;
    border-bottom: #eee 1px solid;
  }
  .bbs_content .all_bbs_message .bbs_message .bbs_message_top {
    width: 100%;
    height: 20px;
    position: relative;
    margin-top: 10px;
  }
  .bbs_content .all_bbs_message .bbs_message .bbs_message_top .edit {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 50%;
    margin-top: -7px;
    left: 10px;
  }
  .bbs_content .all_bbs_message .bbs_message .bbs_message_top .bbs_message_title {
    width: 50%;
    line-height: 20px;
    font-size: 13px;
    position: absolute;
    top: 0;
    left: 35px;
    color: rgb(63,137,236);
    font-weight: bold;
    cursor: pointer;
  }
  .bbs_content .all_bbs_message .bbs_message .bbs_message_top .bbs_message_time {
    width: 100px;
    line-height: 20px;
    font-size: 12px;
    position: absolute;
    right: 0;
  }
  .bbs_content .all_bbs_message .bbs_message .bbs_message_detail {
    width: 70%;
    box-sizing: border-box;
    padding-left: 35px;
    padding-right: 35px;
    height: 60px;
    font-size: 12px;
    color: #444;
  }
  .bbs_content .all_bbs_message .bbs_message .bbs_message_detail .text {
    width: 100%;
    margin-bottom: 10px;
  }
  .bbs_content .all_bbs_message .bbs_message .bbs_message_detail img {
    width: 60px;
    height: 50px;
    margin-right: 10px;
  }
</style>
