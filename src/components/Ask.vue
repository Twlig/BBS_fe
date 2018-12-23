<template>
  <div class="container-fluid">
    <div class="col-md-6 col-lg-6 col-xs-12 col-md-offset-3 col-lg-offset-3">
      <h1 class="title"><i class="fa fa-exclamation-circle"></i>&nbsp;{{scoreTie.post_title}}</h1>
      <div class="status">
        <span class="username">{{scoreTie.username}}</span>
        <span class="time">{{scoreTie.post_time}}</span>
      </div>
      <div>{{scoreTie.post_content}}</div>
      <div class="message">您的回答被采纳后将获得：系统奖励 <span class="bonus"><i class="fa fa-database"></i>{{scoreTie.post_score}}</span>（财富值+成长值）</div>
      <div class="answer_wrapper">
        <div class="head"><i class="fa fa-arrows-alt"></i></div>
        <textarea class="field" v-model="postContent"></textarea>
      </div>
      <div class="submit_wrapper">
        <button class="submit" @click="submitAns()">提交回答</button>
        <!--<button v-if="isAnsOther" class="submit" @click="submitAns()">回复</button>-->
      </div>
      <hr>
      <div class="count_title">{{ansNum}}个回答</div>
      <div class="answer_item" v-for="(item,index) in SjTieAns">
        <div v-for="item1 in item">
          <div v-if="item1.reply_id == '0'">
            <button v-if="item1.account == adoptAccount" class="best_btn">最佳答案</button>
            <div class="content">{{item1.reply_content}}</div>
            <div class="answer_status">
              <span class="author">{{item1.user_name_1}}</span>
              <span class="time">{{item1.reply_time}}</span>
            </div>
            <div class="actions">
              <span @click="ansOtherUp(index)" class="comment_button"><i class="fa fa-commenting-o"></i>评论</span>
              <button v-if="account == scoreTie.account" class="admit_btn" @click="adopt(index)">采纳</button>
            </div>
          </div>
          <div class="content_comment_wrapper" v-if="item1.reply_id != '0'">
            <div class="comment_item">
              <div class="comment_content">
                <div class="content_avatar_wrapper">
                  <img src="https://api.adorable.io/avatars/285/abott@adorable.png" style="width: 100%;height: 100%">
                </div>
                <div class="content_text_wrapper">
                  <span class="username">{{item1.user_name_1}}</span>:
                  <span class="text">回复{{item1.user_name_2}}:&nbsp;{{item1.reply_content}}</span>
                </div>
              </div>
              <span class="comment_status" @click="ansOther(item1.own_id)">{{item1.reply_time}}<a>回复</a></span>
            </div>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        baseUrl: "http://120.79.211.126:8080/javaweb-bbs",
        baseUrl1: "http://119.29.150.121:8080/BBS",
        scoreTie: '',
        account: '',
        postContent: '',
        SjTieAns: [],
        ansNum: 0,
        // replyId: 0,
        replyIdOther: 0,
        isAnsOther: true,
        adoptAccount: ''
      }
    },
    methods: {
      getScoreTie() {
        this.account = localStorage.getItem("account")
        this.axios.get(this.baseUrl + "/api/getScoreTie?id=" + this.$route.query.postId)
          .then(res => {
            if(res.data.status == '0') {
              this.scoreTie = res.data.data[0]
            }
            else {
              aletr("请求失败")
            }
          })
      },
      // postAns() {
      //   this.axios.get(this.baseUrl1 + "/api/replyAndSave?post_id=" + this.$route.query.postId + "&account=" + this.account + "&reply_content=" + this.postContent + "&reply_id=" + this.replyId +"&image=")
      //     .then(res => {
      //       if(res.data.status != '1') {
      //         alert("回复失败")
      //       }
      //       else {
      //         this.getTie()
      //       }
      //     })
      // },
      getTie() {
        this.axios.get(this.baseUrl1 + "/api/getReplyInformationByPostID?post_id=" + this.$route.query.postId)
          .then(res => {
            if(res.data.status == '1') {
              this.SjTieAns = res.data.data.replyInformation
              this.ansNum = this.SjTieAns.length
            }
            else if(res.data.status == '-1') {
              alert("当前帖子回复为空")
            }
            else {
              alert("请求失败")
            }
          })
      },
      ansOther(ownId) {
        this.toTop()
        this.replyIdOther = ownId
      },
      submitAns() {
        this.axios.get(this.baseUrl1 + "/api/replyAndSave?post_id=" + this.$route.query.postId + "&account=" + this.account + "&reply_content=" + this.postContent + "&reply_id=" + this.replyIdOther +"&image=")
          .then(res => {
            if(res.data.status != '1') {
              alert("回复失败")
            }
            else {
              this.replyIdOther = '0'
            }
          })
        this.getTie()
      },
      ansOtherUp(index) {
        this.toTop()
        this.replyIdOther = this.SjTieAns[index][0].own_id
      },
      adopt(index) {
        this.adoptAccount = this.SjTieAns[index][0].account
        let data = {
          account: this.adoptAccount,
          post_id: this.$route.query.postId,
          post_score: this.scoreTie.post_score
        }
        console.log(data)
        this.axios.post(this.baseUrl + "/api/adoptReply",data)
          .then(res => {
            if(res.data.status != '0') {
              alert("操作失败")
            }
          })
      },
      toTop() {
        (function smoothscroll(){
          var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,currentScroll - (currentScroll/5));
          }
        })();
      }
    },
    created() {
      this.getScoreTie()
      this.getTie()
    }
  }
</script>
<style scoped>
  a {
    color: #333;
    text-decoration: none;
  }
  .container-fluid {
    box-sizing: border-box;
  }
  .title {
    font-size: 18px;
    color: #4a4d4d;
    font-weight: normal;
  }
  .title .fa {
    color: rgb(63,137,236);
  }
  .status {
    color: #bfc3c6;
    font-size: 11px;
  }
  .status .username {
    margin-right: 15px;
  }
  .message {
    background-color: #f8fafa;
    color: #839aac;
    width: 100%;
    padding: 10px 15px;
    margin: 30px 0;
  }
  .message .bonus {
    color: #f19669;
  }
  .message .bonus .fa {
    color: #fbb91a;
  }
  .answer_wrapper {
    border: 1px solid #e7eaed;
    border-radius: 2px;
    margin-bottom: 20px;
  }
  .answer_wrapper .head {
    height: 40px;
    display: flex;
    background-color: #f8fafa;
    border-bottom: 1px solid #eef1f2;
    color: #82828c;
    font-size: 16px;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
  }
  .answer_wrapper .field {
    width: 100%;
    outline: none;
    border: none;
    resize: none;
    height: 180px;
    padding: 15px;
  }
  .submit_wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .submit_wrapper .submit {
    color: #fff;
    font-size: 13px;
    padding: 4px 8px;
    border: none;
    outline: none;
    background-color: rgb(63,137,236);
    margin-right: 10px;
  }
  .submit_wrapper .submit:hover {
    background-color: rgb(63,137,236);
  }
  .count_title {
    color: #839aac;
    margin-bottom: 10px;
  }
  .answer_item {
    color: #333;
    margin-bottom: 10px;
    border-bottom: 1px solid #eef1f2;
  }
  .answer_item .content {
    margin-bottom: 10px;
  }
  .answer_item .answer_status {
    font-size: 11px;
    color: #bfc3c6;
    display: flex;
    justify-content: space-between;
  }
  .answer_item .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px 0;
  }
  .answer_item .actions .comment_button {
    color: #111;
    font-size: 12px;
    margin-right: 16px;
    cursor: pointer;
  }
  .answer_item .actions .comment_button .fa {
    color: #bfc3c6;
  }
  .answer_item .actions .admit_btn {
    outline: none;
    border: none;
    color: #fff;
    font-size: 13px;
    padding: 4px 8px;
    background-color: rgb(63,137,236);
  }
  .answer_item .actions .admit_btn:hover {
    background-color: rgb(63,137,236);
  }
  .best_btn{
    outline: none;
    border: none;
    color: #fff;
    font-size: 13px;
    padding: 4px 8px;
    background: #fbb91a;
  }
.content_comment_wrapper {
    width: 100%;
    background-color: #f5f7fa;
    padding: 15px;
  }
 .content_comment_wrapper .comment_item {
    border-bottom: 1px dotted #ccc;
    padding-bottom: 10px;
    position: relative;
  }
 .content_comment_wrapper .comment_item .comment_content {
    display: flex;
  }
.content_comment_wrapper .comment_item .comment_status {
    display: inline-block;
    width: 100%;
    font-size: 12px;
    color: #444;
    text-align: right;
  }
 .content_comment_wrapper .comment_item .comment_status > a {
    text-decoration: none;
    color: #333;
    cursor: pointer;
  }
   .content_comment_wrapper .comment_item:not(:first-child) {
    padding-top: 10px
  }
 .content_comment_wrapper .comment_item:last-child {
    border-bottom: none;
  }
.content_comment_wrapper .comment_item .content_avatar_wrapper {
    width: 32px;
    height: 32px;
    padding: 4px;
    background-color: #fff;
    border: 1px solid #ccc;
    margin-right: 10px;
  }
 .content_comment_wrapper .comment_item .content_text_wrapper {
    flex: 1;
  }
.content_comment_wrapper .comment_item .username {
    color: #2d64b3;
  }
.content_comment_wrapper .comment_item .text {
    color: #333;
  }
</style>
