export default{
// 格式化日期
    formatDate(){
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();

    },

    //数字、字符串转换为日期
    num2date(time){
        let _time = '';
        if(typeof time == 'number'){
            _time = time.toString();
        }else{
            _time = time;
        }
        let year = _time.substring(0,4);
        let month = _time.substring(4,6);
        let day = _time.substring(6,8);
        month = parseInt(month) - 1;
        return new Date(year,month,day);
    }
}