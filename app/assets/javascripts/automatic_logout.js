/**
 * Module AutomaticLogout for JS Files
 * @type {[type]}
 */
var AutomaticLogout = AutomaticLogout || {};

$(document).ready(function(){
  var $regressiveTimer = $('.regressive-timer');

  ($regressiveTimer.length > 0 &&
   $regressiveTimer.data('expires-at') !== '')
    ? AutomaticLogout.regressiveTimer()
    : AutomaticLogout.ajaxSessionTimeout();
});

/**
 * Send request for destroy session current_user
 * @return {[type]} [description]
 */
AutomaticLogout.destroySession = function(){
  return window.location.href = '/destroy_automatic_logout';
}

/**
 * Method regressive time based in session auto expired at.
 * @param  {[type]} date_session [description]
 * @return {[type]}              [description]
 */
AutomaticLogout.regressiveTimer = function(){;
  /**
   * Variables used
   * @param  {[type]} '.regressive-timer' [description]
   * @return {[type]}                     [description]
   */
  var data_timer = $('.regressive-timer').data('expires-at'),
      data_message = $('.regressive-timer').data('message'),
      data_seconds = $('.regressive-timer').data('seconds'),
      current_time = new Date().getTime();

  var time_expired = new Date();
  time_expired.setSeconds(time_expired.getSeconds() + data_seconds);

  var timerDecrement = setInterval(function(){
    
    if (data_seconds == 0) { 
      clearInterval(timerDecrement); 

      // limpa a sessão após o ok
      alertify.alert(data_message, function () {
        AutomaticLogout.destroySession();
      });
    }else{
      //tempo descrecente
      time_expired.setSeconds(time_expired.getSeconds() - 1);
      
      var 
        // converte pra segundos
        seconds_integer = (time_expired.getTime() - current_time) / 1000,
        //faz o parse 
        date_format = AutomaticLogout.parseDate(seconds_integer);

      // atualiza o DOM
      $('.regressive-timer').text(date_format.hours + ':' + date_format.minutes + ':' + date_format.seconds);
    }
    
    data_seconds -= 1;
  }, 1000)
}

/**
 * Parse Date
 * @param  float seconds seconds_float [description]
 * @return {
 *   days: days,
 *   hours: hours,
 *   minutes: minutes,
 *   seconds: seconds
 * }
 */
AutomaticLogout.parseDate = function(seconds_float){

  var days,
      hours,
      minutes,
      seconds;

  days = parseInt(seconds_float / 86400);
  seconds_float = seconds_float % 86400;

  hours = parseInt(seconds_float / 3600);
  seconds_float = seconds_float % 3600;

  minutes = parseInt(seconds_float / 60);
  seconds = parseInt(seconds_float % 60);

  if(hours < 10){
    hours = "0"+hours;
    hours = hours.substr(0, 2);
  }

  if(minutes < 10){
    minutes = "0"+minutes;
    minutes = minutes.substr(0, 2);
  }

  if(seconds <=9){
    seconds = "0"+seconds;
  }

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

/**
 * Method for request ajax, check value e logout
 * @return {[type]} [description]
 */
AutomaticLogout.ajaxSessionTimeout = function(){
  setTimeout(function () {
    $.ajax({
      url: '/status_automatic_logout',
      success: function(data) {
        if (data.timeout !== "null" && data.live === true){
          var response_timeout = (new Date(data.timeout).getTime());

          setInterval(function(){
            var now_time = (new Date().getTime());

            if ((response_timeout < now_time) === true){
              alertify.alert(data_message, function () {
                window.location.href = '/destroy_automatic_logout';
              });
            }
          }, (data.seconds / 2) * 1000) // utiliza o mesmo valor em seconds que a pessoa irá ficar logado
        }
      }
    });
  }, 1000); //1s
};
