// MainHeaderCtrl.$inject = ['topicData','userData'];
export class MainContentCtrl{
    constructor(){
        let that = this;
        that.message = "正在加载中。。。。";
        // topicData.success(function (data) {
        //     that.message = data.length > 0 ? "" : "暂无数据";
        //     that.data = data;
        // }).error(function (e) {
        //     console.log(e);
        //     that.message = "Sorry, something's gone wrong ";
        // });
        // that.user = user;
    }
}

