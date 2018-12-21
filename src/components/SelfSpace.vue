<template>
  <div>
    <div class="content">
      <div class="title">
        <img src="../assets/img/1.jpg">
        <div class="title_contain">
          <div class="title_contain_top">
            <span class="title_contain_follow"><i class="fa fa-database"></i>&nbsp100</span>
            <span class="title_contain_letter"><i class="fa fa-comments"></i>私信</span>
            <span class="title_contain_selfInfo"><i class="fa fa-id-card"></i>个人资料>></span>
          </div>
          <div class="name">小花不会说的货币</div>
        </div>
      </div>
      <div class="bbs_content">
        <div class="bbs_content_title"><img src="../assets/img/tie.png"><span>帖子</span></div>
        <div class="all_bbs_message">
          <div class="bbs_message">
            <div class="bbs_message_top">
              <img class="edit" src="../assets/img/edit.png">
              <div class="bbs_message_title">可不可以不吃早餐啊啊啊</div>
              <div class="bbs_message_time">2016-07-19</div>
            </div>
            <div class="bbs_message_detail">
              <div class="text">不可以不吃早餐不可以不吃早餐不可以不吃早餐</div>
              <img src="../assets/img/1.jpg">
              <img src="../assets/img/2.jpg">
            </div>
          </div>
          <div class="bbs_message">
            <div class="bbs_message_top">
              <img class="edit" src="../assets/img/edit.png">
              <div class="bbs_message_title">可不可以不吃早餐啊啊啊</div>
              <div class="bbs_message_time">2016-07-19</div>
            </div>
            <div class="bbs_message_detail">
              <div class="text">不可以不吃早餐不可以不吃早餐不可以不吃早餐</div>
              <img src="../assets/img/1.jpg">
              <img src="../assets/img/2.jpg">
            </div>
          </div>
          <div class="bbs_message">
            <div class="bbs_message_top">
              <img class="edit" src="../assets/img/edit.png">
              <div class="bbs_message_title">可不可以不吃早餐啊啊啊</div>
              <div class="bbs_message_time">2016-07-19</div>
            </div>
            <div class="bbs_message_detail">
              <div class="text">不可以不吃早餐不可以不吃早餐不可以不吃早餐</div>
              <img src="../assets/img/1.jpg">
              <img src="../assets/img/2.jpg">
            </div>
          </div>
          <div class="bbs_message">
            <div class="bbs_message_top">
              <img class="edit" src="../assets/img/edit.png">
              <div class="bbs_message_title">可不可以不吃早餐啊啊啊</div>
              <div class="bbs_message_time">2016-07-19</div>
            </div>
            <div class="bbs_message_detail">
              <div class="text">不可以不吃早餐不可以不吃早餐不可以不吃早餐</div>
              <img src="../assets/img/1.jpg">
              <img src="../assets/img/2.jpg">
            </div>
          </div>
          <div class="bbs_message">
            <div class="bbs_message_top">
              <img class="edit" src="../assets/img/edit.png">
              <div class="bbs_message_title">可不可以不吃早餐啊啊啊</div>
              <div class="bbs_message_time">2016-07-19</div>
            </div>
            <div class="bbs_message_detail">
              <div class="text">不可以不吃早餐不可以不吃早餐不可以不吃早餐</div>
              <img src="../assets/img/1.jpg">
              <img src="../assets/img/2.jpg">
            </div>
          </div>
          <div class="bbs_message">
            <div class="bbs_message_top">
              <img class="edit" src="../assets/img/edit.png">
              <div class="bbs_message_title">可不可以不吃早餐啊啊啊</div>
              <div class="bbs_message_time">2016-07-19</div>
            </div>
            <div class="bbs_message_detail">
              <div class="text">不可以不吃早餐不可以不吃早餐不可以不吃早餐</div>
              <img src="../assets/img/1.jpg">
              <img src="../assets/img/2.jpg">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
