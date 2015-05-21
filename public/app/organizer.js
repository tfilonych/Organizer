angular.module('Organizer', ['ngRoute','ui.bootstrap','ngResource', 'ui.utils']);
angular.module('Organizer').config(function($routeProvider, $locationProvider){
  $locationProvider.html5Mode({enabled: true, requireBase: false});
  $routeProvider
    .when('/', {templateUrl: '/partials/main', controller: 'tasksCtrl'})
    .when('/profile', {templateUrl: '/partials/profile', controller: 'profileCtrl'})
    .when('/login', {templateUrl: '/partials/login', controller: 'loginCtrl'})
    .when('/signup', {templateUrl: '/partials/signUp', controller: 'signUpCtrl'});
})

.run(function ($rootScope, mvIdentity, $http) {
    $http.get('/user')
        .success(function (data) {
            mvIdentity.currentUser = data;
        })
        .error(function (data) {
        });

});
