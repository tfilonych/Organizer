angular.module('Organizer').factory('mvFilter', function($timeout) {
    var Filter = function() {
        this.category = undefined;
        this.ranges = {
            all: {from: 0, to: Number.MAX_VALUE},
            today: this.getCurrentDayRange(),
            week:  this.getCurrentWeekRange()
        };
        this.currentDateRange = this.ranges.all;
    };

    Filter.prototype.filter = function(task) {
        var timestamp = new Date(task.date).getTime();
        if(this.category == undefined) {
            return this.currentDateRange.from <= timestamp
                && timestamp <= this.currentDateRange.to
        }else {
            return (this.currentDateRange.from <= timestamp
                && timestamp <= this.currentDateRange.to) && (task.category == this.category);
        }
    };

    Filter.prototype.setDateRange = function(item) {
        this.currentDateRange = this.ranges[item];
    };

    Filter.prototype.setCategory = function(cat) {
        this.category = cat;
    };

    Filter.prototype.getCurrentDayRange = function() {
        return {
            from: new Date().setHours(0, 0, 0, 0),
            to: new Date().setHours(23, 59, 59, 999)
        };
    };

    Filter.prototype.getCurrentWeekRange = function() {
        var today = new Date();
        var dayOfMonth = today.getDate();
        return {
            from: today.setDate(dayOfMonth + 1),
            to: today.setDate(dayOfMonth + 6)
        };
    };
return new Filter();

});
