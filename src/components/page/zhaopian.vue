<template>
    <div class="zhaopian">
        <div class="ryHhead">
            <div class="longerSearch" @click="goSearch">
                <input type="text" placeholder="电影 / 电视剧 / 影人">
            </div>
        </div>
        <div class="ryTabs">
            <el-tabs :stretch='true' @tab-click="redo">
                <el-tab-pane label="电影">
                    <div class="zpContent" ref="bsxcy">
                        <div class="zpBigBox">
                            <div class="zpTitleBox">
                                <h2>豆瓣热门</h2>
                                <h3>全部99+<i class="icon iconfont icon-arrow-right"></i></h3>
                            </div>
                            <div class="zpOutterBox" ref="slideBox1">
                                <div class="zpContentBox" ref="slideGroup1">
                                    <div class="searchMovieBox" v-for="movie in onShowMovieList" @click="goDetail(movie)">
                                        <div class="topBox">
                                            <img :src="movie.img" alt="">
                                        </div>
                                        <div class="bottomBox">
                                            <span class="title">{{movie.tCn}}</span><br>
                                            <div class="mj" v-html="makeStar(movie.r)"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="zpTitleBox">
                                <h2>豆瓣 Top250</h2>
                                <h3>全部250部<i class="icon iconfont icon-arrow-right"></i></h3>
                            </div>
                            <div class="zpOutterBox" ref="slideBox2">
                                <div class="zpContentBox" ref="slideGroup2">
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="电视">
                    <div class="zpContent" ref="bsbs">
                        <div></div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <bottomNav class="footer"></bottomNav>
    </div>
</template>

<script>
    import bottomNav from "../common/bottomNav";
    import BScroll from "better-scroll";
    import axios from "axios";
    import store from "@/vuex/storage";
    import {
        mapMutations,
        mapState
    } from "vuex";
    export default {
        store,
        data() {
            return {
                onShowMovieList: []
            };
        },
        methods: {
            ...mapMutations(['changeMovie']),
            goSearch() {
                this.$router.push("/search/zhaopian");
            },
            redo() {
                this.$nextTick(() => {
                    setTimeout(() => {
                        this._initScroll();
                    }, 100);
                });
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
                str += `<span class="star color90">${score < 2? 2 : score}</span>`
                return str;
            },
            goDetail(movie) {
                let arg = {
                    title: movie.t,
                    img: movie.img,
                    year: movie.year,
                    date: movie.date,
                    loaf: 118,
                    rate: movie.r > 0 ? movie.r : 0,
                    wantedCount: movie.wantedCount
                };
                this.changeMovie(arg);
                this.$router.push('/movieDetail/zhaopian');
            },
            _initScroll() {
                let group = this.$refs.slideGroup1.children;
                let width = group[0].offsetWidth;
                let num = Math.ceil(group.length / 2);
                this.$refs.slideGroup1.style.width = num * width + 'px';
                this.Scroll1 = new BScroll(this.$refs.bsxcy, {});
                this.Scroll2 = new BScroll(this.$refs.bsbs, {});
                this.Scroll3 = new BScroll(this.$refs.slideBox1, {
                    scrollX: true,
                    scrollY: false,
                    click: true
                    //  tap:"set_cart,changeMastDisplay",
                    //  preventDefault: true
                });
            }
        },
        components: {
            bottomNav: bottomNav
        },
        created() {
            axios
                .get("/api/hotMovie?locationId=290")
                .then(res => {
                    this.onShowMovieList = res.data.ms;
                    console.log(this.onShowMovieList);
                    this.redo();
                })
                .catch(err => {
                    console.log("zhaopian wrong");
                    console.log(err);
                });
        }
    };
</script>


<style>
    @import url(../../common/css/douban.css);
</style>
