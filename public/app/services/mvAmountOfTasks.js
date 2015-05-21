angular.module('Organizer').factory('CountTasks', function(mvFilter) {
    return {
        allTasksCount: function (tasks, catState) {
            var allTasks = [];
            for (var i = 0; i < tasks.length; i++) {
                if (catState === null) {
                    allTasks = tasks;
                    continue;
                }
                if ((tasks[i].status === 'progress') && (catState === tasks[i].category)) {
                    allTasks.push(tasks[i]);
                    continue;
                }
            }
            return allTasks.length;
        },

        todayTasksCount: function (tasks, catState) {
            var todayTasks = [];
            for (i = 0; i < tasks.length; i++) {
                var timestamp = new Date(tasks[i].date).getTime();
                if (( mvFilter.ranges.today.from <= timestamp) && (timestamp <= mvFilter.ranges.today.to)
                    && (tasks[i].status === 'progress') && (catState === null )) {
                    todayTasks.push(tasks[i]);
                    continue;
                }
                if ((tasks[i].status === 'progress') && (catState === tasks[i].category)) {
                    if (( mvFilter.ranges.today.from <= timestamp) && (timestamp <= mvFilter.ranges.today.to)) {
                        todayTasks.push(tasks[i]);
                        continue;
                    }
                    if (( mvFilter.ranges.today.from <= timestamp) && (timestamp <= mvFilter.ranges.today.to)) {
                        todayTasks.push(tasks[i]);
                        continue;
                    }
                }

            }
            return todayTasks.length;

        },

        weekTasksCount: function(tasks, catState) {
            var weekTasks = [];
            for (i = 0; i < tasks.length; i++) {
                var timestamp = new Date(tasks[i].date).getTime();
                if ((mvFilter.ranges.week.from <= timestamp) && (timestamp <= mvFilter.ranges.week.to)
                    && (tasks[i].status === 'progress') && (catState === null)) {
                    weekTasks.push(tasks[i]);
                    continue;
                }
                if ((tasks[i].status === 'progress') && (catState === tasks[i].category)) {
                    if ((mvFilter.ranges.week.from <= timestamp) && (timestamp <= mvFilter.ranges.week.to)) {
                        weekTasks.push(tasks[i]);
                        continue;
                    }
                    if ((mvFilter.ranges.week.from <= timestamp) && (timestamp <= mvFilter.ranges.week.to)) {
                        weekTasks.push(tasks[i]);
                        continue;
                    }
                }
            }
            return weekTasks.length;
        },

        workTasksCount: function(tasks) {
            var workTasks = [];
            for (i = 0; i < tasks.length; i++) {
                if ((tasks[i].category === 'work') && (tasks[i].status === 'progress')) {
                    workTasks.push(tasks[i]);
                }
            }
            return workTasks.length;
        },

        homeTasksCount: function(tasks) {
            var homeTasks = [];
            for (i = 0; i < tasks.length; i++) {
                if ((tasks[i].category === 'home') && (tasks[i].status === 'progress')) {
                    homeTasks.push(tasks[i]);
                }
            }
            return homeTasks.length;
        }
    }

});
