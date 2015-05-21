angular.module('Organizer').controller('tasksCtrl', function($scope, mvIdentity, mvTasks, mvSubTasks,  $rootScope, mvFilter, CountTasks) {
    $scope.addedTask = false;
    $scope.today = new Date();
    $scope.dt = new Date();
    $scope.tasks = mvTasks.query();
    $scope.workTask = false;
    $scope.homeTask = false;
    $scope.newCategory = {name:"Category"};
    $scope.taskStatus = 'progress';
    $scope.delTask = false;
    taskEditable = false;
    $scope.filter = mvFilter.filter.bind(mvFilter);
    $scope.categories = [{name: 'Home', icon: 'home'}, {name: 'Work', icon: 'briefcase'}];
    $scope.states = {};
    $scope.states.activeDateRange = 'all';
    $scope.states.category = null;
    $scope.todayTasks = CountTasks.todayTasksCount;
    $scope.weekTasks = CountTasks.weekTasksCount;
    $scope.allTasks = CountTasks.allTasksCount;
    $scope.workTasks = CountTasks.workTasksCount;
    $scope.homeTasks = CountTasks.homeTasksCount;

    $scope.$on('user_logged_out', function () {
        $scope.tasks = [];
        $scope.addedTask = false;
    });

    $scope.changeMode = function(category){
        $scope.newCategory = category;
    };

    $scope.setCategory = function(cat) {
        if($scope.states.category === cat) {
            $scope.states.category = null;
            mvFilter.category = undefined;
        }else {
            $scope.states.category = cat;
            mvFilter.setCategory(cat);
        }
    };

    $scope.setDateRange= function(item) {
        $scope.taskStatus = 'progress';
        $scope.delTask = false;
        $scope.states.activeDateRange = item;
        mvFilter.setDateRange(item);
    };

    $scope.addTask = function() {
        var category = $scope.newCategory.name.toLowerCase();
        mvTasks.save({taskName:$scope.taskName, category: category, date:$scope.dt}, function(task) {
            $scope.tasks.push(task);
            $scope.taskName = "";
        })
    };

    $scope.editTask = function(task) {
        task.taskEditable = true;
    };

    $scope.saveEditTask = function(task) {
        mvTasks.update({task: task}, function(success) {
            task.taskEditable = false;
        });
    };

    $scope.deleteTask = function(task) {
        mvTasks.delete({id: task._id}, function(success) {
            $scope.tasks = mvTasks.query();
        });
    };

    $scope.showSubTasks = function(task) {
        $scope.currentTask = task;
        $scope.addedTask = true;
        $scope.subtasks = mvSubTasks.query({id: $scope.currentTask._id})
    };

    $scope.addsubtask = function (currentTask) {
       mvSubTasks.save({task_id: currentTask._id, text: $scope.subtask}, function(subtask) {
           $scope.subtasks.push(subtask);
           $scope.subtask = "";
       });
    };

    $scope.deleteSubtask = function (index, task, subtask) {
        mvSubTasks.delete({id: subtask._id}, function(data) {
            $scope.subtasks = mvSubTasks.query({id: task._id});
        })
    };

    $scope.markCompleted = function(task) {
       var newStatus = "";
        if(task.status == 'progress') {
            newStatus = "completed";
        } if(task.status == 'completed') {
            newStatus = "trash";
        }
        task.status = newStatus;
        mvTasks.update({task: task}, function(data) {
        });
    };

    $scope.showTrash = function(item) {
        $scope.taskStatus = 'trash';
        $scope.delTask = true;
        mvFilter.setDateRange(item);
    };

    $scope.showComleted = function(item) {
        $scope.taskStatus = 'completed';
        $scope.delTask = false;
        mvFilter.setDateRange(item);
    };

    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.clear = function () {
        $scope.dt = null;
    };

});

