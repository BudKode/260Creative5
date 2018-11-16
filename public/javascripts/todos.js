$(document).ready(function(){
  var today = new Date().getDay();
  var weekday = new Array(7);
  weekday[0] =  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  $("#zero_day").html(weekday[today]);
  $("#one_day").html(weekday[(today+1)%7]);
  $("#two_day").html(weekday[(today+2)%7]);
  $("#three_day").html(weekday[(today+3)%7]);
  $("#four_day").html(weekday[(today+4)%7]);
  //Initialize the schedule ----------------------------------------------------
  $.getJSON('schedule', function(data) {
      console.log(data);
      var zero_tasks = "<ul>";
      var one_tasks = "<ul>";
      var two_tasks = "<ul>";
      var three_tasks = "<ul>";
      var four_tasks = "<ul>";
      for(var task in data) {
        var t = data[task];
        var day = new Date(t.Date);
        console.log(day);
        switch(day.getDay()+1) {
          case today:
            zero_tasks += "<li>" + t.Task + "</li>";
            break;
          case (today+1)%7:
            one_tasks += "<li>" + t.Task + "</li>";
            break;
          case (today+2)%7:
            two_tasks += "<li>" + t.Task + "</li>";
            break;
          case (today+3)%7:
            three_tasks += "<li>" + t.Task + "</li>";
            break;
          case (today+4)%7:
            four_tasks += "<li>" + t.Task + "</li>";
            break;
          default:
            console.log(t);
        }
      }
      zero_tasks += "</ul>";
      one_tasks += "</ul>";
      two_tasks += "</ul>";
      three_tasks += "</ul>";
      four_tasks += "</ul>";
      $("#zero_comments").html(zero_tasks);
      $("#one_comments").html(one_tasks);
      $("#two_comments").html(two_tasks);
      $("#three_comments").html(three_tasks);
      $("#four_comments").html(four_tasks);
  });
  //----------------------------------------------------------------------------
  $("#postTask").click(function(){
      var myobj = {Task:$("#task").val(),Date:$("#duedate").val(), Complete:false};
      $("#goTaskForm")[0].reset();
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      var url = "task";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
            $("#done").html(textStatus);
        }
      })
  });
  $("#getTasks").click(function() {
    $.getJSON('task', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var task in data) {
        task = data[task];
        everything += "<li>" + task.Task + " due on: " + task.Date + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  });
  $("#completeTask").click(function(task){
      var myobj = {Task:$("#task").val(), Complete:true};
      $("#goTaskForm")[0].reset();
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      var url = "task";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
            $("#done").html(textStatus);
        }
      })
  });
//   $("#postComment").click(function(){
//       var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
//       jobj = JSON.stringify(myobj);
//       $("#json").text(jobj);
//       var url = "comment";
//       $.ajax({
//         url:url,
//         type: "POST",
//         data: jobj,
//         contentType: "application/json; charset=utf-8",
//         success: function(data,textStatus) {
//             $("#done").html(textStatus);
//         }
//       })
//   });
//   $("#getComments").click(function() {
//     $.getJSON('comment', function(data) {
//       console.log(data);
//       var everything = "<ul>";
//       for(var comment in data) {
//         com = data[comment];
//         everything += "<li>" + com.Name + " says: " + com.Comment + "</li>";
//       }
//       everything += "</ul>";
//       $("#comments").html(everything);
//     })
//   });
//   $("#deleteComments").click(function() {
//     var url = "delete";
//     console.log("handler");
//       $.ajax({
//         url:url,
//         type: "POST",
//         success: function(data,textStatus) {
//             $("#done").html(textStatus);
//         }
//       })
//   });
//   $("#getUserComments").click(function(){
//       var myobj = {Name:$("#searchname").val()};
//       console.log(myobj);
//       jobj = JSON.stringify(myobj);
//       console.log(jobj);
//       $("#json").text(jobj);
//       var url = "user";
//       $.ajax({
//         url:url,
//         type: "POST",
//         data: jobj,
//         contentType: "application/json; charset=utf-8",
//         success: function(data,textStatus) {
//           $("#done").html(textStatus);
//           console.log(data);
//           var everything = "<ul>";
//           for(var comment in data) {
//             com = data[comment];
//             everything += "<li>" + com.Name + " says: " + com.Comment + "</li>";
//           }
//           everything += "</ul>";
//           $("#comments").html(everything);
//         }
//       })
//   });
});