angular
    .module('readApp')
    .filter('formatDate', formatDate);

function formatDate() {
    return function (dateStr) {
        var date = new Date(dateStr),
            d = date.getDate(),
            m = date.getMonth() + 1,
            y = date.getFullYear(),
            output = y + '/' + m + '/' + d;
        return output;
    };
};
