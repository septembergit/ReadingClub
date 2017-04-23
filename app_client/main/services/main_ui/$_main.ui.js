// import CtrlUpLoadImg from './controller/ctrl.upload.img';
// import CtrlInput from './controller/ctrl.input';
angular
    .module('readApp')
    .service('$_uiModal', $_uiModal);
$_uiModal.$inject = ['$scope', '$uibModal', '$uibModalInstance', '$sce'];

function $_uiModal($scope, $uibModal, $uibModalInstance, $sce) {
    var that = this;
    that.modalBox = function (title, tpl) {
        $uibModal.open({
            template: require('./$_ui.modal.box.html'),
            controller: ($scope, $uibModalInstance, $sce, config) => {
                $scope.cancel = () => {
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.config = config;
                $scope.config.tpl = $sce.trustAsHtml($scope.config.tpl);
            },
            backdrop: false,
            resolve: {
                config: function () {
                    return {title, tpl};
                }
            }
        });
    };

    // that.modalInput = (opt) => {
    //
    //     let _opt = {
    //         title: opt.title || '无标题', //弹层标题
    //         modalClass: opt.modalClass || '', //弹层主题样式
    //         component: opt.component || '',  //组件
    //         size: opt.size || '',  //弹层尺寸
    //         data: opt.data || {},  //数据
    //         hideFooter: opt.hideFooter, //是否保留尾部
    //         hideSaveBtn: opt.hideSaveBtn, //隐藏保存按钮
    //         hideCancelBtn: opt.hideCancelBtn, //隐藏取消按钮
    //         cancelBtnName: opt.cancelBtnName || '取消', //取消按钮名字
    //         saveBtnName: opt.saveBtnName || '保存', //取消按钮名字
    //         cancelCallback: opt.cancelCallback || false
    //     };
    //
    //     $uibModal.open({
    //         animation: true,
    //         template: () => require('./$_ui.modal.input.html').replace('<hl-modal-component>', _opt.component),
    //         controller: CtrlInput,
    //         controllerAs: 'vm',
    //         size: _opt.size,
    //         backdrop: false,
    //         resolve: {
    //             config() {
    //                 return _opt;
    //             }
    //         }
    //     });
    // };
    //
    // that.modalUpLoadImg = (opt) => {
    //
    //     let _opt = {
    //         isCrop: opt.isCrop,
    //         imgKey: opt.imgKey || (new Date).valueOf(),
    //         width: opt.width || 320,
    //         height: opt.height || 320,
    //         isNoDisTip: opt.isNoDisTip,
    //     };
    //
    //     $uibModal.open({
    //         animation: true,
    //         template: require('./$_ui.modal.upload.img.html'),
    //         controller: CtrlUpLoadImg,
    //         controllerAs: 'vm',
    //         backdrop: false,
    //         size: _opt.isCrop ? 'lg' : '',
    //         resolve: {
    //             config() {
    //                 return _opt;
    //             }
    //         }
    //     });
    // };
};
