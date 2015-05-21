angular.module('Organizer').factory('mvIdentity', function() {
    var currentUser;

    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        }
    };
});

