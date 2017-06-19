import { Component } from '@angular/core'
import { WeatherService } from './weather.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService]
})
export class AppComponent {
  title = 'app'

  constructor(private weatherService: WeatherService) {
    this.weatherService.getLocation('buffalo NY').subscribe(loc => {
      console.log(loc)
    })
  }
}
