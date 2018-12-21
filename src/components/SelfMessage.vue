<template>
  <div>
    <div class="content">
      <div class="title">
        <img src="../assets/img/1.jpg">
        <div class="title_contain">
          <div class="title_contain_top">
          </div>
          <div class="name">小花不会说的货币</div>
        </div>
      </div>
      <div class="bbs_content">

        <div class="all_bbs_message">
          <div class="bbs_message">
            <div class="bbs_message_top">
              <img class="edit" src="../assets/img/phone.png">
              <div class="bbs_message_title">联系方式</div>
            </div>
            <div class="bbs_message_detail">
              12312413231
            </div>
          </div>
          <div class="bbs_message">
            <div class="bbs_message_top">
              <img class="edit" src="../assets/img/age.png">
              <div class="bbs_message_title">出生日期</div>
            </div>
            <div class="bbs_message_detail">
              1997-12-06
            </div>
          </div>
          <div class="bbs_message">
            <div class="bbs_message_top">
              <img class="edit" src="../assets/img/sex.png">
              <div class="bbs_message_title">性别</div>
            </div>
            <div class="bbs_message_detail">
              男
            </div>
          </div>
          <div class="bbs_message">
            <div class="bbs_message_top">
              <img class="edit" src="../assets/img/work.png">
              <div class="bbs_message_title">工作性质</div>
            </div>
            <div class="bbs_message_detail">
              互联网行业
            </div>
          </div>
          <div class="bbs_message">
            <div class="bbs_message_top">
              <img class="edit" src="../assets/img/workplace.png">
              <div class="bbs_message_title">工作地点</div>
            </div>
            <div class="bbs_message_detail">
              深圳
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
    height: 80px;
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
    width: 16px;
    height: 16px;
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

  .bbs_content .all_bbs_message .bbs_message .bbs_message_detail {
    width: 70%;
    box-sizing: border-box;
    padding-top: 15px;
    padding-left: 35px;
    padding-right: 35px;
    height: 60px;
    font-size: 13px;
    color: #444;
  }

  .bbs_content .all_bbs_message .bbs_message .bbs_message_detail img {
    width: 60px;
    height: 50px;
    margin-right: 10px;
  }
</style>
