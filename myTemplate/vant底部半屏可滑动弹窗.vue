
<template>
  <div class="currentName">
    <van-popup 
      :overlay="true"
      v-model="isPopup" 
      position="bottom">
      <div class="popup-box">
        <div class="popup-header">
          <i class="iconfont icon-guanbi c-hide"></i>
          <div class="header-title">这里是弹窗标题</div>
          <i class="iconfont icon-guanbi" @click="closeComponent"></i>
        </div>
        <div class="popup-content">
          <div class="popup-list"></div>
        </div>
      </div>
    </van-popup>
  </div>
</template>


<script>

export default {
  name: "",

  //所有静态定义引用放前面，简洁明了
  mixins: [],
  filters: {},
  components: {},

  //组件内部数据定义
  data() { 
    return {
      isPopup: false,
    }
  },
  props: {},
  watch: {},
  computed: {},

  //路由钩子
  beforeRouteEnter() {},
  created() {},
  mounted() {},

  //自定义方法
  methods: {
    showComponent() {  //弹窗出现, 供父组件$refs调用
      this.isPopup = true;
    },
    closeComponent() { //弹窗关闭
      this.isPopup = false;
    }
  }

}
</script>

<style scoped lang="scss">
.currentName{
  .popup-box{
    height:7.24rem /* 724/100 */;
    background: #F7F8FA;
    display: flex;
    flex-direction: column;
    .popup-header{
      padding:0 .3rem /* 30/100 */;
      height:1.02rem /* 102/100 */;
      color:#666666;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-title{
        font-size: .3rem /* 30/100 */;
      }
      .icon-guanbi{
        font-size: .4rem /* 40/100 */;
      }
      .c-hide{
        opacity: 0;
      }
    }
    .popup-content{
      flex:1;
      overflow-x:hidden;
      .popup-list{
        padding:0 .3rem /* 30/100 */;
      }
    }
  }
}
</style>
