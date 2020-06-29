$(document).ready(function() {

  $.ajax(
        {
          url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
          method: "GET",

          success: function(data) {
            var date = data.response;

            var days = daysInMonth( moment(-24) );
            console.log(days);

          },

          error: function() {
            alert("Errore");
          }

        }
      );

});

// funzione che conta i giorni in un mese
function daysInMonth(month) {
  var count = moment().month(month).daysInMonth();

  var days = [];
  for (var i = 1; i < count+1; i++) {
    days.push(moment().month(month).date(i));
  }

  return days;
}

// function singleMonth() {
//
//   var source = $("#entry-template").html();
//   var template = Handlebars.compile(source);
//
//   var context = {};
//   var html = template(context);
//
//   $('.container').append(html);
// }
