<template>
  <div>
    <!--<div class="animate1 wave">-->
      <!--<div class="w1"></div>-->
      <!--<div class="w2"></div>-->
      <!--<div class="w3"></div>-->
      <!--<div class="w4"></div>-->
    <!--</div>-->
    <img id="apDiv6" src="../assets/img/pencil.png" width="50px" height="50px" alt="发帖" longdesc="#" @click="toPostTopic()">
    <div>
    <div class="container">
      <div class="header"><a href="#"> <img src="../assets/img/BBS.png"name="Insert_logo" width="125" height="84" id="Insert_logo" style="display:block;" /></a>
        <!-- end .header --></div>
      <div class="sidebar1">
        <ul class="nav">
          <li v-for="item in category"><a href="#" class="ZiTi">{{item.category_name}}</a></li>
        </ul>
      </div>
      <div class="content">
        <div>
          <p v-for="item in topTie"><button class="bt1">置顶</button><a @click="toTieDetail(item.post_id)" class="TieZiZT">{{item.post_title}}</a>
            <img class="tieIcon" src="../assets/img/top1.png" @click="moveUpPost(item.post_id)">
            <img class="tieIcon" src="../assets/img/down.png" @click="moveDownPost(item.post_id)">
            <img class="tieIcon" src="../assets/img/undo.png" @click="cancelSticky(item.post_id)">
          </p>
        </div>
        <!--加精贴-->
        <div v-if="goodTieLength > 0">
          <hr align="center" size="10" >
          <p v-for="item in nowGoodTie"><button class="bt2">精</button><a @click="toTieDetail(item.post_id)" class="TieZiZT">{{item.post_title}}</a>
            <img class="tieIcon" src="../assets/img/undo.png" @click="cancelEditing(item.post_id)"/>
          </p>
          <p style="text-align:left;">
            <input @click="goodPre()" type="submit" name="FaTie7" id="FaTie7" value="上一页">
            <span v-for="(index) in goodTieGroup">
            <span @click="toGoodIndex(index)" v-if="goodTieGroup > 8"><a :class="[goodNowIndex == index ? 'current' : '']" v-if="index < 5 || index > (goodTieGroup - 4)">{{index}}&nbsp;</a><a v-if="index === goodTieGroup - 5">...</a></span>
            <a @click="toGoodIndex(index)" :class="[goodNowIndex == index ? 'current' : '']" v-if="goodTieGroup <= 8">{{index}}&nbsp;</a>
          </span>
            <span>跳转到</span><input v-model="goodHrefIndex" type="text" class="hrefInput" @keyup.enter="toGoodIndex1()"/>页
            <input @click="goodNext()" type="submit" name="FaTie10" id="FaTie10" value="下一页">
          </p>
        </div>
        <!--赏金贴-->
        <div v-if="scoreTieLength > 0">
          <hr size="10">
          <p @click="toTieDetailSj(item.post_id)" v-for="item in nowScoreTie"><button class="bt3">赏</button><a class="TieZiZT">{{item.post_title}}</a></p>
          <p style="text-align:left;">
            <input @click="scorePre()" type="submit" name="FaTie8" id="FaTie8" value="上一页">
            <span v-for="(index) in scoreTieGroup">
            <span @click="toScoreIndex(index)" v-if="scoreTieGroup > 8"><a @click="toUsualIndex(index)" :class="[scoreNowIndex == index ? 'current' : '']" v-if="index < 5 || index > (scoreTieGroup - 4)" href="#">{{index}}&nbsp;</a><a v-if="index === scoreTieGroup - 5">...</a></span>
            <a @click="toScoreIndex(index)" :class="[scoreNowIndex == index ? 'current' : '']" href="#" v-if="scoreTieGroup <= 8">{{index}}&nbsp;</a>
            </span>
            <span>跳转到</span><input v-model="scoreHrefIndex" type="text" class="hrefInput" @keyup.enter="toScoreIndex1()"/>页
            <input @click="scoreNext()" type="submit" name="FaTie11" id="FaTie12" value="下一页">
          </p>
        </div>
        <!--普通贴 -->
        <div v-if="usualTieLength > 0">
          <hr size="10">
          <p @click="toTieDetail(item.post_id)" v-for="item in nowusualTie"><button class="bt1">话题</button><a class="TieZiZT">{{item.post_title}}</a></p>
          <p style="text-align:left;">
            <input @click="usualPre()" type="submit" name="FaTie9" id="FaTie9" value="上一页">
            <span v-for="(index) in usualTieGroup">
            <span @click="toUsualIndex(index)" v-if="usualTieGroup > 8"><a :class="[nowIndex == index ? 'current' : '']" v-if="index < 5 || index > (usualTieGroup - 4)">{{index}}&nbsp;</a><a v-if="index === usualTieGroup - 5">...</a></span>
            <a @click="toUsualIndex(index)" :class="[nowIndex == index ? 'current' : '']" v-if="usualTieGroup <= 8">{{index}}&nbsp;</a>
          </span>
            <span>跳转到</span><input v-model="hrefIndex" type="text" class="hrefInput" @keyup.enter="toUsualIndex1()"/>页
            <input @click="usualNext()" type="submit" name="FaTie11" id="FaTie11" value="下一页">
          </p>
        </div>
        <!-- end .content -->
      </div>
      <div class="sidebar2">
        <div v-if="isLogin">
          <a href="#"><img src="../assets/img/head.png"name="User_logo" width="60" height="60" id="User_logo" style="margin:auto; display:block;" /></a>
          <a href="#" style="font-size: 13px"> 个人空间>></a>
        </div>
        <div @click="tologin()" class="login" v-if="!isLogin">
          没登录，去登录>>
        </div>
        <!-- end .sidebar2 -->
      </div>
      <!--<div class="footer">-->
      <!--</div>-->
    </div>
    </div>
    <div class="ad">
      <div class="ad_title">广告位招租</div>
      <banner :listImg="bannerList"></banner>
    </div>
    <div v-if="showModal" id="modal">
    </div>
      <div v-if="isLoginT" id="login" class="login1 animated bounceInDown">
        <img class="close1" src="../assets/img/close.png" @click="close()">
        <div style="clear: both;"></div>
        <div class="title">登录</div>
        <div class="input_div">
          <img src="../assets/img/user.png">
          <input placeholder="账户" id="user" v-model="accountLogin"/>
        </div>
        <div class="input_div">
          <img src="../assets/img/password.png">
          <input placeholder="密码" id="password" v-model="passwordLogin"/>
        </div>
        <button class="submit" @click="login()">登录</button>
        <div class="register" @click="toregister()">没账号，现在去注册</div>
      </div>
    <div v-if="isRegister" class="animated bounceInUp" id="register">
      <img class="close1" src="../assets/img/close.png" @click="close()">
      <div style="clear: both;"></div>
      <div class="title">注册</div>
      <div class="input_div">
        <img src="../assets/img/user.png">
        <input placeholder="账户" id="user1" v-model="account"/>
      </div>
      <div class="input_div">
        <img src="../assets/img/password.png">
        <input placeholder="密码" id="password1" type="password" v-model="password"/>
      </div>
      <div class="input_div">
        <img src="../assets/img/password.png">
        <input placeholder="确认密码" id="password2" type="password" v-model="passwordAgain"/>
      </div>
      <div class="input_div">
        <img src="../assets/img/true.png">
        <input placeholder="用户名" id="true_name" v-model="username"/>
      </div>
      <div class="input_div">
        <img src="../assets/img/phone.png">
        <input placeholder="手机号" id="phone" v-model="tel"/>
      </div>
      <div class="input_div">
        <img src="../assets/img/age.png">
        <input type="date" placeholder="出生日期" id="age" value="2018-07-22" v-model="age"/>
      </div>
      <div class="input_div">
        <img src="../assets/img/sex.png">
        <input placeholder="性别" id="sex" v-model="sex"/>
      </div>
      <div class="input_div">
        <img src="../assets/img/work.png">
        <input placeholder="工作性质" id="work" v-model="occupation"/>
      </div>
      <div class="input_div">
        <img src="../assets/img/workplace.png">
        <input placeholder="工作地点" id="workplace" v-model="place"/>
      </div>
      <button @click="register()" class="submit">注册</button>
    </div>
    <alert v-if="isAlert" :message="message" class="animated bounceInDown aletr"></alert>
  </div>
</template>

<script>
  import Banner from './Banner'
  import Swiper from './Swiper'
  import Alert from './Alert'
export default {
  name: 'Main',
  data () {
    return {
      isLogin: false,
      showModal: false,
      isLoginT: false,
      isRegister: false,
      isAlert: false,
      bannerList: [
        {"type":"1","img":"../../static/img/1.jpg","url":""},
        {"type":"1","img":"../../static/img/1.jpg","url":""},
        {"type":"1","img":"../../static/img/1.jpg","url":""},
        {"type":"1","img":"../../static/img/1.jpg","url":""}
      ],
      account: '',
      username: '',
      password: '',
      age: '',
      occupation: '',
      place: '',
      sex: '',
      tel: '',
      passwordAgain: '',
      baseUrl: "http://120.79.211.126:8080/javaweb-bbs",
      baseUrl1: "http://119.29.150.121:8080/BBS",
      baseUrl2: "http://120.79.211.126:8080/test/",
      accountLogin: '',
      passwordLogin: '',
      category: [],
      message: '',
      goodTie: [],
      nowGoodTie: [],
      goodTieLength: 0,
      goodTieStart: 0,
      goodTieEnd: 3,
      goodTieGroup: 9,
      goodNowIndex: 1,
      goodHrefIndex: null,
      scoreTie: [],
      nowScoreTie: [],
      scoreTieLength: 0,
      scoreTieStart: 0,
      scoreTieEnd: 3,
      scoreTieGroup: 9,
      scoreNowIndex: 1,
      scoreHrefIndex: null,
      usualTie: [],
      nowusualTie: [],
      usualTieLength: 0,
      usualTieStart: 0,
      usualTieEnd: 3,
      usualTieGroup: 9,
      nowIndex: 1,
      hrefIndex: null,
      topTie: []
    }
  },
  methods: {
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
    // getScore() {
    //   this.axios.get(this.baseUrl + "/api/getScoreTie")
    //     .then(res => {
    //       if(res.data.status == '0') {
    //         this.scoreTie = res.data.data
    //       }
    //       else {
    //         alert("请求失败")
    //       }
    //     })
    // },
    tologin() {
      this.showModal = true
      this.isLoginT = true
    },
    toregister() {
      this.isLoginT = false
      this.isRegister = true

    },
    close() {
      this.showModal = false
      this.isLoginT = false
      this.isRegister = false
    },
    register() {
      if(this.username == '' || this.account == '' || this.password == '' || this.age == '' || this.occupation == '' || this.place == '' || this.sex == '' || this.tel == '' || this.passwordAgain == '') {
        alert("请完成所有信息")
      }
      else {
        if(this.sex == '男' || this.sex == '女') {
          if(this.password === this.passwordAgain) {
            let data = {
              account: this.account,
              username: this.username,
              password: this.password,
              age: this.age,
              occupation: this.occupation,
              place: this.place,
              sex: this.sex,
              tel: this.tel
            }
            this.axios.post(this.baseUrl + "/api/register",data)
              .then(res => {
              })
          }
          else {
            alert("输入密码不一致")
          }
        }
        else {
          alert("性别类型不对")
        }
      }
    },
    login() {
      if(this.accountLogin == '' || this.passwordLogin == '') {
        this.message = "字段不能为空"
        this.isAlert = true
        let _this = this
        setTimeout(function () {
          _this.isAlert = false
        },1500)
      }
      else {
        let data = {
          account: this.accountLogin,
          password: this.passwordLogin
        }
        this.axios.post(this.baseUrl + "/api/login",data)
          .then(res => {
            if(res.data.status != '0') {
              this.message = "登录失败"
              this.isAlert = true
              let _this = this
              setTimeout(function () {
                _this.isAlert = false
              },1500)
            }
            else {
              this.isLogin = true
              this.isLoginT = false
              this.showModal = false
              localStorage.setItem("account",this.accountLogin)
              localStorage.setItem("type",res.data.data.type)
            }
          })
      }
    },
    toPostTopic() {
      if(this.isLogin) {
        this.$router.push('/postTopic')
      }
      else {
        this.tologin()
      }
    },
    toTieDetail(postId) {
      this.$router.push("/index?postId=" + postId)
    },
    toGetUsualTie() {
      this.axios.get(this.baseUrl2 + "getPost")
        .then(res => {
          this.usualTie = res.data.data.posts
          this.usualTieLength = this.usualTie.length
          this.nowusualTie = this.usualTie.slice(this.usualTieStart,this.usualTieEnd)
          if(this.usualTieLength % 3 === 0) {
            this.usualTieGroup = parseInt(this.usualTieLength / 3)
          }
          else {
            this.usualTieGroup = parseInt(this.usualTieLength / 3) + 1
          }
        })
    },
    toGetScoreTie() {
      this.axios.get(this.baseUrl + "/api/getScoreTie")
        .then(res => {
          this.scoreTie = res.data.data
          this.scoreTieLength = this.scoreTie.length
          this.nowScoreTie = this.scoreTie.slice(this.scoreTieStart,this.scoreTieEnd)
          if(this.scoreTieLength % 3 === 0) {
            this.scoreTieGroup = parseInt(this.scoreTieLength / 3)
          }
          else {
            this.scoreTieGroup = parseInt(this.scoreTieLength / 3) + 1
          }
        })
    },
    toGetGoodTie() {
      this.axios.get(this.baseUrl2 + "getEditingPost")
        .then(res => {
          if(res.data.status == '1') {
            this.goodTie = res.data.data.posts
            this.goodTieLength = this.goodTie.length
            this.nowGoodTie = this.goodTie.slice(this.goodTieStart,this.goodTieEnd)
            if(this.goodTieLength % 3 === 0) {
              this.goodTieGroup = parseInt(this.goodTieLength / 3)
            }
            else {
              this.goodTieGroup = parseInt(this.goodTieLength / 3) + 1
            }
          }
          else {
            alert("获取加精信息失败")
          }
        })
    },
    toGetTopTie() {
      this.axios.get(this.baseUrl2 + "getStickyPost")
        .then(res => {
          if(res.data.status == '1') {
            this.topTie = res.data.data.posts
          }
          else {
            alert("置顶帖子获取失败")
          }
        })
    },
    moveUpPost(postId) {
      this.axios.get(this.baseUrl2 + "moveUpPost?post_id=" + postId)
        .then(res => {
          if(res.data.status != '1') {
            alert("上移失败")
          }
          else {
            this.toGetTopTie()
          }
        })
    },
    moveDownPost(postId) {
      this.axios.get(this.baseUrl2 + "moveDownPost?post_id=" + postId)
        .then(res => {
          if(res.data.status != '1') {
            alert("下移失败")
          }
          else {
            this.toGetTopTie()
          }
        })
    },
    cancelSticky(postId) {
      this.axios.get(this.baseUrl2 + "cancelSticky?post_id=" + postId)
        .then(res => {
          if(res.data.status != '1') {
            alert("取消置顶失败")
          }
          else {
            this.toGetTopTie()
          }
        })
    },
    cancelEditing(postId) {
      this.axios.get(this.baseUrl2 + "cancelEditing?post_id=" + postId)
        .then(res => {
          if(res.data.status != '1') {
            alert("取消加精失败")
          }
          else {
            this.toGetGoodTie()
          }
        })
    },
    toTieDetailSj(postId) {
      this.$router.push("/ask?postId=" + postId)
    },
    usualPre() {
      if(this.usualTieStart >= 3) {
        this.nowIndex--
        this.usualTieStart = this.usualTieStart - 3
        this.usualTieEnd = this.usualTieEnd - 3
        this.nowusualTie = this.usualTie.slice(this.usualTieStart,this.usualTieEnd)
      }
    },
    usualNext() {
      if(this.usualTieEnd <= (this.usualTieLength - 1)) {
        this.nowIndex++
        this.usualTieStart = this.usualTieStart + 3
        this.usualTieEnd = this.usualTieEnd + 3
        if(this.usualTieStart <= (this.usualTieLength - 1)) {
          this.nowusualTie = this.usualTie.slice(this.usualTieStart,this.usualTieEnd)
        }
        else {
          this.nowusualTie = this.usualTie.slice(this.usualTieStart,this.usualTieLength)
        }
      }
    },
    toUsualIndex1() {
      if(this.hrefIndex >= this.usualTieGroup) {
        this.nowIndex = this.usualTieGroup
        this.usualTieStart = (this.usualTieGroup-1) * 3
        this.usualTieEnd = this.usualTieStart + 3
        this.nowusualTie = this.usualTie.slice(this.usualTieStart,this.usualTieLength)
      }
      else {
        this.nowIndex = this.hrefIndex
        this.usualTieStart = (this.hrefIndex-1) * 3
        this.usualTieEnd = this.usualTieStart + 3
        this.nowusualTie = this.usualTie.slice(this.usualTieStart,this.usualTieEnd)
      }
      this.hrefIndex = null
    },
    toUsualIndex(index) {
        console.log(index)
        this.nowIndex = index
        this.usualTieStart = (this.nowIndex-1) * 3
        this.usualTieEnd = this.usualTieStart + 3
        this.nowusualTie = this.usualTie.slice(this.usualTieStart,this.usualTieEnd)
    },
    goodPre() {
      if(this.goodTieStart >= 3) {
        this.goodNowIndex--
        this.goodTieStart = this.goodTieStart - 3
        this.goodTieEnd = this.goodTieEnd - 3
        this.nowGoodTie = this.goodTie.slice(this.goodTieStart,this.goodTieEnd)
      }
    },
    goodNext() {
      if(this.goodTieEnd <= (this.goodTieLength - 1)) {
        this.goodNowIndex++
        this.goodTieStart = this.goodTieStart + 3
        this.goodTieEnd = this.goodTieEnd + 3
        if(this.goodTieStart <= (this.goodTieLength - 1)) {
          this.nowGoodTie = this.goodTie.slice(this.goodTieStart,this.goodTieEnd)
        }
        else {
          this.nowGoodTie = this.goodTie.slice(this.goodTieStart,this.goodTieLength)
        }
      }
    },
    toGoodIndex1() {
      if(this.goodHrefIndex >= this.goodTieGroup) {
        this.goodNowIndex = this.goodTieGroup
        this.goodTieStart = (this.goodTieGroup-1) * 3
        this.goodTieEnd = this.goodTieStart + 3
        this.nowGoodTie = this.goodTie.slice(this.goodTieStart,this.goodTieLength)
      }
      else {
        this.goodNowIndex = this.goodHrefIndex
        this.goodTieStart = (this.goodHrefIndex-1) * 3
        this.goodTieEnd = this.goodTieStart + 3
        this.nowGoodTie = this.goodTie.slice(this.goodTieStart,this.goodTieEnd)
      }
      this.goodHrefIndex = null
    },
    toGoodIndex(index) {
      console.log(index)
      this.goodNowIndex = index
      this.goodTieStart = (this.goodNowIndex-1) * 3
      this.goodTieEnd = this.goodTieStart + 3
      this.nowGoodTie = this.goodTie.slice(this.goodTieStart,this.goodTieEnd)
    },
    toScoreIndex1() {
      if(this.scoreHrefIndex >= this.scoreTieGroup) {
        this.scoreNowIndex = this.scoreTieGroup
        this.scoreTieStart = (this.scoreTieGroup-1) * 3
        this.scoreTieEnd = this.scoreTieStart + 3
        this.nowScoreTie = this.scoreTie.slice(this.scoreTieStart,this.scoreTieLength)
      }
      else {
        this.scoreNowIndex = this.scoreHrefIndex
        this.scoreTieStart = (this.scoreHrefIndex-1) * 3
        this.scoreTieEnd = this.scoreTieStart + 3
        this.nowScoreTie = this.scoreTie.slice(this.scoreTieStart,this.scoreTieEnd)
      }
      this.scoreHrefIndex = null
    },
    toScoreIndex(index) {
      this.scoreNowIndex = index
      this.scoreTieStart = (this.scoreNowIndex-1) * 3
      this.scoreTieEnd = this.scoreTieStart + 3
      this.nowScoreTie = this.scoreTie.slice(this.scoreTieStart,this.scoreTieEnd)
    },
    scorePre() {
      if(this.scoreTieStart >= 3) {
        this.scoreNowIndex--
        this.scoreTieStart = this.scoreTieStart - 3
        this.scoreTieEnd = this.scoreTieEnd - 3
        this.nowScoreTie = this.goodTie.slice(this.scoreTieStart,this.scoreTieEnd)
      }
    },
    scoreNext() {
      if(this.scoreTieEnd <= (this.scoreTieLength - 1)) {
        this.scoreNowIndex++
        this.scoreTieStart = this.scoreTieStart + 3
        this.scoreTieEnd = this.scoreTieEnd + 3
        if(this.scoreTieStart <= (this.scoreTieLength - 1)) {
          this.nowScoreTie = this.scoreTie.slice(this.scoreTieStart,this.scoreTieEnd)
        }
        else {
          this.nowScoreTie = this.scoreTie.slice(this.scoreTieStart,this.scoreTieLength)
        }
      }
    }
  },
  components: {
    Banner,
    Swiper,
    Alert,
  },
  created() {
    if(localStorage.getItem("account") != null) {
      this.isLogin = true
    }
    this.getCategory()
    this.toGetUsualTie()
    this.toGetScoreTie()
    this.toGetGoodTie()
    this.toGetTopTie()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input[type=date]::-webkit-inner-spin-button{visibility: hidden;}
  p {
    overflow: hidden;
    font-size: 13px;
  }
  @-webkit-keyframes opac{
    from {
      opacity: 1;
      width:0;
      height:0;
      top:50%;
      left:50%;
    }
    to {
      opacity : 0;
      width:100%;
      height:100%;
      top:0;
      left:0;
    }
  }
  a {
    text-decoration: none;
    color: #414958;
    cursor: pointer;
     }
  .hrefInput {
    width: 18px;
    height: 18px;
    background-color: #fff;
    color: #333;
    text-align: center;
    border: 1px #666 solid;
    outline: none;
  }
  .animate1 {
    /*z-index: -1;*/
    position: fixed;
    left: 0;
    top: 0;
  }
  .animate1 .w2{
    -webkit-animation-delay:1s;
  }
  .animate1 .w3{
    -webkit-animation-delay:2s;
  }
  .animate1 .w4{
    -webkit-animation-delay:3s;
  }
  .wave{
    width: 500px;
    height: 500px;
    position: absolute;
    top: 10px;
    left: 20px;
  }
  .wave *{
    border:1px solid #fff;
    position:absolute;
    border-radius:50%;
    -webkit-animation:opac 4s infinite;
  }
  .tieIcon {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    cursor: pointer;
  }
  .current {
    color: red !important;
  }
  .ad {
    position: fixed;
    right: 25%;
    margin-right: -350px;
    top: 50px;
    width: 300px;
    height: 600px;
  }
  .ad_title {
    width: 100%;
    height: 20px;
    color: #333;
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
  }
  ul, ol, dl {
    padding: 0;
    margin: 0;
  }
  hr{
    background-color:rgba(63,137,236,0.1);
    margin-left: 10px;
    margin-right: 10px;
    border: none;
  }
  h1, h2, h3, h4, h5, h6, p {
    margin-top: 0;
    padding-right: 15px;
    padding-left: 15px;
  }
  a img {
    border: none;
  }

  a:link {
    color:#414958;
  }
  a:visited {
    color: #4E5869;
  }
  a:hover, a:active, a:focus {
    text-decoration: underline;
  }
  .container {
    width: 50%;
    height: 100%;
    max-width: 1260px;
    min-width: 780px;
    background-color: #FFF;
    margin: 0 auto;
  }

  .header {
    background-color: rgba(63,137,236,0.1);

  }

  .sidebar1 {
    float: left;
    width: 20%;
    background-color: white;
    padding-bottom: 10px;
  }
  .content {
    padding: 10px 0;
    width: 60%;
    float: left;
  }
  .sidebar2 {
    float: left;
    width: 20%;
    background-color: white;
    padding: 10px 0;
    text-align: center;
  }

  .content ul, .content ol {
    padding: 0 15px 15px 40px;
  }

  ul.nav {
    list-style: none;
    border-top: 2px solid rgba(63,137,236,0.3);
    margin-bottom: 15px;
  }
  ul.nav li {
    border-bottom: 1px solid rgba(63,137,236,0.3);
    text-align: center;
  }
  ul.nav a, ul.nav a:visited {
    padding: 5px 5px 5px 15px;
    display: block;
    text-decoration: none;
    background-color: rgba(63,137,236,0.3);
    color: #000;
  }
  ul.nav a:hover, ul.nav a:active, ul.nav a:focus {
    background-color: rgba(63,137,236,0.4);
  }

  .footer {
    padding: 10px 0;
    background-color: rgba(63,137,236,0.1);
    position: relative;
    clear: both;
  }

  #apDiv6 {
    position: fixed;
    right: 25%;
    bottom: 30px;
    cursor: pointer;
  }
  .ZiTi {
    font-size: 15px;
    font-family: 等线;

  }
  .TieZiZT {
    font-size: 13px;
  }
  input{
    width: 40px;
    line-height: 16px;
    font-size: 10px;
    border: none;
    color: #fff;
    background-color: rgba(63,137,236,0.4);
    cursor: pointer;
    margin: 10px;
  }
  .bt1{
    margin-right: 10px;
    outline: none;
    border: none;
    border: 1px solid #dee0de;
    background: linear-gradient(to top, #f5f5f5,lightsteelblue );
    min-width: 20px;
    border-radius: 2px;
    padding: 0 5px;
    color: #333;
    font-size: 10px;

  }
  .bt2{
    margin-right: 10px;
    outline: none;
    border: none;
    border: 1px solid #dee0de;
    background: linear-gradient(to top,pink,red);
    min-width: 20px;
    border-radius: 2px;
    padding: 0 5px;
    color: #333;
    font-size: 10px;

  }
  .bt3{
    margin-right: 10px;
    outline: none;
    border: none;
    border: 1px solid #dee0de;
    background: linear-gradient(to top, #fefefe, gold);
    min-width: 20px;
    border-radius: 2px;
    padding: 0 5px;
    color: #333;
    font-size: 10px;

  }
  .content { margin-right: -1px; }
  ul.nav a { zoom: 1; }
  .login {
    text-decoration: underline;
    color: rgb(63,137,236);
    font-size: 14px;
    cursor: pointer;
  }
  #login {
    position: fixed;
    left: 50%;
    margin-left: -200px;
    top: 10px;
    text-align: center;
    transition: all 0.7s ease-in-out;
    z-index: 2;
  }
  #modal {
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
  }
  .login1 {
    width: 400px;
    height: 420px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: rgba(0,0,0,0.4) 0px 10px 20px;
    border: rgba(63,137,236,0.7) 5px solid;
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
  .title {
    width: 100%;
    line-height: 50px;
    font-size: 25px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 30px;
    color: rgb(63,137,236);
  }
  .input_div {
    width: 300px;
    height: 40px;
    margin: 0 auto;
    margin-bottom: 20px;
    position: relative;
    border: 1px rgb(63,137,236) solid;
  }
  .input_div img {
    width: 26px;
    height: 26px;
    position: absolute;
    top: 50%;
    margin-top: -13px;
    left: 10px;
  }
  #user,
  #password{
    display: inline-block;
    width: 250px;
    height: 40px;
    outline: none;
    border: none;
    position: absolute;
    left: 50px;
    background-color: transparent;
    margin: 0;
    color: #000;
  }
  .register {
    width: 100%;
    text-align: center;
    font-size: 12px;
    text-decoration: underline;
    color: rgb(63,137,236);
    margin-top: 10px;
    cursor: pointer;
  }
  #register {
    width: 400px;
    height: 700px;
    background-color: #fff;
    box-shadow: rgba(0,0,0,0.4) 0px 10px 20px;
    border: rgba(63,137,236,0.7) 5px solid;
    position: fixed;
    top: 10px;
    left: 50%;
    margin-left: -200px;
  }
  .title {
    width: 100%;
    line-height: 30px;
    font-size: 25px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 30px;
    color: rgb(63,137,236);
  }
  .input_div {
    width: 300px;
    height: 40px;
    margin: 0 auto;
    margin-bottom: 15px;
    position: relative;
    border: 1px rgb(63,137,236) solid;
  }
  .input_div img {
    width: 26px;
    height: 26px;
    position: absolute;
    top: 50%;
    margin-top: -13px;
    left: 10px;
  }
  #user1,#phone,#work,#workplace,#sex,#age,#true_name,
  #password1,
  #password2{
    display: inline-block;
    width: 250px;
    height: 40px;
    outline: none;
    border: none;
    position: absolute;
    left: 50px;
    background-color: transparent;
    margin: 0;
    color: #000;
  }
  .submit {
    display: block;
    box-sizing: border-box;
    width: 304px;
    line-height: 40px;
    font-size: 16px;
    color: rgb(255,255,255);
    background-color: rgba(63,137,236,0.7);
    margin: 0 auto;
    border: none;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    border: 2px rgb(63,137,236) solid;
    color: rgb(63,137,236);
    background-color: rgb(255,255,255);
  }
  .submit:hover {
    color: rgb(255,255,255);
    background-color: rgba(63,137,236,1);
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
  @-webkit-keyframes bounceInUp {
    from,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 3000px, 0);
      transform: translate3d(0, 3000px, 0);
    }

    60% {
      opacity: 0.5;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }

    75% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }

    90% {
      opacity: 1;
      -webkit-transform: translate3d(0, -5px, 0);
      transform: translate3d(0, -5px, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes bounceInUp {
    from,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 3000px, 0);
      transform: translate3d(0, 3000px, 0);
    }

    60% {
      opacity: 0.5;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }

    75% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }

    90% {
      opacity: 1;
      -webkit-transform: translate3d(0, -5px, 0);
      transform: translate3d(0, -5px, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .bounceInUp {
    -webkit-animation-name: bounceInUp;
    animation-name: bounceInUp;
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
  .aletr {
    width: 200px;
    position: fixed;
    top: 20px;
    left: 50%;
    margin-left: -100px;
    z-index: 10;
  }
  /*@media (prefers-reduced-motion) {*/
    /*.animated {*/
      /*-webkit-animation: unset !important;*/
      /*animation: unset !important;*/
      /*-webkit-transition: none !important;*/
      /*transition: none !important;*/
    /*}*/
  /*}*/
</style>
