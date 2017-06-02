angular
    .module('readApp')
    .service('authentication', authentication);
authentication.$inject = ['$window', '$http'];

function authentication($window, $http) {
    var saveToken = function (token) {
        $window.sessionStorage['read-token'] = token;
    };

    var getToken = function () {
        return $window.sessionStorage['read-token'];
    };
    var register = function (params) {
        return $http.post('/api/register', params)
            .success(function (data) {
                saveToken(data.token);
            });
    };

    var login = function (params) {
        return $http.post('/api/login', params)
            .success(function (data) {
                saveToken(data.token);
            });
    };

    var logout = function () {
        $window.sessionStorage.removeItem('read-token');
    };

    var isLoggedIn = function () {
        var token = getToken();
        if (token) {

            // 现代的浏览器有一个atob()的方法来解码Base64的字符串, token的第二段是令牌数据
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };
    var getPersoninfo = function (param) {
        return $http.get('/api/person/' + param);
    };
    var currentUser = function () {
        if (isLoggedIn()) {
            var token = getToken(),
                payload = JSON.parse($window.atob(token.split('.')[1]));
            return {
                _id: payload._id,
                email: payload.email,
                name: payload.name,
            };
        }
    };
    var resetUserInfo = function (userId, data) {
        return $http.put('/api/user/' + userId, data, {
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        });
    };
    return {
        saveToken: saveToken,
        getToken: getToken,
        register: register,
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser,
        getPersoninfo: getPersoninfo,
        resetUserInfo: resetUserInfo
    };
}



