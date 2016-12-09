(function automaticLogoutJs(){
  setTimeout(function () {
    $.ajax({
      url: '/status_automatic_logout',
      success: function(data) {
        if (data.timeout != "null" && data.live == true){
          var response_timeout = (new Date(data.timeout).getTime());

          setInterval(function(){
            var now_time = (new Date().getTime());

            if ((response_timeout < now_time) == true){
              if (confirm(data.message)){
                window.location.href = '/destroy_automatic_logout';
              }
            }
          }, data.seconds * 1000) // utiliza o mesmo valor em seconds que a pessoa irá ficar logado
        }
      }
    });
  }, 1000); //1s
}());
