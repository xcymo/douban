<template>
    <div class="searchPage">
        <div class="searchHead">
            <div class="search"> 
                <el-input placeholder="搜索电影/电视剧/影人" clearable></el-input>
            </div>
            <span @click = "goBack">取消</span>
        </div> 
        <div class="searchBox">
            <div class="left"><span>搜索历史</span></div>
            <div class="right"><span>清除</span></div>
        </div> 
        <el-row>
            <el-col :span="12" v-for = "item in historyItem">
                <div class="historyItem">{{item}}</div>
            </el-col>
        </el-row>
        <div class="searchBox">
            <div class="left"><span>热门搜索</span></div>
            
        </div> 
    </div>
</template>


<script>
export default {
	data() {
		return {
			historyItem: ["星际穿越", "剪刀手爱德华", "绝命毒师", "致命魔术"],
			wasAt: ""
		};
	},
	methods: {
		goBack() {
			this.wasAt = this.$route.params.wasAt;
			this.$router.push({ name: this.wasAt });
		}
	}
};
</script>

<style>
@import url(../../common/css/douban.css);
</style>
