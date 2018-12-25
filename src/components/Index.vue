<template>
  <div>
    <section class="container">
      <div class="header">
        <h1>{{Title}}</h1>
        <div class="title_buttons" v-if="unblank">
          <button v-if="isAdmin" @click="setGood()">精华</button>
          <button v-if="isAdmin" @click="setTop()">置顶</button>
          <button v-if="isAdmin||isMine" @click="" @click="editPost()">修改</button>
          <button v-if="isAdmin||isMine" @click="deletePost()">删除</button>
          <button @click="letshow()">回复</button>
          <button @click="re()">返回</button>
        </div>
      </div>
      <div class="content">
        <div class="content_left">
          <div class="content_avatar_wrapper">
            <img  @click="getSelfSpace(userId)" src="https://api.adorable.io/avatars/285/abott@adorable.png" width="100%" height="100%">
          </div>
          <span class="content_username" @click="getSelfSpace(userId)">{{User}}</span>
        </div>
        <div class="content_right" >
          <div class="text">
            {{postContent}}
            <img :src="img" width="350px">
          </div>
          <span><p class="special">1楼&nbsp;{{postTime}}</p>  </span>
        </div>
      </div>
      <!--//后面的楼-->
      <div v-if="isLoad">
      <div class="content" v-for="(item,indexs) in nowGoodTie">
        <div class="content_left" v-for="(item3,index) in item" v-if="index == 0">
          <div class="content_avatar_wrapper">
            <img src="https://api.adorable.io/avatars/285/abott@adorable.png" width="100%" height="100%">
          </div>
          <span class="content_username" @click="getSelfSpace(item3.account)">{{item3.user_name_1}}</span>
        </div>
        <div class="content_right" v-for="(item1,index) in item" v-if="index == 0">
          <div class="text" v-if="item1.reply_id == '0' ">
            {{item1.reply_content}}
          </div>
          <span>{{(goodNowIndex-1)*5+indexs+2}}楼 {{item1.reply_time}} <button class="b" @click="submitOther(item1.own_id)">回复</button></span>
          <div class="content_comment_wrapper" v-for="(item2,index) in item" v-if="index != 0">
            <div class="comment_item">
              <div class="comment_content">
                <div class="content_avatar_wrapper">
                  <img src="https://api.adorable.io/avatars/285/abott@adorable.png" width="100%" height="100%">
                </div>
                <div class="content_text_wrapper">
                  <span class="username" @click="getSelfSpace(item2.account)">{{item2.user_name_1}}</span>:
                  <span class="text">回复{{item2.user_name_2}}:{{item2.reply_content}}</span>
                </div>
              </div>
              <span class="comment_status">{{item2.reply_time}} <button class="b" @click="submitOther(item2.own_id)">回复</button></span>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination_wrapper">
        <p style="text-align:left;margin-left: 20px">
          <input class="btn btn1" @click="Pre()" type="submit" name="FaTie7" id="FaTie7" value="上一页">
          <span v-for="(index) in goodTieGroup">
            <span @click="toIndex(index)" v-if="goodTieGroup > 8"><a :class="[goodNowIndex == index ? 'current' : '']" v-if="index < 5 || index > (goodTieGroup - 4)">{{index}}&nbsp;</a><a v-if="index === goodTieGroup - 5">...</a></span>
            <a @click="toIndex(index)" :class="[goodNowIndex == index ? 'current' : '']" v-if="goodTieGroup <= 8">{{index}}&nbsp;</a>
          </span>
          <span>跳转到</span><input v-model="goodHrefIndex" type="text" class="hrefInput" @keyup.enter="toIndex1()"/>页
          <input class="btn btn1" @click="Next()" type="submit" name="FaTie10" id="FaTie10" value="下一页">
        </p>
      </div>
      </div>
      <div v-if="!isLoad">
        <alert :message="message" class="animated bounceInDown aletr"></alert>
      </div>
      <div v-if="show" class="comment animated bounceInDown" id="login">
        <img class="close1" src="../assets/img/close.png" @click="close()">
        <div style="clear: both;"></div>
        <div class="add_comment">
          <h1 class="headtext">发表回复</h1>
          <div class="input_wrapper">
            <div class="input_header">
            </div>
            <textarea class="input_field" cols="16" v-model="ansContent"></textarea>
          </div>
          <div class="submit_wrapper">
            <button class="btn" @click="submitAns()">发表</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import Alert from './Alert'
  export default {
    data() {
      return {
        type: 0,
        baseUrl1: "http://119.29.150.121:8080/BBS",
        baseUrl2: "http://120.79.211.126:8080/test/",
        baseUrl: "http://120.79.211.126:8080/javaweb-bbs",
        topTieLength: 0,
        // SjTieAns: [],
        upTie: '',
        unblank:true,
        isAdmin:false,
        isMine:false,
        //帖子标题
        Title: '',
        //楼主用户名
        User: '',
        //楼主账户
        userId: '',
        //一楼的内容
        postContent: '',
        //发帖时间
        postTime:'',
        //帖子的id
        postId: '',
        //所有回复
        AllReply: [],
        nowGoodTie: [],
        goodTieLength: 0,
        goodTieStart: 0,
        goodTieEnd: -1,
        goodTieGroup: 0,
        goodNowIndex: 1,
        goodHrefIndex: null,
        //浏览者id
        account:'',
        //回复内容
        ansContent:'',
        //回复主贴id
        replyIdOther: '0',
        show:false,
        img:'',
        message: "正在加载中",
        isLoad: false
      }
    },
    components: {
      Alert
    },
    methods: {
      getType() {
        this.type = localStorage.getItem("type")
      },
      toGetTopTie() {
        this.axios.get(this.baseUrl2 + "getStickyPost")
          .then(res => {
            if(res.data.status == '1') {
              this.topTieLength = res.data.data.posts.length
            }
            else {
              alert("置顶帖子获取失败")
            }
          })
      },
      setGood() {
        this.axios.post(this.baseUrl2 + "doPostEditing?post_id=" + this.postId)
          .then(res => {
            if(res.data.status == '1') {
              alert("加精成功")
            }
            else {
              alert("加精失败")
            }
          })
      },
      setTop() {
        if(this.topTieLength >= 5) {
          alert("置顶帖子不能超过5个")
        }
        else {
          this.axios.post(this.baseUrl2 + "doPostSticky?post_id=" + this.postId)
            .then(res => {
              if(res.data.status == '1') {
                alert("置顶成功")
              }
              else {
                alert("置顶失败")
              }
            })
        }
      },
      deletePost(){
        this.axios.get(this.baseUrl1+ "/api/deletePost?post_id="+this.postId)
          .then(res => {
            if(res.data.status=='1'){
              alert("删帖成功")
              this.$router.go(-1)
            }
            else{
              alert("删帖失败")
            }
          })

      },
      re(){
        this.$router.go(-1)
      },
      close(){
        this.show=false
      },
      letshow(){
        this.show=true
      },
      getSelfSpace(id){
        this.$router.push("/SelfSpace?Id=" + id)
      },
      submitOther(ownId){
        this.show=true
        this.replyIdOther = ownId
      },
      submitAns() {
        this.account = localStorage.getItem("account")
        this.axios.get(this.baseUrl1 + "/api/replyAndSave?post_id=" + this.postId + "&account=" + this.account + "&reply_content=" + this.ansContent+ "&reply_id=" + this.replyIdOther +"&image=")
          .then(res => {
            if(res.data.status != '1') {
              alert("回复失败")
            }
            this.show = false
            this.replyIdOther = 0
          })
        this.getTitle()
        this.getReply()
      },
      //修改帖子
      editPost(){
        this.$router.push("/edit?Id=" + this.postId)
      },
      //判断身份
      getStatus(){
        if(localStorage.getItem("account")==this.userId){
          this.isMine=true;
        }
        if(localStorage.getItem("type")==1)
          this.isAdmin=true;
      },
      //获取帖子的基本信息（帖子id、楼主id和用户名）
      getTitle() {
        this.postId = this.$route.query.Id
        this.axios.get(this.baseUrl1+ "/api/getPostByPostId?post_id="+this.postId)
          .then(res => {
            if(res.data.status!='1'){
              this.unblank=false
            }
            if(res.data.data.category_id!='1005') {
              this.userId = res.data.data.account;
              this.postContent = res.data.data.post_content;
              this.Title = res.data.data.post_title;
              this.User = res.data.data.user_name;
              this.postTime = res.data.data.post_time;
              this.img=res.data.data.image;
            }
          })
      },
      //获取帖子的回复
      getReply() {
        this.axios.get(this.baseUrl1 + "/api/getReplyInformationByPostID?post_id="+this.postId)
          .then(res => {
            if (res.data.data != '') {
              this.AllReply=res.data.data.replyInformation;
            }
            this.isLoad = true
            this.goodTieLength = this.AllReply.length
            if (this.goodTieLength >= 5)
              this.goodTieEnd = 5
            else
              this.goodTieEnd = this.goodTieLength
            this.nowGoodTie = this.AllReply.slice(this.goodTieStart,this.goodTieEnd)
            if(this.goodTieLength % 5 === 0) {
              this.goodTieGroup = parseInt(this.goodTieLength / 5)
            }
            else {
              this.goodTieGroup = parseInt(this.goodTieLength / 5) + 1
            }
          })
      },
      Pre() {
        if(this.goodTieStart >= 5) {
          this.goodNowIndex--
          this.goodTieStart = this.goodTieStart - 5
          this.goodTieEnd = this.goodTieEnd - 5
          this.nowGoodTie = this.AllReply.slice(this.goodTieStart,this.goodTieEnd)
        }
      },
      Next() {
        if(this.goodTieEnd <= (this.goodTieLength - 1)) {
          this.goodNowIndex++
          this.goodTieStart = this.goodTieStart + 5
          this.goodTieEnd = this.goodTieEnd + 5
          if(this.goodTieStart <= (this.goodTieLength - 1)) {
            this.nowGoodTie = this.AllReply.slice(this.goodTieStart,this.goodTieEnd)
          }
          else {
            this.nowGoodTie = this.AllReply.slice(this.goodTieStart,this.goodTieLength)
          }
        }
      },
      toIndex1() {
        if(this.goodHrefIndex >= this.goodTieGroup) {
          this.goodNowIndex = this.goodTieGroup
          this.goodTieStart = (this.goodTieGroup-1) * 5
          this.goodTieEnd = this.goodTieStart + 5
          this.nowGoodTie = this.AllReply.slice(this.goodTieStart,this.goodTieLength)
        }
        else {
          this.goodNowIndex = this.goodHrefIndex
          this.goodTieStart = (this.goodHrefIndex-1) * 5
          this.goodTieEnd = this.goodTieStart + 5
          this.nowGoodTie = this.AllReply.slice(this.goodTieStart,this.goodTieEnd)
        }
        this.goodHrefIndex = null
      },
      toIndex(index) {
        this.goodNowIndex = index
        this.goodTieStart = (this.goodNowIndex-1) * 5
        this.goodTieEnd = this.goodTieStart + 5
        this.nowGoodTie = this.AllReply.slice(this.goodTieStart,this.goodTieEnd)
      }
    },
    created() {
      this.getType()
      this.toGetTopTie()
      this.getTitle();
      this.getReply();
      this.getStatus();
    }
  }
</script>
<style scoped>
  a {
    cursor: pointer;
  }
  .current {
    color: red !important;
  }
  .special{
    color: gold;
  }
  .hrefInput {
    margin:5px;
    width: 18px;
    height: 16px;
    background-color: #fff;
    color: #333;
    text-align: center;
    border: 1px #666 solid;
    outline: none;
  }
  #login {
    position: fixed;
    left: 42%;
    margin-left: -200px;
    top: 100px;
    text-align: center;
    transition: all 0.7s ease-in-out;
    z-index: 2;
  }
  @-webkit-keyframes bounceInDown {
    from,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -3000px, 0);
      transform: translate3d(0, -3000px, 0);
    }

    60% {
      opacity: 0.5;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }

    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }

    90% {
      opacity: 1;
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes bounceInDown {
    from,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -3000px, 0);
      transform: translate3d(0, -3000px, 0);
    }

    60% {
      opacity: 0.5;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }

    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }

    90% {
      opacity: 1;
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .bounceInDown {
    -webkit-animation-name: bounceInDown;
    animation-name: bounceInDown;
  }
  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .animated.infinite {
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }

  .animated.delay-1s {
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }

  .animated.delay-2s {
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
  }

  .animated.delay-3s {
    -webkit-animation-delay: 3s;
    animation-delay: 3s;
  }

  .animated.delay-4s {
    -webkit-animation-delay: 4s;
    animation-delay: 4s;
  }

  .animated.delay-5s {
    -webkit-animation-delay: 5s;
    animation-delay: 5s;
  }

  .animated.fast {
    -webkit-animation-duration: 800ms;
    animation-duration: 800ms;
  }

  .animated.faster {
    -webkit-animation-duration: 500ms;
    animation-duration: 500ms;
  }

  .animated.slow {
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
  }

  .animated.slower {
    -webkit-animation-duration: 3s;
    animation-duration: 3s;
  }
  .close1 {
    width: 25px;
    height: 25px;
    float: right;
    margin-top: 20px;
    margin-right: 20px;
    cursor: pointer;
    opacity: 0.7;
  }
  .close1:hover {
    opacity: 1;
  }
  .comment{
    margin: 0 auto;
    background-color: #fff;
    box-shadow: rgba(0,0,0,0.4) 0px 10px 20px;
    border: none;
  }
  .b{
    border: none;
    background-color: white;
  }
  .container {
    background-color: #f5f7fa;
    border: 1px solid #9cadc0;
    box-sizing: border-box;
    padding: 0;
  }
  @media (min-width: 960px) {
    .container {
      width: 50%;
      margin: 0 auto;
    }
  }
  .header {
    height: 56px;
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #bbbdbf;
  }
  .header h1 {
    line-height: 56px;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 16px;
    margin: 0;
    font-weight: 400;
    margin-left: 20px;
  }
  .header .title_buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
  }
  .header .title_buttons > button {
    margin-right: 10px;
    outline: none;
    border: none;
    border: 1px solid #dee0de;
    background: linear-gradient(to top, #fefefe, #f5f5f5);
    min-width: 66px;
    border-radius: 2px;
    height: 25px;
    padding: 0 10px;
    color: #333;
  }
  .header .title_buttons > button:hover {
    background: linear-gradient(to top, #fff, #fcfcfc);
  }
  .content {
    display: flex;
    border-bottom: 1px solid #e1e4e6;
    position: relative;
  }
  .content .content_left {
    padding: 15px 17px;
  }
  .content .content_left .content_avatar_wrapper {
    padding: 4px;
    background-color: #fff;
    border: 1px solid #ccc;
    width: 96px;
    height: 96px;
    cursor: pointer;
  }
  .content .content_left .content_username {
    display: inline-block;
    font-size: 12px;
    color: #3f89ec;
    line-height: 13px;
    width: 96px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 30px 0;
    text-align: center;
    cursor: pointer;
  }
  .content .content_right {
    background-color: #fff;
    padding: 24px 20px;
    color: #333;
    font-size: 14px;
    flex: 1;
  }
  .content .content_right > span {
    font-size: 12px;
    color: #999;
    text-align: right;
    display: inline-block;
    width: 100%;
  }
  .content .content_right .text {
    min-height: 200px;
  }
  .content .content_right > span > a {
    color: #2d64b3;
    text-decoration: none;
  }
  .content .content_right > span > a:visited {
    color: #2d64b3;
  }
  .content .content_right .content_comment_wrapper {
    width: 100%;
    background-color: #f5f7fa;
    padding: 15px;
  }
  .content .content_right .content_comment_wrapper .comment_item {
    border-bottom: 1px dotted #ccc;
    padding-bottom: 10px;
    position: relative;
  }
  .content .content_right .content_comment_wrapper .comment_item .comment_content {
    display: flex;
  }
  .content .content_right .content_comment_wrapper .comment_item .comment_status {
    display: inline-block;
    width: 100%;
    font-size: 12px;
    color: #444;
    text-align: right;
  }
  .content .content_right .content_comment_wrapper .comment_item .comment_status > a {
    text-decoration: none;
    color: #333;
  }
  .content .content_right .content_comment_wrapper .comment_item:not(:first-child) {
    padding-top: 10px
  }
  .content .content_right .content_comment_wrapper .comment_item:last-child {
    border-bottom: none;
  }
  .content .content_right .content_comment_wrapper .comment_item .content_avatar_wrapper {
    width: 32px;
    height: 32px;
    padding: 4px;
    background-color: #fff;
    border: 1px solid #ccc;
    margin-right: 10px;
  }
  .content .content_right .content_comment_wrapper .comment_item .content_text_wrapper {
    flex: 1;
  }
  .content .content_right .content_comment_wrapper .comment_item .username {
    color: #2d64b3;
  }
  .content .content_right .content_comment_wrapper .comment_item .text {
    color: #333;
  }
  .container .add_comment {
    width:650px;
    height: 430px;
    padding: 30px;
    padding-top: 0;
  }
  .container .add_comment .headtext {
    font-size: 14px;
    color: #333;
    font-weight: 700;
    margin-bottom: 40px;
  }
  .container .add_comment .input_wrapper {
    width: 100%;
    height: auto;
    background-color: #fafafa;
    border: 1px solid #dfdfdf;
    margin-bottom: 40px;
  }
  .container .add_comment .input_wrapper .input_header {
    padding: 12px 14px;
    font-size: 12px;
  }
  .container .add_comment .input_wrapper .input_header > a {
    color: #3782f0;
    text-decoration: none;
  }
  .container .add_comment .input_wrapper .input_field {
    width: 100%;
    height: 220px;
    resize: none;
    border: none;
    outline: none;
    margin: 0;
    padding: 10px;
    border-top: 1px solid #dfdfdf;
  }
  .container .add_comment .submit_wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .btn1{
    margin: 5px;
    height: 23px;
    padding: 0 0;
  }
  .container .add_comment .submit_wrapper .btn {
    outline: none;
    border: none;
    font-size: 13px;
    color: #fff;
    background: #398bfc;
    border-bottom-color: #3782f0;
    display: inline-block;
    padding: 0 15px;
    height: 28px;
    line-height: 28px;
    overflow: hidden;
    text-align: center;
    border-radius: 2px;
    /*float: right;*/
  }
  .container .add_comment .submit_wrapper .btn:hover {
    background-image: linear-gradient(to bottom,#3887fa 0,#3782f0 100%);
    background-repeat: repeat-x;
    border-bottom-color: #296cee;
  }
  .container .pagination_wrapper {
    /*padding: 20px 0;*/
    text-align: right;
    height: 64px;
    background: #f7f8fa;
    border-bottom: 1px solid #E5E5E5;
    border-top: 1px solid #E5E5E5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .container .pagination_wrapper > ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .container .pagination_wrapper > ul >  li {
    height: 22px;
    line-height: 22px;
    border: 1px solid #e7ecf0;
    margin-right: 5px;
    padding: 0 8px;
    text-align: center;
    overflow: hidden;
    color: #2d64b3;
    background: none repeat scroll 0 0 #fff;
    cursor: pointer;
  }
</style>
