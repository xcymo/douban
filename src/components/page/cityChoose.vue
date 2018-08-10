<template>
    <div class="cityChoosePop">
        <div class="popHead">
            <i class="icon iconfont icon-fanhui" @click="goBack"></i><span>选择城市</span>
        </div>
        <div class="specificChoose">
            <el-tabs :stretch="true">
                <el-tab-pane label="国内">
                    <div class="cityEnter">
                        <i class="icon iconfont icon-souxun"></i>
                        <input type="text" placeholder="输入城市名称查询">
                    </div>
                    <div class="cityList">
                        <div>
                            <span>热门城市</span>
                            <el-row :gutter="10">
                                <el-col :span="8" v-for="(city,index) in cityList">
                                    <div class="hotCity" @click="selectCity(cityList[index]);goBack()">{{city}}</div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="海外">
                    <div class="cityEnter">
                        <i class="icon iconfont icon-souxun"></i>
                        <input type="text" placeholder="输入城市名称查询">
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import store from "@/vuex/storage";
    import {
        mapMutations,
        mapState
    } from "vuex";
    export default {
        store,
        data() {
            return {
                cityList: [
                    "北京",
                    "上海",
                    "广州",
                    "成都",
                    "深圳",
                    "武汉",
                    "杭州",
                    "重庆",
                    "郑州",
                    "南京",
                    "西安",
                    "苏州",
                    "天津",
                    "长沙",
                    "福州"
                ]
            };
        },
        methods: {
            goBack() {
                this.$router.push({
                    name: "reying"
                });
            },
            ...mapMutations(['selectCity'])
        }
    };
</script>

<style>
    @import url(../../common/css/douban.css);
</style>
