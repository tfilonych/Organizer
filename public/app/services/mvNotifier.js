angular.module('Organizer').value('mvToastr', toastr);

angular.module('Organizer').factory('mvNotifier', function(mvToastr) {
    return {
        notify: function(msg) {
            mvToastr.success(msg);
        },
        error: function(msg) {
            mvToastr.error(msg);
        }
    };
});
