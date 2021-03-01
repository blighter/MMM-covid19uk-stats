/* Magic Mirror
 * Module: UK COVID-19 UK Stats
 * By Matthew Pope
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require('request');


module.exports = NodeHelper.create({

  start: function () {
    console.log('MMM-covid19uk-stats helper started ...');
  },

  getCovidData: function(url) {
  		var self = this;
  		var retry = true;

      //url = "http://10.6.0.139:8069/test.json";

      request({url:url, gzip:true}, function(error, response, body) {
        console.log("Fetching data from " + url + "with results: ");
        if(!error && response.statusCode == 200) {
          console.log("COVID data downloaded");
          self.sendSocketNotification('COVID_DATA', {'data': JSON.parse(body), 'url': url});
        } else {
          console.error(self.name + ' ERROR:', error);
          console.error(self.name + ' statusCode:', response.statusCode);
          console.error(self.name + ' body:', body);
        }
      });
  	},

  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    console.log(this.name + " received a module notification: " + notification);
    if (notification === 'GET_COVIDINFO') {
      this.getCovidData(payload.url);
    }
  }

});
