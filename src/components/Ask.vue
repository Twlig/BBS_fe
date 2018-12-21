<template>
  <div class="container-fluid">
    <div class="col-md-6 col-lg-6 col-xs-12 col-md-offset-3 col-lg-offset-3">
      <h1 class="title"><i class="fa fa-exclamation-circle"></i>&nbsp;玻璃采光顶按规范分类是否属于幕墙工程</h1>
      <div class="status">
        <span class="username">dickduan88</span>
        <span class="time">6分钟前</span>
      </div>
      <div class="message">您的回答被采纳后将获得：系统奖励 <span class="bonus"><i class="fa fa-database"></i>15</span>（财富值+成长值）</div>
      <div class="answer_wrapper">
        <div class="head"><i class="fa fa-arrows-alt"></i></div>
        <textarea class="field"></textarea>
      </div>
      <div class="submit_wrapper">
        <button class="submit">提交回答</button>
      </div>
      <hr>
      <div class="count_title">2个回答</div>
      <div class="answer_item">
        <button class="best_btn">最佳答案</button>
        <div class="content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque non quam sint excepturi nobis laborum tempore animi enim iure illo, libero reiciendis possimus exercitationem, officiis assumenda rem! Nobis, alias nam?</div>
        <div class="answer_status">
          <span class="author">一起装修网官网</span>
          <span class="time">发布于3分钟前</span>
        </div>
        <div class="actions">
          <span class="comment_button"><i class="fa fa-commenting-o"></i>评论</span>
          <button class="admit_btn">采纳</button>
        </div>
      </div>
      <div class="answer_item">
        <button class="best_btn">最佳答案</button>
        <div class="content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque non quam sint excepturi nobis laborum tempore animi enim iure illo, libero reiciendis possimus exercitationem, officiis assumenda rem! Nobis, alias nam?</div>
        <div class="answer_status">
          <span class="author">一起装修网官网</span>
          <span class="time">发布于3分钟前</span>
        </div>
        <div class="actions">
          <span class="comment_button"><i class="fa fa-commenting-o"></i>评论</span>
          <button class="admit_btn">采纳</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
    color: #333;
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
</style>
