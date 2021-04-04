import { Component, ViewChild } from '@angular/core'

import { WeatherService } from './weather.service'
import moment from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WeatherService]
})
export class AppComponent {
  @ViewChild('searchInput') searchElement

  location: string
  lastLocation: any

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

    this.currentUnits = units

    this.weatherService.getLocation(loc).subscribe(loc => {

      let lat = loc.results[0].geometry.location.lat,
          lon = loc.results[0].geometry.location.lng
      this.lastLocation = loc
      this.location = loc.results[0].address_components[0].long_name

      this.weatherService.getWeather(lat, lon, units).subscribe(weather => {

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

        this.searchElement.nativeElement.blur()
      })
    })
  }
  
  getLocationPretty() {
    return this.lastLocation.results[0].address_components[0].long_name
  }

  getLocation() {
    return this.lastLocation.results[0].formatted_address
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
      this.location = this.getLocationPretty()
    }, 100)
  }

  searchFocus() {
    this.searchElement.nativeElement.focus()
    this.searchIsActive = true
  }

  searchBlur() {
    this.searchIsActive = false
  }

  adjustTimeZone(time: number, format: string) {
    return moment(time*1000).tz(this.timezone).format(format)
  }

  changeUnit(loc: string) {
    this.getWeather(this.getLocation(), loc)
  }
}
