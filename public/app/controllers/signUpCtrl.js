angular.module('Organizer').controller('signUpCtrl', function($scope, mvUsers, mvIdentity, $location) {
    $scope.signup = function() {
        var newUserData = {
            username: $scope.username,
            password: $scope.password,
            firstName: $scope.firstName,
            lastName: $scope.lastName
        };
        mvUsers.save('/user', newUserData).success(function(data) {
            mvIdentity.currentUser = data;
        })
    };

    $scope.cancel = function() {
        $location.path('/');
    };

});