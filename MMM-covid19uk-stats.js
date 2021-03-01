//mmm-covid19uk-stats.js:

Module.register("MMM-covid19uk-stats", {
	// Default module config.
	defaults: {
        apiURL: "https://api.coronavirus.data.gov.uk/v1/data",
		region: "england", // can use england, wales, northern ireland, or scotland
		updateInterval: 5 * 60 * 1000, // Update every 5 minutes.
		initialLoadDelay: 0
 	},
	processData: function(data) {
		this.covid = {};
		this.covid.cases = null;
		this.covid.date = null;
        
		Log.log(data.data[0].date + " : " + data.data[0].newCases);
		
		this.covid = data.data;

        this.loaded = true;
        this.updateDom();
	},

	fetchCovidInfo: function() {
        if (!this.hidden) {
			Log.log("Fetching covid info from " + this.url);
            this.sendSocketNotification("GET_COVIDINFO", { 'url': this.url } );
        }
    },
    start: function() {
		this.url = this.config.apiURL + "?filters=areaType=nation;areaName=" + this.config.region + "&" + 'structure=%7B"date":"date","newCases":"newPeopleVaccinatedFirstDoseByPublishDate"%7D';
		this.updateTimer = setTimeout(() => {
            this.fetchCovidInfo();

            this.updateTimer = setInterval(() => {
                this.fetchCovidInfo();
            }, this.config.updateInterval);

        }, this.config.initialLoadDelay);
	},
	getDom: function () {
        var wrapper = document.createElement("div");
		
        if (!this.loaded) {
			Log.log("Not yet loaded...");
            wrapper.innerHTML = "Loading cases ...";
            return wrapper;
		}

		Log.log("COVID-19 UK Stats launched");

		var table = document.createElement("table");
		table.className = "small";
		var loop = 0;
		var total = 0;
		for (var t in this.covid) {
			if (loop === 5) { break; }
			loop = loop + 1;
			var covidstat = this.covid[t];
			var row = document.createElement("tr");
			table.appendChild(row);
			
			Log.log("Logging " + covidstat.newCases + " cases for date " + covidstat.date);
			
			var covidDateCell = document.createElement("td");
			covidDateCell.innerHTML = covidstat.date;
			covidDateCell.className = "bright";
			row.appendChild(covidDateCell);
			
			var covidNumberCell = document.createElement("td");
			covidNumberCell.innerHTML = covidstat.newCases;
			total = total + covidstat.newCases;
			row.appendChild(covidNumberCell);
		}
		
		var row = document.createElement("tr");
		table.appendChild(row);
		var covidTotalTitleCell = document.createElement("td");
		covidTotalTitleCell.innerHTML = "Total:";
		row.appendChild(covidTotalTitleCell);

		var covidTotalCell = document.createElement("td");
		covidTotalCell.innerHTML = total;
		row.appendChild(covidTotalCell);

		wrapper.appendChild(table);
		
		return wrapper;
	},
	getHeader: function () {
		return "COVID-19 UK New Vaccines Per Day";
	},
    socketNotificationReceived: function(notification, payload) {
		Log.log("New COVID data!! " + notification + " " + payload.url + " " + this.url);
        if (notification === 'COVID_DATA') {
			Log.log("Processing Covid Data...");
            this.processData(payload.data);
        }
    }
});
