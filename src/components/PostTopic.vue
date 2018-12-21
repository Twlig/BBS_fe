<template>
  <div>
    <div id="letter">
      <div class="add_comment">
        <img src="../assets/img/write.png"> <h1 class="headtext">发表新帖</h1>
        <div class="input_wrapper">
          <input class="input_field1" placeholder="请在此处填写标题">
          <SELECT id="idState" style="width:15%" name="1">
            <OPTION value="">帖子分类</OPTION>
            <OPTION value="1">大学校园</OPTION>
            <OPTION value="2">职业需求</OPTION>
            <OPTION value="3">娱乐八卦</OPTION>
          </SELECT>
        </div>
        <div class="input_wrapper">

          <div class="input_header">
            <a href="#"><i class="fa fa-photo"></i>&nbsp图片</a>
            <a href="#">&nbsp&nbsp&nbsp悬赏积分&nbsp</a><input type="text" id="num">
            <span class="bonus"><i class="fa fa-database"></i></span>

          </div>
          <textarea class="input_field" cols="16"></textarea>
        </div>
        <button class="btn">发表</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .bonus {
    color: #f19669;
  }
  .bonus .fa {
    color: #fbb91a;
  }
  #num{
    height:18px;
    width: 30px;
  }
  * {
    box-sizing: border-box;
  }
  img{
    width: 10px;
    height: 5px;
  }
  #idState{
    height: 30px;
    resize: none;
    border: none;
    outline: none;
    margin: 0 0;
    padding: 5px;
    color: #444444;
  }
  .add_comment {
    padding: 30px;
    padding-top: 0;
  }
  .add_comment .headtext {
    font-size: 14px;
    color: #333;
    font-weight: 700;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .add_comment .input_wrapper {
    width: 100%;
    height: auto;
    background-color: #fafafa;
    border: 1px solid #dfdfdf;
    margin-bottom: 20px;
  }
  .add_comment .input_wrapper .input_header {
    padding: 12px 14px;
    font-size: 12px;
  }
  .add_comment .input_wrapper .input_header > a {
    color: #3782f0;
    text-decoration: none;
  }
  .input_field1 {
    width: 85%;
    height: 30px;
    resize: none;
    border: none;
    outline: none;
    margin: 0;
    padding: 10px;
    /*border-top: 1px solid #dfdfdf;*/
    float: left;

  }
  .add_comment .input_wrapper .input_field {
    width: 100%;
    height: 220px;
    resize: none;
    border: none;
    outline: none;
    margin: 0;
    padding: 10px;
    border-top: 1px solid #dfdfdf;
  }
  .add_comment .btn {
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
  }
  .add_comment .btn:hover {
    background-image: linear-gradient(to bottom,#3887fa 0,#3782f0 100%);
    background-repeat: repeat-x;
    border-bottom-color: #296cee;
  }
  #letter {
    width: 700px;
    height: 500px;
    margin: 0 auto;
    box-shadow: rgba(0,0,0,0.4) 0 5px 20px;
    border: rgba(63,137,236,0.7) 1px solid;
  }
  img{
    width:25px;
    height: 25px;
    float: left;
    padding: 5px;
  }
</style>
