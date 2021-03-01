# Magic Mirror UK COVID-19 Vaccination Stats Module
This module is a <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a> add-on.
This module displays a table of the 5 latest statistics for COVID-19 New Vaccinations as published by the UK Government.

## ℹ️ How to use this module
1. cd to your MagicMirror modules directory
1. clone this repo with the following command: `git clone https://github.com/blighter/MMM-covid19uk-stats.git`
1. install all the npm modules with `npm install`
1. update your [Magic Mirror Config](https://github.com/MichMich/MagicMirror/blob/master/config/config.js.sample), by adding the following object:
To use this module, add it to the modules array in the `config/config.js` file:

````javascript
modules: [
	{
		module: "MMM-covid19uk-stats",
		position: "top_right",
		config: {
			apiURL: "https://api.coronavirus.data.gov.uk/v1/data"
		}
	}
]
````


## 🛠️ Config
* No configuration needed!

## ✨ Contributing
For bugs and feature requests, [please create an issue](https://github.com/elaniobro/mmm-stocks/issues)

## 👨🏻 Author
**Matthew Pope**
* [github](https://github.com/blighter)
* [twitter](https://www.twitter.com/blighternet)

## ⚖️ License
This project is licensed under the MIT License - see the LICENSE.md file for details

## 🙏🏽 Acknowledgments
* [Elaniobro](https://github.com/Elaniobro) for the readme template
