'use strict';
var app = angular.module('weatherApp', []);

app.controller('getForecastController', function ($scope, $http, $window) {
	$scope.submit = function () {
		if ($scope.city) {
			$http.get('http://api.apixu.com/v1/forecast.json?key=29d83fa2298a47d29bb121845161212&days=3&q=' + $scope.city)
				.then(function (response) {

						$('.search').css('display', 'none');
						$('.header').css('display', 'block');
						$('.btnToday').css('display', 'inline-block');
						$('.btnForecast').css('display', 'inline-block');

						var dateTime = new Date();
						var dayHour = dateTime.getHours();
						$scope.myWeather = response.data;
						$scope.cityName = ($scope.city).charAt(0).toUpperCase() + ($scope.city).substr(1).toLowerCase();
						$scope.today = dateTime;
						$scope.conditionDay = $scope.myWeather.forecast.forecastday[0].hour[dayHour].condition.text;
						$('.iconDay').attr('src', $scope.myWeather.forecast.forecastday[0].hour[dayHour].condition.icon);
						$scope.tempDay = $scope.myWeather.forecast.forecastday[0].hour[dayHour].temp_c;
						$scope.feels = $scope.myWeather.forecast.forecastday[0].hour[dayHour].feelslike_c;
						$scope.wind = $scope.myWeather.forecast.forecastday[0].hour[dayHour].wind_kph;
						$scope.humidity = $scope.myWeather.forecast.forecastday[0].hour[dayHour].humidity;

						$('.weatherNow').css('display', 'block');

						var minutes = (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes();
						var hours;
						var hour = dateTime.getHours();
						var day = 0;
						var days = (dateTime.getDate() < 10 ? '0' : '') + dateTime.getDate();
						var months = (dateTime.getMonth() < 10 ? '0' : '') + dateTime.getMonth();
						var counter = 0;
						var conditionHour;
						var iconHour;
						var tempHour;

						while (counter !== 48) {
							hours = (hour < 10 ? '0' : '') + hour;
							conditionHour = $scope.myWeather.forecast.forecastday[day].hour[hour].condition.text;
							iconHour = $scope.myWeather.forecast.forecastday[day].hour[hour].condition.icon;
							tempHour = $scope.myWeather.forecast.forecastday[day].hour[hour].temp_c;

							$('<div class="time">' + hours + ':' + minutes + '</div>').appendTo('.forecast');
							$('<div class="date">' + days + '/' + months + '</div>').appendTo('.forecast');
							$('<div class="conditionHour">' + conditionHour + '</div>').appendTo('.forecast');
							$('<img class="iconHour" src="' + iconHour + '" alt="Icon">').appendTo('.forecast');
							$('<div class="tempHour">' + tempHour + ' &#778;</div>').appendTo('.forecast');
							$('<hr>').appendTo('.forecast');

							hour += 1;
							counter += 1;
							if (hour === 24) {
								hour = 0;
								day += 1;
								days = ((+days + 1) < 10 ? '0' : '') + (+days + 1);
							}
						}

					},
					function (display) {
						alert('No such city found.');
						$scope.city = '';
					});
		}
	};
	$scope.btnToday = function () {
		$('.forecast').css('display', 'none');
		$('.weatherNow').css('display', 'block');
	};

	$scope.btnForecast = function () {
		$('.weatherNow').css('display', 'none');
		$('.forecast').css('display', 'block');
	};
});