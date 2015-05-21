angular.module('Organizer').factory('mvUsers', function($resource) {
    return $resource('/user/:id', {id: '@id'}, {update: {method: 'PUT'}});
});
