angular.module('Organizer').controller('profileCtrl', function($scope, $http, mvIdentity) {
    $scope.user = mvIdentity.currentUser;
});
