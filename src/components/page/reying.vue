<template>
  <div class="reying" ref="homePage">
    <div class="ryHhead" id="ryHead" ref="ryHead">
      <div class="cityChoose" @click="goSelectCity">
        <span>{{city}}</span> <i class="icon iconfont icon-xiala"></i>
      </div>
      <div class="movieSearch" @click="goSearch">
        <input type="text" placeholder="电影 / 电视剧 / 影人">
      </div>
    </div>
    <div class="ryTabs" ref="ryTabs">
      <el-tabs :stretch='true' @tab-click="redo">
        <el-tab-pane label="正在热映">
          <div class="ryContent" ref="BSon">
            <div class="onShowMovie">
              <div class="movieBox" v-for="movie in onShowMovieList" v-show="isOnShow(movie.rd)" @click="goDetail(movie)">
                <div class="leftBox"><img alt="pic" :src="movie.img"></div>
                <div class="middleBox">
                  <div class="mh1">{{movie.t}}</div>
                  <div class="mh2" v-html="makeStar(movie.r)"></div>
                  <div class="mh2">导演：{{movie.dN}}</div>
                  <div class="mh2">主演：{{movie.actors}}</div>
                </div>
                <div class="rightBox">
                  <p v-if="movie.wantedCount > 1000">{{(movie.wantedCount/1000) | keepDecimal}}万人看过</p>
                  <p v-if="movie.wantedCount < 1000">{{movie.wantedCount/100 | keepDecimal}}千人看过</p>
                  <button class="rBtn">购票</button>
                </div>
              </div>
              <div class="bottomTip">已经到底啦~</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="即将上映">
          <div class="ryContent" ref="KJme">
            <div class="willComeMovie">
              <div>
                <div class="dateChoose">
                  <span @click="changeDateFilter('all')" :class="{selectedMonth : showWhich == 'all'}">全部</span>
                  <span @click="changeDateFilter('1')" :class="{selectedMonth : showWhich == '1'}">8月</span>
                  <span @click="changeDateFilter('2')" :class="{selectedMonth : showWhich == '2'}">9月</span>
                  <span @click="changeDateFilter('3')" :class="{selectedMonth : showWhich == '3'}">10月</span>
                  <span class="blank"></span>
                  <span @click="orderedBy(0)" :class="{selectedMonth : !orderByPop}">时间</span>
                  <span @click="orderedBy(1)" :class="{selectedMonth : orderByPop}">热度</span>
                </div>
                <div class="jjContent" ref="BSwill">
                  <div class="onShowMovie">
                    <div v-for="(movie,index) in onTheListMovie" v-show="_isOnShow(movie)" @click="goDetail(movie)" :key="movie.title">
                      <div v-if="showThis('1',movie.rMonth,thisMonth)" v-show="isSelectedMonth('1')">
                        <div class="dateSplit" v-once v-show="hasShowed(index)">{{whenShow(movie)}}</div>
                        <div class="movieBox">
                          <div class="leftBox"><img alt="pic" :src="movie.image"></div>
                          <div class="middleBox">
                            <div class="mh1">{{movie.title}}</div>
                            <div class="mh2">导演：{{movie.director}}</div>
                            <div class="mh2">主演：{{movie.actor1}}/{{movie.actor2}}</div>
                          </div>
                          <div class="rightBox">
                            <p v-if="movie.wantedCount > 1000">{{(movie.wantedCount/1000) | keepDecimal}}万人想看</p>
                            <p v-if="movie.wantedCount < 1000">{{movie.wantedCount/100 | keepDecimal}}千人想看</p>
                            <button class="rBtn">想看</button>
                          </div>
                        </div>
                      </div>
                      <div v-if="showThis('2',movie.rMonth,thisMonth+1)" v-show="isSelectedMonth('2')">
                        <div class="dateSplit" v-once v-show="hasShowed(index)&&(!orderByPop)">{{whenShow(movie)}}</div>
                        <div class="movieBox">
                          <div class="leftBox"><img alt="pic" :src="movie.image"></div>
                          <div class="middleBox">
                            <div class="mh1">{{movie.title}}</div>
                            <div class="mh2">导演：{{movie.director}}</div>
                            <div class="mh2">主演：{{movie.actor1}}/{{movie.actor2}}</div>
                          </div>
                          <div class="rightBox">
                            <p v-if="movie.wantedCount > 1000">{{(movie.wantedCount/1000) | keepDecimal}}万人想看</p>
                            <p v-if="movie.wantedCount < 1000">{{movie.wantedCount/100 | keepDecimal}}千人想看</p>
                            <button class="rBtn">想看</button>
                          </div>
                        </div>
                      </div>
                      <div v-if="showThis('3',movie.rMonth,thisMonth+2)" v-show="isSelectedMonth('3')">
                        <div class="dateSplit" v-once v-show="hasShowed(index)">{{whenShow(movie)}}</div>
                        <div class="movieBox">
                          <div class="leftBox"><img alt="pic" :src="movie.image"></div>
                          <div class="middleBox">
                            <div class="mh1">{{movie.title}}</div>
                            <div class="mh2">导演：{{movie.director}}</div>
                            <div class="mh2">主演：{{movie.actor1}}/{{movie.actor2}}</div>
                          </div>
                          <div class="rightBox">
                            <p v-if="movie.wantedCount > 1000">{{(movie.wantedCount/1000) | keepDecimal}}万人想看</p>
                            <p v-if="movie.wantedCount < 1000">{{movie.wantedCount/100 | keepDecimal}}千人想看</p>
                            <button class="rBtn">想看</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bottomTip">已经到底啦~</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <bottomNav class="footer" ref="ryFoot"></bottomNav>
  </div>
</template>

<script>
  import Vue from "Vue";
  import jsonp from 'vue-jsonp'
  import bottomNav from "../common/bottomNav";
  import BScroll from "better-scroll";
  import axios from "axios";
  import myKit from "@/common/js/myToolKit";
  import store from "@/vuex/storage";
  import {
    mapMutations,
    mapState
  } from "vuex";
  Vue.use(jsonp);
  export default {
    store,
    myKit,
    data() {
      return {
        onShowMovieList: [],
        onTheListMovie: [],
        orderTimeList: [],
        showWhich: "all",
        orderByPop: false,
        windowHeight: ""
      };
    },
    computed: {
      ...mapState(["city", "pastDay1", "pastMonth1"]),
      thisMonth: function() {
        return this.onTheListMovie[0].rMonth;
      },
      orderPopList: function() {
        return [...this.orderTimeList].sort(function(item1, item2) {
          return item2.wantedCount - item1.wantedCount;
        });
      }
    },
    methods: {
      goSelectCity() {
        this.$router.push("/cityChoose");
      },
      goSearch() {
        this.$router.push("/search/reying");
      },
      makeStar(score) {
        let full = `<i class="icon iconfont icon-manxing star"></i>`;
        let half = `<i class="icon iconfont icon-banxing star"></i>`;
        let empty = `<i class="icon iconfont icon-kongxing star"></i>`;
        let s = score / 2;
        s = s < 0 ? 0 : s;
        let fullNum = Math.floor(s);
        let halfNum = s - fullNum;
        let emptyNum = 4 - fullNum;
        let str = ``;
        for (let i = 0; i < fullNum; i++) {
          str += full;
        }
        if (halfNum < 1) {
          str += half;
        }
        for (let i = 0; i < emptyNum; i++) {
          str += empty;
        }
        str += `<span class="star color90">${score < 2 ? 2 : score}分</span>`;
        return str;
      },
      changeDateFilter(arg) {
        this.showWhich = arg;
      },
      showThis(arg1, month, arg2) {
        if (
          (this.showWhich == "all" || this.showWhich == arg1) &&
          month == arg2
        ) {
          return true;
        } else {
          return false;
        }
      },
      isOnShow(time) {
        let date = myKit.num2date(time);
        let today = new Date();
        return today - date > 0 && today - date < 25920000000;
      },
      _isOnShow(movie) {
        let date = new Date(movie.rYear, movie.rMonth - 1, movie.rDay);
        let today = new Date();
        return today - date < 0;
      },
      hasShowed(index) {
        if (index == 0) {
          return true;
        } else {
          return (
            this.onTheListMovie[index].rDay !=
            this.onTheListMovie[index - 1].rDay ||
            this.onTheListMovie[index].rMonth !=
            this.onTheListMovie[index - 1].rMonth ||
            this.onTheListMovie[index].rYear !=
            this.onTheListMovie[index - 1].rYear
          );
        }
      },
      whenShow(movie) {
        let str = movie.rMonth + "月" + movie.rDay + "日，星期";
        let day = new Date(movie.rYear, movie.rMonth - 1, movie.rDay).getDay();
        let _day = "";
        if (day == 0) {
          _day = "一";
        } else if (day == 1) {
          _day = "二";
        } else if (day == 2) {
          _day = "三";
        } else if (day == 3) {
          _day = "四";
        } else if (day == 4) {
          _day = "五";
        } else if (day == 5) {
          _day = "六";
        } else if (day == 6) {
          _day = "天";
        }
        str += _day;
        return str;
      },
      isSelectedMonth(month) {
        let m = month + "";
        if (this.showWhich == "all") {
          return true;
        } else if (this.showWhich == m) {
          return true;
        } else {
          return false;
        }
      },
      orderedBy(num) {
        if (num == 0) {
          this.orderByPop = false;
          this.onTheListMovie = this.orderTimeList;
        } else if (num == 1) {
          this.orderByPop = true;
          this.onTheListMovie = this.orderPopList;
        }
      },
      goDetail(movie) {
        this.$router.push("/movieDetail/reying/" + movie.id);
      },
      redo() {
        this.$nextTick(() => {
          setTimeout(() => {
            this._initScroll();
          }, 200);
        });
      },
      loadData1(api,data,ref) {
        axios.get('/api/hotMovie?locationId=290').then((res) => {
            this.onShowMovieList = res.data.ms.concat(this.onShowMovieList)
            this.$nextTick(() => {
              if (!this.scroll) {
                this.scroll1 = new BScroll(this.$refs.BSon, {click: true})
                this.scroll1.on('touchend', (pos) => {
                  // 下拉动作
                  if (pos.y > 50) {
                    this.loadData()
                  }
                })
              } else {
                this.scroll.refresh()
              }
            })
          })
          .catch(err => {
            console.log('1wrong');
          });
      },
      _initScroll() {
        this.Scroll1 = new BScroll(this.$refs.BSon, {
          click: true
        });
        this.Scroll2 = new BScroll(this.$refs.BSwill, {
          click: true
        });
        this.Scroll2.on("scroll", pos => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      }
    },
    filters: {
      keepDecimal(num) {
        return Math.round(num * 10) / 10;
      }
    },
    components: {
      bottomNav: bottomNav
    },
    created() {
      //
      // axios.get('/api/hotMovie?locationId=290')
      //   .then(res => {
      //     this.onShowMovieList = res.data.ms;
      //   })
      //   .catch(err => {
      //     console.log('1wrong');
      //   });
      this.loadData1();
      axios
        .get("/api/movieComing?locationId=290")
        .then(res => {
          this.onTheListMovie = res.data.moviecomings;
          this.orderTimeList = res.data.moviecomings;
        })
        .catch(err => {
          console.log("2wrong");
        });
      this.redo();
    },
    mounted() {
      let h = this.$refs.ryHead.offsetHeight;
      let h2 = document.documentElement.clientHeight;
      this.$refs.BSon.style.height = h2 - 110 - h + "px";
      this.$refs.KJme.style.height = h2 - 110 - h + "px";
    }
  };
</script>

<style>
  @import url(../../common/css/douban.css);
</style>


