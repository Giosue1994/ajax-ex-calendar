$(document).ready(function() {

  // variabile data inizio gennaio 2018
  var dateStart = moment('2018-01-01');
  // richiamo le funzioni
  getdaysInMonth(dateStart);
  holidays(dateStart);

  // al click di next mostro il mese successivo
  $('#next').click(function() {
    // creo il momento del mese corrente
    var currentMonth = $('#current-month').attr('data-current-month');
    var momentCurrentMonth = moment(currentMonth);

    // aggiungo uno al mese corrente
    var nextMonth = momentCurrentMonth.add(1, 'month');

    // se il mese successivo è uguale all'anno 2018 mostro il mese
    // con i giorni festivi
    if (nextMonth.year() === 2018) {
      getdaysInMonth(nextMonth);
      holidays(nextMonth);
    }
    // altrimenti mostro un alert
    else {
      alert('Calendario solo del 2018');
    }
  });

  // al click di prev mostro il mese precedente
  $('#prev').click(function() {
    // creo il momento del mese corrente
    var currentMonth = $('#current-month').attr('data-current-month');
    var momentCurrentMonth = moment(currentMonth);

    // tolgo uno al mese corrente
    var prevMonth = momentCurrentMonth.subtract(1, 'month');

    // se il mese precedente è uguale all'anno 2018 mostro il mese
    // con i giorni festivi
    if (prevMonth.year() === 2018) {
      getdaysInMonth(prevMonth);
      holidays(prevMonth);
    }
    // altrimenti mostro un alert
    else {
      alert('Calendario solo del 2018');
    }
  });

});

// funzione che mostra il mese corrente e conta i giorni di un mese
function getdaysInMonth(day) {
  // azzero i giorni del mese
  $('.day-month').html('');

  // formato del mese da stampare
  var monthName = day.format('MMMM YYYY');

  var source = $("#month-template").html();
  var template = Handlebars.compile(source);

  var context = {
    month: monthName,
  };

  var html = template(context);
  $('#current-month').html(html);

  // aggiungo un attributo per indicare la data corrente
  $('#current-month').attr('data-current-month', day.format('YYYY-MM-DD'));

  // conto i giorni in un mese
  var daysInMonth = day.daysInMonth();

  // ciclo i giorni del mese aumentando di uno
  for (var i = 0; i < daysInMonth; i++) {
    var nextDay = moment(day).add(i, 'd');

    //  imposto il formato della data
    var dayMonth = nextDay.format('D dddd');
    var completeDate = nextDay.format('YYYY-MM-DD');


    var source = $("#day-template").html();
    var template = Handlebars.compile(source);

    var context = {
      day: dayMonth,
      completeDate: completeDate
    };

    var html = template(context);

    // stampo i giorni
    $('.day-month').append(html);
  }

}

// funzione che segna i giorni festivi
function holidays(dateStart) {

  $.ajax(
        {
          url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
          method: "GET",
          data: {
            year: dateStart.year(),
            month: dateStart.month()
          },

          success: function(data) {
            var holidays = data.response;

            for (var i = 0; i < holidays.length; i++) {
              var currentHoliday = holidays[i];

              // assegno all'attributo la data che contiene la festività
              var thisDayAttr = $('.day[data-date="' + currentHoliday.date + '"]');

              // aggiungo la classe per colorare i giorni festivi in rosso
              thisDayAttr.addClass('holiday');
              // Appendo il nome della festività
              thisDayAttr.append(' - ' + currentHoliday.name);
            }
          },

          error: function() {
            alert("Errore");
          }

        }
      );

}
