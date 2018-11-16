angular.module('task', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    var today = new Date().getDay();
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    $scope.zero_day = weekday[today];
    $scope.one_day = weekday[(today+1)%7];
    $scope.two_day = weekday[(today+2)%7];
    $scope.three_day = weekday[(today+3)%7];
    $scope.four_day = weekday[(today+4)%7];
    $scope.tasks = [];
    $scope.overdue_tasks = [];
    $scope.zero_tasks = [];
    $scope.one_tasks = [];
    $scope.two_tasks = [];
    $scope.three_tasks = [];
    $scope.four_tasks = [];
    $scope.addTask = function() {
      var newtask = {Task:$scope.formContent,Date:$scope.formDate,Complete:false};
      console.log(newtask);
      $scope.formContent='';
      $scope.formDate='';
      $http.post('/task', newtask).success(function(data){
        $scope.tasks.push(data);
      });
      $scope.getAll();
    };
    $scope.toggle = function(task) {
      console.log(task);
      return $http.put('/tasks/' + task._id + '/toggle')
        .success(function(data){
          console.log("toggle worked");
          task.Complete = data.Complete;
        });
    };
	  $scope.toggleComplete = function(task) {
	    console.log(task);
  	  $scope.toggle(task);
    };
    $scope.getAll = function() {
      return $http.get('/schedule').success(function(data){
        $scope.tasks = [];
        $scope.overdue_tasks = [];
        $scope.zero_tasks = [];
        $scope.one_tasks = [];
        $scope.two_tasks = [];
        $scope.three_tasks = [];
        $scope.four_tasks = [];
        console.log(data);
        for(var task in data) {
          var t = data[task];
          var day = new Date(t.Date);
          switch((day.getDay()+1)%7) {
            case (today+6)%7:
              $scope.overdue_tasks.push(t);
              break;
            case today:
              $scope.zero_tasks.push(t);
              break;
            case (today+1)%7:
              $scope.one_tasks.push(t);
              break;
            case (today+2)%7:
              $scope.two_tasks.push(t);
              break;
            case (today+3)%7:
              console.log(t);
              $scope.three_tasks.push(t);
              break;
            case (today+4)%7:
              $scope.four_tasks.push(t);
              break;
            default:
              console.log(t);
          } 
        } 
        console.log($scope.three_tasks);
      });
    };
    $scope.getAll();
    $scope.delete = function(task) {
      console.log(task);
      $http.delete('/tasks/' + task._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };
  }
]);