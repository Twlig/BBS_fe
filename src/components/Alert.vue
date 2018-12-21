<template>
  <div>
    <div id="alert">{{message}}
      <!--<img src="../assets/img/close.png"/>-->
    </div>
  </div>
</template>
<script>
  export default {
    props: ['message']
  }
</script>
<style scoped>
  #alert {
    line-height: 30px;
    /*padding-left: 80px;*/
    /*padding-right: 80px;*/
    width: 200px;
    margin: 0 auto;
    text-align: center;
    background-color: rgb(255,255,255);
    border-radius: 3px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    color: #000;
    font-size: 15px;
    transition: all 0.5s ease-in-out;
  }
  /*#alert img {*/
    /*width: 10px;*/
    /*height: 10px;*/
    /*position: absolute;*/
    /*top: 5px;*/
    /*right: 5px;*/
  /*}*/
</style>
