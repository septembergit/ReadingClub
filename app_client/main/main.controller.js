
import {MainHeaderCtrl} from './controller/main.header.ctrl';
import {MainContentCtrl} from './controller/main.content.ctrl';


export default angular.module('mainModule', [])
    .controller('MainContentCtrl', MainContentCtrl)
    .controller('MainHeaderCtrl', MainHeaderCtrl);