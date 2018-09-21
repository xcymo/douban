import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
    homePage: 'reying',
    bottomOpts: [
        { name: "热映", class: "icon-reying", isActive: true, rname: 'reying' },
        { name: "找片", class: "icon-zhaopian", isActive: false, rname: 'zhaopian' },
        { name: "我的", class: "icon-wode", isActive: false, rname: 'wode' }
    ],
    city: '广州',
    pastDay1: 0,
    pastMonth1: 0,
    movie: {
        title: '西门町老人',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533562793913&di=5c802b9a01e9d734d420b37558d44671&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb64543a98226cffc70e50294b3014a90f703eacd.jpg',
        year: '2018',
        date: '2011-11-11',
        loaf: 115,
        rate: 6.8,
        wantedCount: 4545
    },
    onShowMovieList: [],
    onTheListMovie: [],
    orderTimeList: [],
    orderPopList: []
}

const mutations = {
    switchPage(state, n) {
        state.homePage = state.bottomOpts[n].rname;
        state.bottomOpts.forEach(v => {
            v.isActive = false;
        });
        state.bottomOpts[n].isActive = true;
    },
    pageCorrect(state, page) {
        state.homePage = page;
        state.bottomOpts.forEach(v => {
            if (page == v.rname) {
                v.isActive = true;
            } else {
                v.isActive = false;
            }
        });

    },
    selectCity(state, city) {
        state.city = city;
    },
    changeDate(state, day, month) {
        state.pastDay1 = day;
        state.pastMonth1 = month;
    },
    changeMovie(state, arg) {

        state.movie.title = arg.title;
        state.movie.img = arg.img;
        state.movie.year = arg.year;
        state.movie.date = arg.date;
        state.movie.loaf = arg.loaf;
        state.movie.rate = arg.rate;
        state.movie.wantedCount = arg.wantedCount;
    },
    fillonShowMovieListData(state, arr) {
        state.onShowMovieList = [...state.onShowMovieList, ...arr];
    },
    // fillOnTheListData(state, arr) {
    //     state.onTheListMovie = [...state.onTheListMovie, ...arr];
    // },
    fillByTime(state) {
        state.onTheListMovie = state.orderTimeList;
    },
    fillByPop(state) {
        state.onTheListMovie = state.orderPopList;
    },
}


export default new Vuex.Store({
    state, mutations
});