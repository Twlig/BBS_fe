<template>
  <div>
    <section class="container">
      <div class="header">
        <h1>标题标题标题标题</h1>
        <div class="title_buttons">
          <button @click="setGood()" v-if="type == 1">精华</button>
          <button @click="setTop()" v-if="type == 1">置顶</button>
          <button>修改</button>
          <!--<button>删除</button>-->
          <button>回复</button>
        </div>
      </div>
      <div class="content">
        <div class="content_left">
          <div class="content_avatar_wrapper">
            <img src="https://api.adorable.io/avatars/285/abott@adorable.png" width="100%" height="100%">
          </div>
          <span class="content_username">用户名用户名用户名</span>
        </div>
        <div class="content_right">
          <div class="text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae maxime fugit numquam. Esse quam numquam aspernatur inventore, nesciunt recusandae amet eos explicabo consequuntur eaque. Ea, nihil! Iure ab ipsa assumenda?
          </div>
          <span>1楼 2018-12-13 00:00:00 <a href="#">回复</a></span>
        </div>
      </div>
      <div class="content">
        <div class="content_left">
          <div class="content_avatar_wrapper">
            <img src="https://api.adorable.io/avatars/285/abott@adorable.png" width="100%" height="100%">
          </div>
          <span class="content_username">用户名用户名用户名</span>
        </div>
        <div class="content_right">
          <div class="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic consequuntur quibusdam sint nisi quam repellat voluptatum adipisci ratione vero nemo amet, sit fugit obcaecati consequatur omnis facilis deserunt natus vitae.
          </div>
          <span>1楼 2018-12-13 00:00:00 <a href="#">回复</a></span>
          <div class="content_comment_wrapper">
            <div class="comment_item">
              <div class="comment_content">
                <div class="content_avatar_wrapper">
                  <img src="https://api.adorable.io/avatars/285/abott@adorable.png" width="100%" height="100%">
                </div>
                <div class="content_text_wrapper">
                  <span class="username">用户名用户名</span>:
                  <span class="text">回复文字回复文字Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi rerum velit cumque perferendis vitae, libero in fugit magni aspernatur quo ea aperiam ut, voluptates perspiciatis nesciunt, nam enim non obcaecati?</span>
                </div>
              </div>
              <span class="comment_status">2018-12-14 14:28 <a href="#">回复</a></span>
            </div>
            <div class="comment_item">
              <div class="comment_content">
                <div class="content_avatar_wrapper">
                  <img src="https://api.adorable.io/avatars/285/abott@adorable.png" width="100%" height="100%">
                </div>
                <div class="content_text_wrapper">
                  <span class="username">用户名用户名</span>:
                  <span class="text">回复文字回复文字Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis enim magni eius nisi tempore ut reiciendis cumque temporibus adipisci repellat quia fuga voluptatem quaerat eaque, sapiente mollitia iusto corrupti harum?</span>
                </div>
              </div>
              <span class="comment_status">2018-12-14 14:28 <a href="#">回复</a></span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination_wrapper">
        <ul>
          <li>上一页</li>
          <li>1</li>
          <li>下一页</li>
        </ul>
      </div>
      <div class="add_comment">
        <h1 class="headtext">发表回复</h1>
        <div class="input_wrapper">
          <div class="input_header">
            <a href="#"><i class="fa fa-photo"></i>&nbsp;图片</a>
          </div>
          <textarea class="input_field" cols="16"></textarea>
        </div>
        <div class="submit_wrapper">
          <button class="btn">发表</button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        type: 0,
        baseUrl1: "http://119.29.150.121:8080/BBS",
        baseUrl2: "http://120.79.211.126:8080/test/",
        topTieLength: 0
      }
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
        this.axios.post(this.baseUrl2 + "doPostEditing?post_id=" + this.$route.query.postId)
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
          this.axios.post(this.baseUrl2 + "doPostSticky?post_id=" + this.$route.query.postId)
            .then(res => {
              if(res.data.status == '1') {
                alert("置顶成功")
              }
              else {
                alert("置顶失败")
              }
            })
        }
      }
    },
    created() {
      this.getType()
      this.toGetTopTie()
    }
  }
</script>
<style scoped>
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
