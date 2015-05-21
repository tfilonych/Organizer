angular.module('Organizer').controller('loginCtrl', function($scope, mvIdentity, mvNotifier, mvAuth, $location, $rootScope) {
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password) {
        mvAuth.authenticateUser(username, password).then(function(success) {
            if(success) {
                mvNotifier.notify('You have successfully signed in!');
                $location.path('/');
            } else {
                mvNotifier.notify('Username/Password combination incorrect');
            }
        });
    };
    $scope.signout = function() {
        mvAuth.logoutUser().then(function() {
            $rootScope.$broadcast('user_logged_out');
            mvNotifier.notify('You have successfully sign out!');
        });
    };

});

