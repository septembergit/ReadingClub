/**
 * Created by Rayr Lee on 2016/10/17.
 */

export default function ($uibModalInstance, $scope, config, $rootScope) {
    'ngInject';
    let that = this;
    that.modalData = config;
    that.handle = {
        save(){
            $scope.$broadcast('modal.save');
        },
        cancel() {
            if(that.modalData.cancelCallback === true){
                $scope.$broadcast('modal.cancel')
            }else {
                $uibModalInstance.dismiss('cancel');
            }
        },
        saveCancel(){
            $uibModalInstance.dismiss('cancel');
        }
    };

    $rootScope.$on('$stateChangeStart', () => {
        $uibModalInstance.dismiss('cancel');
    });
}