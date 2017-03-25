angular
    .module('readApp')
    .filter('formatDate', formatDate);

function formatDate() {
    return function (dateStr) {
        var date = new Date(dateStr),
            d = date.getDate(),
            monthNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            m = monthNames[date.getMonth()],
            y = date.getFullYear(),
            output = y + '/' + m + '/' + d;
        return output;
    };
};
