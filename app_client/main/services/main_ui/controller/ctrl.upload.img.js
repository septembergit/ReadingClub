/**
 * Created by Rayr Lee on 2016/10/17.
 */

export default function ($rootScope, $uibModalInstance, $scope, FileUploader, $_uiNotify, config) {
    'ngInject';
    let that = this;

    that.resImageDataURI = '';
    that.imageDataURI = '';
    that.btnName = '保存';
    that.imageCropStep = config.isCrop ? 1 : 3;
    that.initCrop = false;
    that.config = config;
    that.WIDTH = 574;

    if(that.config.width === 640 ){
        that.WIDTH = 660;
    }

    const uploader = that.modalUploadImg = new FileUploader(
        {url: '//tms.xiaojukeji.com/api/public/upload'}
    );

    uploader.onAfterAddingFile = function (fileItem) {
        let reader = new FileReader();
        reader.readAsDataURL(fileItem._file);
        reader.onload = function (e) {
            $scope.$apply(() => {
                that.imageDataURI = e.target.result;
            });
        };
    };

    uploader.onCompleteItem = (fileItem, response, status) => {
        that.btnName = '保存';
        if (status === 200) {
            $rootScope.$broadcast('root.uploadImg', {
                [that.config.imgKey]: response
            });
            if(!that.config.isNoDisTip){
                $_uiNotify('保存图片成功！');
            }
            that.handle.cancel();
        } else {
            $_uiNotify('图片上传失败，请重试！');
        }
    };

    that.handle = {
        cancel() {
            $uibModalInstance.dismiss('cancel');
        },
        upload(){
            that.btnName = '上传中...';
            if (that.config.isCrop) {
                uploader.queue[0]._file = dataURLtoBlob(that.resImageDataURI);
            }
            uploader.queue[0].formData.push({business_type: 'walle'});
            uploader.uploadAll();
        }
    };

    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }
}