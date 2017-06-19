import { Component } from '@angular/core'

import { WeatherService } from './weather.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService]
})
export class AppComponent {
  title: string
  location: string
  temperature: number
  feelslike: number

  constructor(private weatherService: WeatherService) {
    this.title = 'The Weather App'
    this.location = 'Amherst, NY'

    this.getWeather(this.location)
  }

  getWeather(loc: string) {
    this.weatherService.getLocation(loc).subscribe(loc => {
      console.log(loc)
      let lat = loc.results[0].geometry.location.lat,
          lon = loc.results[0].geometry.location.lng
      this.weatherService.getWeather(lat, lon).subscribe(weather => {
        console.log(weather)
        this.temperature = weather.currently.temperature
        this.feelslike = weather.currently.apparentTemperature
      })
    })
  }
}
