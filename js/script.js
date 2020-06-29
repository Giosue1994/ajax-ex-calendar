$(document).ready(function() {


//   $.ajax(
//         {
//           url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
//           method: "GET",
//
//           success: function(data) {
//             var date = data.response;
//           },
//
//           error: function() {
//             alert("Errore");
//           }
//
//         }
//       );
//

var dateStart = moment('2018-01-01');
getdaysInMonth(dateStart);

});

// funzione che conta i giorni di un mese
function getdaysInMonth(day) {
  var monthName = day.format('MMMM YYYY');

  var source = $("#month-template").html();
  var template = Handlebars.compile(source);

  var context = {
    month: monthName,
  };

  var html = template(context);
  $('#current-month').append(html);

  var daysInMonth = day.daysInMonth();

  for (var i = 0; i < daysInMonth; i++) {
    var nextDay = moment(day).add(i, 'd');

    var dayMonth = nextDay.format('D MMMM');
    var completeDate = nextDay.format('YYYY-MM-DD');


    var source = $("#day-template").html();
    var template = Handlebars.compile(source);

    var context = {
      day: dayMonth,
      completeDate: completeDate
    };

    var html = template(context);
    $('.day-month').append(html);
  }


}
