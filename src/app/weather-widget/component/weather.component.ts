import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../service/weather.service';

import { Weather } from '../model/weather';

import { WEATHER_COLORS } from '../constants/constants';

declare var Skycons: any;

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})

export class WeatherComponent implements OnInit {
    pos: Position;
    weatherData = new Weather(null, null, null, null, null);
    currentLocation = "";
    currentSpeedUnit = 'kph';
    currentTempUnit = 'c';
    icons = new Skycons({"color": "#ffd622"});
    dataReceived = false;

    constructor (private service: WeatherService) { }

    ngOnInit() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        this.service.getCurrentLocation()
        .subscribe(position => {
            this.pos = position;
            this.getCurrentWeather();
            this.getLocationName();
        });
    }

    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
        .subscribe(weather => {
            this.weatherData.temp = weather["currently"]["temperature"],
            this.weatherData.wind = weather["currently"]["windSpeed"],
            this.weatherData.humidity = weather["currently"]["humidity"],
            this.weatherData.summary = weather["currently"]["summary"],
            this.weatherData.icon = weather["currently"]["icon"],
            this.setIcon();
            this.dataReceived = true;
        },
        err => console.error(err));
    }

    getLocationName(){
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
        .subscribe(location => {
            this.currentLocation = location["results"][3]["formatted_address"];
        });
    }

    toggleUnits(){
        this.currentSpeedUnit === 'kph' ? this.currentSpeedUnit = 'mph' : this.currentSpeedUnit = 'kph';
        this.currentTempUnit === 'c' ? this.currentTempUnit = 'f' : this.currentTempUnit = 'c';
    }

    setIcon(){
        this.icons.add("icon",this.weatherData.icon);
        this.icons.play();
    }

    setStyles() {
        if(this.weatherData.icon) {
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]['color'];
            return WEATHER_COLORS[this.weatherData.icon]
        } else {
            this.icons.color = WEATHER_COLORS["default"]['color'];
            return WEATHER_COLORS["default"];
        }
    }
}

