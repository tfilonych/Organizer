angular.module('Organizer').factory('mvSubTasks', function($resource) {
    return $resource('/subtasks/:id', {id: '@id'}, {update: {method: 'PUT'}});
});
