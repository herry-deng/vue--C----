<template>
  <div class="card-wrapper van-hairline--bottom">
    <div class="card-img">
      <img :src="images[0]" ref="img">
    </div>
    <div class="card-content">
      <div class="title overflow-hidden">{{title}}</div>
      <div class="desc overflow-hidden">{{ desc }}</div>
      <div class="tags">
        <div v-for="i in tags" :key="i">{{ i }}</div>
      </div>
      <div class="prices">￥{{ price }}</div>
      <div class="count">
        <div @touchend="count(id, -1)" v-if="num">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png">
        </div>
        <div class="num" v-if="num">{{ num }}</div>
        <div @touchend="count(id, 1)">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Animate from '../tools/animate';

export default {
  data() {
    return {
    };
  },
  props: ['images', 'tags', 'title', 'price', 'desc', 'id', 'num', 'nofly'],
  methods: {
    ...mapMutations(['storageChange']),
    count(id, num) {
      this.storageChange({ id, value: num });
      if (num === -1) {
        return;
      }
      if (this.nofly) {
        return;
      }
      // 图片的位置
      const { top, left } = this.$refs.img.getBoundingClientRect();
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } = this.$refs.img;
      const shopCar = document.getElementById('shop-car');
      // 购物车的位置
      const { left: carX, top: carY } = shopCar.getBoundingClientRect();
      // 购物车的大小
      const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;

      // 计算终止点位置   中心点位置
      const endX = carX + carWidth / 2;
      const endY = carY + carHeight / 2;

      // 封装组件
      Animate({
        startX: left,
        startY: top,
        endX,
        endY,
        src: this.$refs.img.src,
        width: imgWidth,
        height: imgHeight,
      });
    },
  },
};
</script>

<style lang="less">
.card-wrapper{
  width: 100%;
  display: flex;
  height: 100px;
  .card-img{
    width: 90px;
    margin-right: 20px;
    img{
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    flex: 1;
    position: relative;
    > div {
      width: 170px;
    }
    .title {
      font-size: 13px;
      color:  #1a1a1a;
      margin-top: 5px;
    }
    .desc {
      color: #aaa;
      font-size: 11px;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      >div {
        font-size: 10px;
        padding: 2px;
        color: #aaa;
        border: 1px solid #aaa;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
    .prices {
      color: #ff1a90;
      font-size: 14px;
      font-weight: 600;
      margin-top: 4px;
    }
    .count {
      display: flex;
      position: absolute;
      bottom: 12px;
      right: 15px;
      justify-content: flex-end;
      align-items: center;
      > div:not(.num) {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
        }
      }
      .num {
        padding:0 5px;
        height: 22px;
        line-height: 22px;
      }
    }
  }
}
.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
