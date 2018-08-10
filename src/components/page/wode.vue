<template>
    <div>
        <div class="wdHead">
            <div class="headIcon">
                <div>
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533986708&di=2320d567525d300e616821a6b6fc3168&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2F5%2F56%2F5684FBF16D6EB43650B36C13C6EBC8D1.jpg" alt="">
                </div>
            </div>
            <div class="headInfo">
                <div class="myName">中華小子</div>
                <div class="myTicket"><i class="icon iconfont icon-piaowu"></i> 我的电影票</div>
            </div>
        </div>
        <div class="wdContent">
            <el-tabs :stretch="true">
                <el-tab-pane label="讨论">
                    <div class="betweenMsg">
                        参与或浏览过的讨论区将会出现在这里
                    </div>
                    <div class="wdContentBox">
                        <div class="wdContent">
                            <div class="title">动物世界</div>
                            <div class="info">9937人参与，1655个话题</div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="想看">
                    <div class="betweenMsg">
                        收藏为想看的电影将会出现在这里
                    </div>
                    <div class="wdContentBox">
                        <div class="wdContent">
                            <div class="title">死侍2</div>
                            <div class="info">9937人参与，1655个话题</div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="看过">
                    <div class="betweenMsg">
                        看过的电影将会出现在这里
                    </div>
                    <div class="wdContentBox">
                        <div class="wdContent">
                            <div class="title">我不是药神</div>
                            <div class="info">9937人参与，1655个话题</div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <bottomNav class="footer"></bottomNav>
    </div>
</template>

<script>
    import bottomNav from '../common/bottomNav';
    export default {
        components: {
            'bottomNav': bottomNav,
        }
    }
</script>

<style scoped>
    @import url(../../common/css/douban.css);
</style>
