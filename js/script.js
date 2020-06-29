$(document).ready(function() {

  $.ajax(
        {
          url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
          method: "GET",

          success: function(data) {
            var date = data.response;

            singleMonth();
          },

          error: function() {
            alert("Errore");
          }

        }
      );

});

// funzione che conta i giorni di un mese
function daysInMonth(month) {
  var count = moment().month(month).daysInMonth();

  var days = [];
  for (var i = 1; i < count+1; i++) {
    days.push(moment().month(month).date(i).format("D MMMM"));
  }

  return days;
}

function singleMonth() {

  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  var days = daysInMonth( moment(-24) );

  for (var i = 0; i < days.length; i++) {
    $('.day').text(days[i]);

    var context = {};
    var html = template(context);


    $('.container ul').append(html);
  }

}
