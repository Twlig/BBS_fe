<template>
  <div>
    <div id="letter">
      <div class="add_comment">
        <img src="../assets/img/write.png"> <h1 class="headtext">编辑帖子</h1>
        <div class="input_wrapper">
          <input class="input_field1" v-model="postTitle" readonly>
          <input id="idState" style="width:15%" v-model="categoryName" readonly>
        </div>
        <div class="input_wrapper">
          <div class="input_header">
          </div>
          <textarea class="input_field" cols="16" v-model="postContent"></textarea>
        </div >
        <div>
          <button class="btn" @click="save()">保存修改</button>
          <button class="btn" @click="re()">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Index',
    data() {
      return {
        baseUrl: "http://119.29.150.121:8080/BBS_F",
        baseUrl1: "http://119.29.150.121:8080/BBS_C/",
        postId: '',
        postContent:'',
        postTitle:'',
        categoryName: ''
      }

    },
    methods:{
      re(){
        this.$router.go(-1)
      },
      getInfo(){
        this.postId = this.$route.query.Id
        this.axios.get(this.baseUrl1+ "/api/getPostByPostId?post_id="+this.postId)
          .then(res => {
            this.postContent = res.data.data.post_content
            this.postTitle = res.data.data.post_title
            this.categoryName = res.data.data.category_name
          })
      },
      save(){
        this.axios.get(this.baseUrl1+ "/api/updatePostContent?post_id="+this.postId+"&post_content="+this.postContent)
          .then(res => {
            if(res.data.status=='1'){
              alert("修改成功")
              this.$router.push("/Index?Id=" + this.postId )
            }
          })
      }
    },
    created(){
      this.getInfo();
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
