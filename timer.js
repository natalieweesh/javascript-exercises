var timing = function() {
  setInterval(function(){
    var d = new Date();
    console.log(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
  },5000)
};

timing();