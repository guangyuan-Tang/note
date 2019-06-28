<template>
  <div class="BlankView" :style="{'padding-top': blankParams.top + 'rem'}">
    
    <!-- logo -->
    <div class="BlankView-logo">
      <img 
        :src="blankParams.logo.url" 
        :style="{
        'width': blankParams.logo.width + 'rem', 
        'height': blankParams.logo.height + 'rem' }" alt="" >
    </div>

    <!-- 提示 -->
    <div class="BlankView-hint">{{blankParams.hint}}</div>

    <!-- 按钮部分 -->
    <div class="BlankView-button">
      <div class="button-left" v-if="blankParams.oneBtn" @click="executeOneThing">
        {{blankParams.oneBtn.btnText}}
      </div>
      <div class="button-right" v-if="blankParams.twoBtn" @click="executeTwoThing" >
        {{blankParams.twoBtn.btnText}}
      </div>
    </div>

  </div>
</template>

<!-- 

父组件传参写法：
  blankParams: {
    top: Number , //整个组件距顶部距离 默认160px (可不传) 单位rem
    hint: String ,  //提示  默认"暂无数据" (可不传)
    logo: { //图片参数 (可不传)
      width: Number  //logo宽  单位rem
      height: Number  //logo高  单位rem
      url: require("@/assets/imgs/retail/goods_emty.png"), // logo图片地址
    },
    oneBtn: { // 如果需要一个按钮做些什么
      btnText: "去看看", //按钮显示文字
      doSomething: () => { // 点击按钮时做些什么
        this.$router.push({
          name: "retail/Index"
        })
      }
    },
    twoBtn: { // 如果需要第二个按钮做些什么
      btnText: "去玩玩", //按钮显示文字
      doSomething: () => { // 点击按钮时做些什么
        this.$router.push({
          name: "retail/User"
        })
      }
    }
  }

 -->


<script>


export default {
  data(){ 
    return {}
  },
  props: {
    blankParams:{
      type: Object,
      default: function() {
        return {
          hint: "暂无数据", //提示
          logo: { //logo
            url: require("@/assets/imgs/retail/goods_emty.png"), 
          }
        }
      }
    }
  },
  methods: {
    executeOneThing() { //执行第一个按钮事件
      this.blankParams.oneBtn.doSomething();
    },
    executeTwoThing() { //执行第二个按钮事件
      this.blankParams.twoBtn.doSomething();
    }
  }
}
</script>

<style scoped lang="scss">
.BlankView{
  padding-top: 1.6rem /* 160/100 */;
  .BlankView-logo{
    margin-bottom: .32rem /* 32/100 */;
    text-align: center;
    img{
      width:4.16rem /* 416/100 */;
      height:2.86rem /* 286/100 */;
    }
  }
  .BlankView-hint{
    text-align: center;
    color:#999999;
    padding: 0 .4rem /* 40/100 */;
    font-size: .24rem /* 24/100 */;
  }
  .BlankView-button{
    display: flex;
    justify-content: center;
    padding-top: .8rem /* 80/100 */;
    >div{
      width:30%;
      color:#fff;
      text-align: center;
      overflow: hidden;
      padding: 0 .05rem /* 5/100 */;
      height:.8rem /* 80/100 */;
      line-height: .8rem /* 80/100 */;
      margin-right: .3rem /* 30/100 */;
      font-size: .28rem /* 28/100 */;
      border-radius:.05rem /* 5/100 */;
      background:linear-gradient(-90deg,rgba(254,84,111,1) 0%,rgba(255,84,90,1) 100%);
    }
    &>div:last-child{
      margin-right: 0;
    }
  }
}
</style>






