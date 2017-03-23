/**
 * Created by Rayr Lee on 2016/7/6.
 */

export default {
    mainHeader: {
        template: require('./tpl/header.html'),
        controller: 'MainHeaderCtrl as vm'
    },
    mainFooter: {
        template: require('./tpl/footer.html')
    },
    mainContent: {
        template: require('./tpl/content.html'),
        controller: 'MainContentCtrl as vm'
    }
}