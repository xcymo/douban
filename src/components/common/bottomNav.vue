<template>
    <div class="bottomNav">
        <el-row>
            <el-col :span="8" v-for="(item,index) in bottomOpts1">
              <div @click="switchPage(index);makeHomePage()">
                <i class="icon iconfont" :class="[{'iconActive' : item.isActive}, item.class]"></i>
                <div :class="{'iconActive' : item.isActive}">{{item.name}}</div>
              </div>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import store from "@/vuex/storage";
import { mapMutations, mapState } from "vuex";
export default {
  store,
  data() {
    return {};
  },
  computed: {
    ...mapState(["homePage", "bottomOpts"]),
    bottomOpts1: () => store.state.bottomOpts
  },
  methods: {
    ...mapMutations(["switchPage", "pageCorrect"]),
    // toggleActive(index) {
    //   this.bottomOpts.forEach((v, i) => {
    //     if (i == index) {
    //       v.isActive = true;
    //     } else {
    //       v.isActive = false;
    //     }
    //   });
    //   this.makeHomePage();
    // },
    makeHomePage() {
      this.$router.push({ name: store.state.homePage });
    }
  },
  created() {
    this.pageCorrect(this.$route.name);
  }
};
// mounted: function() {
//   this.makeHomePage();
// }
</script>

<style>
@import url(../../common/css/douban.css);
</style>
