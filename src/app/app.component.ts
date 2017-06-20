import { Component } from '@angular/core'

import { WeatherService } from './weather.service'
import * as moment from 'moment-timezone'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService]
})
export class AppComponent {
  location: string
  lastLocation: string

  offset: number
  timezone: string
  currentTime: number
  currentTemperature: number
  currentSummary: string
  feelslike: number
  hourly: Object[]
  daily: Object[]
  currentUnits: string

  currentBg: string
  searchIsActive: boolean

  constructor(private weatherService: WeatherService) {
    this.location = 'Amherst, NY'
    this.searchIsActive = false;
    this.currentUnits = 'us'
    this.getWeather(this.location, this.currentUnits)
  }

  getWeather(loc: string, units: string) {
    console.log('called')
    this.currentUnits = units
    this.lastLocation = this.location
    this.weatherService.getLocation(loc).subscribe(loc => {
      console.log(loc)
      let lat = loc.results[0].geometry.location.lat,
          lon = loc.results[0].geometry.location.lng
      this.weatherService.getWeather(lat, lon, units).subscribe(weather => {
        console.log(weather)
        this.offset = weather.offset
        this.timezone = weather.timezone
        this.currentTime = weather.currently.time
        this.currentTemperature = weather.currently.temperature
        this.currentSummary = weather.currently.summary
        this.feelslike = weather.currently.apparentTemperature
        this.currentBg = weather.currently.icon
        this.hourly = weather.hourly.data
        this.daily = weather.daily.data
        this.currentUnits = weather.flags.units
      })
    })

    console.log(this.currentUnits)
  }

  getCurrentBg() {
    let style: string
    if (this.currentBg) {
      style = `url(./assets/img/background/${this.currentBg}.jpg)`
    } else {
      style = ''
    }
    return style
  }

  adjustTextField() {
    let style: string
    style = `${(this.location.length + 1) * 23}px`
    return style
  }

  remember() {
    setTimeout(() => {
      this.location = this.lastLocation
    }, 100)
  }

  searchActive() {
    this.searchIsActive = !this.searchIsActive
  }

  adjustTimeZone(time: number, format: string) {
    return moment(time*1000).tz(this.timezone).format(format)
  }
}
