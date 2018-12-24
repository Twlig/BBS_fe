<template>
  <div>
    <div id="letter">
      <div class="add_comment">
        <img src="../assets/img/write.png"> <h1 class="headtext">发表新帖</h1>
        <div class="input_wrapper">
          <input maxlength="25" class="input_field1" placeholder="请在此处填写标题,字数不能超过25个" v-model="postTitle">
          <select id="idState" style="width:15%" v-model="categorySelected" @change="setNeed()">
            <option v-for="item in category" :value="item.category_id">{{item.category_name}}</option>
          </select>
        </div>
        <div class="input_wrapper">
          <div class="input_header">
            <a href="#"><i class="fa fa-photo"></i>&nbsp图片<input v-on:change="showImg()" id="img" type="file" style="opacity:0;display: inline-block;width: 20px;position: relative;margin-left: -30px;"></a>
            <span v-if="isNeed">
              <a href="#">&nbsp&nbsp&nbsp悬赏积分&nbsp</a><input type="text" id="num" v-model="score">
              <span class="bonus"><i class="fa fa-database"></i></span>
            </span>
          </div>
          <div class="allMessage">
            <textarea class="input_field" rows="4" maxlength="100" placeholder="内容最多不能超过100字" v-model="postContent">
          </textarea>
            <div id="addImg" style="width: 100px;height: auto"></div>
          </div>
        </div>
        <div class="back" @click="back()">
          <img class="icon" src="../assets/img/back.png">
          <span class="iconFont">返回首页</span>
        </div>
        <button class="btn" @click="postImg()">发表</button>
        <button class="btn" @click="re()">返回</button>
      </div>
    </div>
    <div class="animated bounceInDown z_mask" v-if="removeTip">
      <!--弹出框-->
      <div class="z_alert">
        <p>确定要删除这张图片吗？</p>
        <div>
          <span class="z_cancel" @click="cancelRemove">取消</span>
          <span id="z_sure" @click="sureRemove">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        category: [],
        categorySelected: '',
        baseUrl: "http://120.79.211.126:8080/javaweb-bbs",
        baseUrl1: "http://119.29.150.121:8080/BBS",
        baseUrl2: "http://120.79.211.126:8089",
        postTitle: '',
        postContent: '',
        imgUrl: null,
        removeTip:false,
        isNeed: false,
        score: ''
      }
    },
    methods: {
      re(){
        this.$router.go(-1)
      },
      getCategory() {
        this.axios.get(this.baseUrl1 + "/api/getCategory")
          .then(res => {
            if (res.data.status == '1') {
              this.category = res.data.data.categories
            }
            else {
              alert("信息请求失败")
            }
          })
      },
      postImg() {
        let fileImgA = document.getElementById("img").files
        if(fileImgA.length > 0) {
          let fileImg = document.getElementById("img").files[0]
          let formData = new FormData()
          formData.append("img",fileImg)
          this.axios.post(this.baseUrl2 + "/api/uploadImage",formData)
            .then(res => {
              if(status == 0) {
                this.imgUrl = res.data.data.url
                this.postTopic()
              }
            })
        }
        else {
          this.postImg()
        }
      },
      postTopic() {
        let _this = this
        if(this.isNeed) {
          if(_this.postTitle == '' || this.categorySelected == '' || this.score == '') {
            alert("标题、类别和赏金不能为空不能为空")
          }
          else {
            let data = {
              account: localStorage.getItem("account"),
              category_id: _this.categorySelected,
              image: _this.imgUrl,
              post_content: _this.postContent,
              post_title: _this.postTitle,
              post_score: _this.score
            }
            _this.axios.post(_this.baseUrl + "/api/publishTie", data)
              .then(res => {
                if(res.data.status == '0') {
                  alert("发帖成功")
                }
                else {
                  alert("发帖失败")
                }
              })
          }
        }
        else {
          console.log(_this.imgUrl)
          if(_this.postTitle == '' || this.categorySelected == '') {
            alert("标题和类别不能为空")
          }
          else {
            _this.axios.get(_this.baseUrl1 + "/api/sendPost?post_title=" + _this.postTitle + "&post_content=" + _this.postContent + "&category_id=" + _this.categorySelected + "&account=" + localStorage.getItem("account") +"&image=" + _this.imgUrl)
              .then(res => {
                if(res.data.status == '1') {
                  alert("发帖成功")
                }
                else {
                  alert("发帖失败")
                }
              })
          }
        }
      },
      showImg() {
        var imgContainer = document.getElementById("addImg");
        var file = document.getElementById("img");
        var imgUrl = window.URL.createObjectURL(file.files[0]);
        var img = document.createElement("img");
        img.setAttribute("src", imgUrl);
        img.setAttribute("width","100px");
        var imgAdd = document.createElement("div");
        imgAdd.setAttribute("id","img-div");
        imgAdd.appendChild(img);
        imgContainer.appendChild(imgAdd);
        this.removeImg();
      },
      removeImg() {
        var imgDiv = document.getElementById("img-div");
        var that = this;
        imgDiv.onclick = function () {
          that.removeTip = true;
        }
      },
      sureRemove() {
        var parent = document.getElementById("addImg");
        var child = document.getElementById("img-div");
        parent.removeChild(child);
        this.removeTip = false;
      },
      cancelRemove() {
        this.removeTip = false;
      },
      setNeed() {
        if(this.categorySelected == '1005') {
          this.isNeed = true
        }
        else {
          this.isNeed = false
        }
      },
      back() {
        this.$router.push('/')
      }
    },
    created() {
      this.getCategory()
    }
  }
</script>
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
  .z_mask {
    width: 200px;
    height: 80px;
    position: fixed;
    top: 50px;
    left: 50%;
    margin-left: -100px;
    border: 1px rgb(63,137,237) solid;
    background-color: #fff;
    font-size: 14px;
  }
  .z_alert p {
    width: 100%;
    line-height: 40px;
    text-align: center;
  }
  .z_cancel,
  #z_sure{
    display: inline-block;
    width: 97px;
    height: 40px;
    text-align: center;
  }
  img{
    width: 10px;
    height: 5px;
  }
  #addImg {
    padding-left: 10px;
    padding-top: 30px;
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
  .allMessage {
    width: 100%;
    height: 250px;
    border: 1px solid #dfdfdf;
  }
  .allMessage textarea{
    width: 100%;
    height: auto;
    border: none;
    float: left;
    background-color: #fafafa;
    font-size: 12px;
  }
  .add_comment .input_wrapper .input_field {
    width: 100%;
    height: auto;
    resize: none;
    border: none;
    outline: none;
    margin: 0;
    padding: 10px;
    border-top: 1px solid #dfdfdf;
  }
  .back {
    float: left;
    cursor: pointer;
  }
  .icon {
    height: 30px;
    float: left;
  }
  .iconFont {
    width: 100px;
    line-height: 30px;
    font-size: 14px;
    color: rgb(63,137,237);
    float: left;
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
    float: right;
    margin-left: 10px;
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
    background-color: #fff;
  }
  img{
    width:25px;
    height: 25px;
    float: left;
    padding: 5px;
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
</style>
