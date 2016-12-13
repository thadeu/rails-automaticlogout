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
 * Method regressive time based in session auto expired at
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
      now_in_seconds = new Date().getTime() / 1000,
      timeout_in_seconds = new Date(data_timer).getTime() / 1000,
      diff_in_seconds = new Number(),
      target_date = new Date(data_timer).getTime(),
      current_date = new Date().getTime();

  /**
   * diff in seconds with 0 decimals
   * @param  {[type]} timeout_in_seconds -             now_in_seconds [description]
   * @return {[type]}                    [description]
   */
  diff_in_seconds = (timeout_in_seconds - now_in_seconds).toFixed(0);

  if (diff_in_seconds <= 0){
    if (confirm(data_message)){
      AutomaticLogout.destroySession();
    }
  }else{
    var seconds_float = (target_date - current_date) / 1000,
        date_format = AutomaticLogout.parseDate(seconds_float);

    if (diff_in_seconds >= 0){
      $('.regressive-timer').text(date_format.hours + ':' + date_format.minutes + ':' + date_format.seconds);
    }

    setTimeout('AutomaticLogout.regressiveTimer()',1000);

    diff_in_seconds--;
  }
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
              if (confirm(data.message)){
                window.location.href = '/destroy_automatic_logout';
              }
            }
          }, (data.seconds / 2) * 1000) // utiliza o mesmo valor em seconds que a pessoa irá ficar logado
        }
      }
    });
  }, 1000); //1s
};
