angular.module('Organizer').factory('mvTasks', function($resource) {
   return $resource('/tasks/:id', {id: '@id'}, {update: {method: 'PUT'}});
});
