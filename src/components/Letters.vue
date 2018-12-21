<template>
  <div>
    <div id="letter">
      <div id="left">
        <div class="title1"><img class="message" src="../assets/img/message.png"><span>私信消息</span></div>
        <div class="title2">
          <div class="left">
            <img class="leftimg" src="../assets/img/message1.png">
          </div>
          <div class="right">
            <img class="rightimg" src="../assets/img/friend.png">
          </div>
        </div>
        <div class="allMessage">
          <div class="message1" onclick="change(this)">
            <img src="../assets/img/1.jpg">
            <span class="name">小花不会说的货币</span>
          </div>
          <div class="message1" onclick="change(this)">
            <img src="../assets/img/2.jpg">
            <span class="name">王君干哈萨沙还是</span>
          </div>
        </div>
      </div>
      <div id="right">
        <div class="title">
          <img src="../assets/img/close.png">
        </div>
        <div class="content">
          <div class="withWho">正在与小花不会说的货币交谈</div>
          <div class="talkedContent">
            <div class="other">
              <div class="avatar_wrapper">
                <img src="../assets/img/1.jpg">
              </div>
              <div class="content_container">的国际爱护打卡德哈卡傻傻的哈桑更多撒谎的哈哈的卡莎开始的卡刷点卡等哈设计大厦看到哈桑但是觉得好傻客户大卡司打开但还是客户端撒谎大家大街上看到骄傲的看啥</div>
            </div>
            <div class="me">
              <div class="content_container">的国际爱护打卡德哈卡傻傻的哈桑更多撒谎的哈哈的卡莎开始的卡刷点卡等哈设计大厦看到哈桑但是觉得好傻客户大卡司打开但还是客户端撒谎大家大街上看到骄傲的看啥</div>
              <div class="avatar_wrapper">
                <img src="../assets/img/2.jpg">
              </div>
            </div>
            <div class="other">
              <div class="avatar_wrapper">
                <img src="../assets/img/1.jpg">
              </div>
              <div class="content_container">得好傻客户大卡司打开但还家大街上看到骄傲的看啥</div>
            </div>
            <div class="me">
              <div class="content_container">的国际爱护打卡德哈卡傻傻的哈桑更多撒谎的哈哈的卡莎开始的卡刷点卡等哈设计大厦看到哈桑但是觉得好傻客户大卡司打开但还是客户端撒谎大家大街上看到骄傲的看啥</div>
              <div class="avatar_wrapper">
                <img src="../assets/img/2.jpg">
              </div>
            </div>
            <div class="me">
              <div class="content_container">还是客户端撒谎大家大街上看到骄傲的看啥</div>
              <div class="avatar_wrapper">
                <img src="../assets/img/2.jpg">
              </div>
            </div>
          </div>
          <textarea class="talking" maxlength="200" rows="5" cols="5"></textarea>
          <button>发送</button>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
  </div>
</template>
<style scoped>
  #letter {
    width: 700px;
    height: 500px;
    margin: 0 auto;
    box-shadow: rgba(0,0,0,0.4) 0 5px 20px;
    border: rgba(63,137,236,0.7) 1px solid;
  }
  #left {
    width: 200px;
    height: 100%;
    float: left;
    border-right: 1px rgba(63,137,236,0.7) solid;
  }
  .title1,
  .title2{
    width: 100%;
    height: 50px;
    position: relative;
    font-size: 16px;
    color: #fff;
    background-color: rgba(63,137,236,0.5);
  }
  .title1 .message {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    margin-top: -10px;
    left: 50px;
  }
  .title1 span {
    line-height: 40px;
    position: absolute;
    top: 50%;
    margin-top: -20px;
    left: 80px;
  }
  .title2 {
    height: 40px;
    background-color: rgba(63,137,236,0.06);
  }
  .title2 .left {
    width: 50%;
    height: 100%;
    position: absolute;
    left: 0;
    border-bottom: 2px rgb(63,137,236) solid;
  }
  .title2 .right {
    width: 50%;
    height: 100%;
    position: absolute;
    right: 0;
  }
  .title2 .left .leftimg,
  .title2 .right .rightimg{
    width: 26px;
    height: 26px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -13px;
    margin-top: -13px;
    cursor: pointer;
  }
  .allMessage {
    width: 100%;
    position: relative;
  }
  .allMessage .message1 {
    width: 100%;
    height: 40px;
    position: relative;
    cursor: pointer;
  }
  .allMessage .message1 img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    left: 20px;
  }
  .allMessage .message1 span {
    width: 145px;
    line-height: 30px;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    left: 55px;
    color: #000;
    font-size: 14px;
  }
  #right {
    width: 498px;
    height: 100%;
    float: right;
  }
  #right .title {
    width: 100%;
    height: 50px;
    border-bottom: 1px rgba(63,137,236,0.7) solid;
    position: relative;
  }
  #right .title img {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  #right .content {
    width: 450px;
    height: 400px;
    border: 1px rgba(63,137,236,0.4) solid;
    margin: 0 auto;
    margin-top: 20px;
    position: relative;
  }
  #right .content .withWho {
    width: 440px;
    padding-left: 10px;
    line-height: 30px;
    background-color: rgba(63,137,236,0.3);
    color: #fff;
    font-size: 12px;
  }
  #right .content .talkedContent {
    width: 100%;
    height: 250px;
    border-bottom: 1px rgba(63,137,236,0.4) solid;
    position: relative;
    box-sizing: border-box;
    padding: 15px;
    font-size: 13px;
    overflow-y: scroll;
  }
  #right .content .talkedContent .other,
  #right .content .talkedContent .me{
    width: 100%;
    /*height: auto;*/
    /*position: relative;*/
    display: flex;
    margin-bottom: 20px;
  }
  #right .content .talkedContent .me {
    justify-content: flex-end;
  }
  #right .content .talkedContent .other .avatar_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 30px;
  }
  #right .content .talkedContent .me .avatar_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 30px;
  }
  #right .content .talkedContent .other .content_container {
    /*flex-grow: 1;*/
    margin-left: 5px;
    background-color: rgb(239, 239, 239);
    padding: 5px;
    border-radius: 5px;
  }
  #right .content .talkedContent .me .content_container {
    /*flex-grow: 1;*/
    margin-right: 5px;
    background-color: rgb(239, 239, 239);
    padding: 5px;
    border-radius: 5px;
  }
  #right .content .talkedContent .other img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    /*margin-top: -50%;*/
  }
  #right .content .talkedContent .me img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
  }
  #right .content .talking {
    width: 420px;
    height: 60px;
    outline: none;
    border: 1px rgba(63,137,236,0.4) solid;
    position: absolute;
    left: 50%;
    margin-left: -210px;
    margin-top: 10px;
    resize:none
  }
  #right .content button {
    width: 40px;
    line-height: 20px;
    font-size: 10px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    border: none;
    color: #fff;
    background-color: rgb(63,137,236);
    cursor: pointer;
  }
</style>
