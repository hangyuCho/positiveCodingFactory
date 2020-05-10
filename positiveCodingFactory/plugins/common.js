import Vue from 'vue'

Vue.prototype.$execAxios = function(vue, method, url, param, callback) {
    var self     = vue;
    var ax       = function(){};
    var method   = method   || "";
    var url      = url      || "";
    var param    = param    || {};
    var callback = callback || function(){};
    var config = {
        headers: {
            "X-CSRFToken": this.csrfToken,
            "Content-Type": 'application/x-www-form-urlencoded',
        }
    }
    method = method.toLocaleLowerCase();
         if (method === "get")    ax = self.$axios.get   (url, param, config)
    else if (method === "post")   ax = self.$axios.post  (url, param, config)
    else if (method === "put")    ax = self.$axios.put   (url, param, config)
    else if (method === "delete") ax = self.$axios.delete(url, param, config)
    ax
      .then (function(res, param){ 
        callback(res)
        self.message   = "처리 성공!"
        self.alertType = "success"
        self.alert     = true
      })
      .catch(function(err){
        //console.error(err)
        self.message   = "에러 발생!<br>" + err.message
        self.alertType = "error"
        self.alert     = true
      })
  }