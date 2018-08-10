<template>
    <div class="movieDetail">
        <div class="mdTopHead" ref="topHead">
            <div class="headLeft">
                <i class="icon iconfont icon-fanhui" @click="goBack"></i>
            </div>
            <div class="headMiddle">
                <i class="icon iconfont icon-dianying"></i>
                <span>电影</span>
            </div>
            <div class="headRight">
                <i class="icon iconfont icon-fenxiang"></i>
            </div>
        </div>
        <div ref="slideBox1" class="mdSlideBox">
            <div ref="slideGroup1">
                <div class="movieImg">
                    <div class="imgBox"><img :src="movie.img" alt=""></div>
                </div>
                <div class="movieInfo">
                    <div class="infoLeft">
                        <div class="mTitle">{{movie.name}}</div>
                        <div>{{getYear(movie.releaseDate)}}
                            <span v-for="t in movie.type">
                                                    / {{t}}
                                                </span>
                        </div>
                        <div>上映时间： {{getReleaseDate(movie.releaseDate)}}</div>
                        <div>片长：{{movie.mins}}</div>
                    </div>
                    <div class="infoRight">
                        <div class="ir1">豆瓣评分</div>
                        <div class="ir2" :class="{smallFont : movie.overallRating<0}">{{movie.overallRating
                            < 0 ? '尚未上映' : movie.overallRating}}</div>
                                <div v-html="makeStar(movie.overallRating)"></div>
                                <div class="ir3">{{movie.showtimeCount}}人</div>
                        </div>
                    </div>
                    <div class="commentDiv">
                        <button class="btnLeft">想看</button>
                        <button class="btnRight">看过<i class="icon iconfont icon-kongxing starS"></i><i class="icon iconfont icon-kongxing starS"></i><i class="icon iconfont icon-kongxing starS"></i><i class="icon iconfont icon-kongxing starS"></i><i class="icon iconfont icon-kongxing starS"></i></button>
                    </div>
                    <div class="breifIntro">
                        <p>简介</p>
                        <div class="intro" ref="intro" @click="open">
                            {{movie.story}}
                            <span @click.stop="fold">收起</span>
                        </div>
                    </div>
                    <div class="casts" @touchstart="redo()">
                        <p class="title">影人</p>
                        <div ref="slideBox2">
                            <div ref="slideGroup2" class="castsInnerBox">
                                <div class="castBox">
                                    <img :src="movie.director.img" alt="">
                                    <div class="actorName">{{movie.director.name}}</div>
                                    <div class="roleName">导演</div>
                                </div>
                                <div class="castBox" v-for="actor in movie.actors">
                                    <img :src="actor.img" alt="">
                                    <div class="actorName">{{actor.name}}</div>
                                    <div class="roleName" v-show="actor.roleName">饰：{{actor.roleName}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="discuss">
                        <el-tabs :stretch="true">
                            <el-tab-pane label="短评">
                                <p class="title">短评</p>
                                <div ref="slideBox3">
                                    <div ref="slideGroup3">
                                        <div class="discussBox" v-for="comment in shortComments">
                                            <div class="headIcon">
                                                <img :src="comment.caimg" alt="">
                                            </div>
                                            <div class="discussRightBox">
                                                <div class="discussTop">
                                                    <div class="customer">
                                                        <div class="cname">{{comment.ca}}</div>
                                                        <div class="cscore" v-html="makeStar(Math.round(comment.cr))"></div>
                                                    </div>
                                                    <div class="thumbUp"><i class="icon iconfont icon-dianzan"></i><span>{{comment.commentCount}}</span></div>
                                                </div>
                                                <div class="discussContent">{{comment.ce}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="影评">
                                <p class="title">影评</p>
                                <div ref="slideBox4">
                                    <div ref="slideGroup4">
                                        <div class="discussBox" v-for="comment in longComments">
                                            <div class="headIcon">
                                                <img :src="comment.headurl" alt="">
                                            </div>
                                            <div class="discussRightBox">
                                                <div class="discussTop">
                                                    <div class="customer">
                                                        <div class="cname">{{comment.nickname}}</div>
                                                        <div class="cscore" v-html="makeStar(Math.round(comment.rating))"></div>
                                                    </div>
                                                    <div class="thumbUp"><i class="icon iconfont icon-dianzan"></i><span>{{comment.commentCount}}</span></div>
                                                </div>
                                                <div class="discussContent">
                                                    <p>{{comment.title}}</p>
                                                    {{comment.content}}
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import BScroll from "better-scroll";
    import axios from "axios";
    export default {
        data() {
            return {
                wasAt: "",
                screenWidth: document.documentElement.clientWidth,
                screenHeight: document.documentElement.clientHeight,
                shortComments: [],
                longComments: [],
                shortPageIndex: 1,
                longPageIndex: 1,
                briefIntro: '',
                movie: {
                    "actors": [],
                    "award": {},
                    "bigImage": "",
                    "commentSpecial": "",
                    "community": {},
                    "director": {},
                    "festivals": [],
                    "hotRanking": -1,
                    "img": "",
                    "is3D": false,
                    "isDMAX": false,
                    "isEggHunt": true,
                    "isFilter": false,
                    "isIMAX": true,
                    "isIMAX3D": false,
                    "isTicket": true,
                    "message": "",
                    "mins": "",
                    "movieId": 0,
                    "movieStatus": 1,
                    "name": "",
                    "nameEn": "",
                    "overallRating": 0,
                    "personCount": 0,
                    "quizGame": {},
                    "releaseArea": "",
                    "releaseDate": "",
                    "sensitiveStatus": false,
                    "showCinemaCount": 0,
                    "showDay": 0,
                    "showtimeCount": 0,
                    "stageImg": {},
                    "story": "",
                    "style": {},
                    "totalNominateAward": 0,
                    "totalWinAward": 0,
                    "type": [],
                    "url": "",
                    "video": {}
                }
            };
        },
        methods: {
            makeStar(score) {
                let full = `<i class="icon iconfont icon-manxing starS"></i>`;
                let half = `<i class="icon iconfont icon-banxing starS"></i>`;
                let empty = `<i class="icon iconfont icon-kongxing starS"></i>`;
                let s = score / 2;
                s = s < 0 ? 0 : s;
                let fullNum = Math.floor(s);
                let halfNum = s - fullNum;
                let emptyNum = 0;
                if (halfNum == 0) {
                    emptyNum = 5 - fullNum;
                } else {
                    emptyNum = 4 - fullNum;
                }
                let str = ``;
                for (let i = 0; i < fullNum; i++) {
                    str += full;
                }
                if (halfNum < 1 && halfNum != 0) {
                    str += half;
                }
                for (let i = 0; i < emptyNum; i++) {
                    str += empty;
                }
                return str;
            },
            getYear(str) {
                return str.substr(0, 4);
            },
            getReleaseDate(str) {
                return str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + str.substr(6, 2);
            },
            goBack() {
                this.wasAt = this.$route.params.wasAt;
                this.$router.push({
                    name: this.wasAt
                });
            },
            fold() {
                // this.$refs.intro.style.overflow = 'hidden';
                this.$refs.intro.style.webkitLineClamp = 4;
                console.log("收起");
            },
            open() {
                this.$refs.intro.style.webkitLineClamp = 20;
                console.log("展开");
            },
            initScreen() {
                let clientHeight = document.documentElement.clientHeight;
                let headHeight = this.$refs.topHead.offsetHeight;
                this.$refs.slideBox1.style.height = clientHeight - headHeight - 10 + "px";
                this.$refs.slideBox2.style.width = document.documentElement.clientWidth;
            },
            loadShortComments() {
                axios
                    .get("/api/shortComments?pageIndex=" + this.shortPageIndex + "&movieId=" + this.$route.params.movieId)
                    .then(res => {
                        this.shortPageIndex++;
                        console.log('短');
                        // console.log(res);
                        this.shortComments = res.data.data.cts;
                        console.log(this.shortComments);
                    })
                    .catch((err) => {
                        console.log("短评论错误" + err);
                    });
            },
            loadLongComments() {
                axios
                    .get("/api/longComments?pageIndex=" + this.longPageIndex + "&movieId=" + this.$route.params.movieId)
                    .then(res => {
                        this.longPageIndex++;
                        console.log('长');
                        console.log(res);
                        this.longComments = res.data.comments;
                    })
                    .catch((err) => {
                        console.log("长评论错误" + err);
                    });
            },
            _initScroll() {
                this.$nextTick(() => {
                    let group = this.$refs.slideGroup2.children;
                    let width = group[0].offsetWidth;
                    let num = group.length;
                    this.$refs.slideGroup2.style.width = num * width + "px";
                    let scroll1 = new BScroll(this.$refs.slideBox1, {});
                    let scroll2 = new BScroll(this.$refs.slideBox2, {
                        scrollX: true,
                        scrollY: false
                    });
                });
            },
            redo() {
                setTimeout(() => {
                    this._initScroll();
                }, 500);
            }
        },
        watch: {
            screenWidth(val) {
                this.redo();
                this.initScreen();
            },
            screenHeight(val) {
                this.redo();
                this.initScreen();
            }
        },
        created() {
            axios.get('/api/movieDetail?locationId=290&movieId=' + this.$route.params.movieId)
                .then(res => {
                    this.movie = res.data.data.basic;
                })
                .catch(err => {
                    console.log('movieDetail' + err)
                });
            this.loadShortComments();
            this.loadLongComments();
            // this.redo();
        },
        mounted() {
            const self = this;
            window.onresize = function() {
                self.screenWidth = document.documentElement.clientWidth;
                self.screenHeight = document.documentElement.clientHeight;
            };
            this.initScreen();
            this.redo();
        }
    };
</script>

<style>
    @import url(../../common/css/douban.css);
</style>
