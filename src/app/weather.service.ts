import { Injectable } from '@angular/core'
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class WeatherService {

  private API_URL = 'http://darrenl.im/api/'

  constructor(private http: Http) {
    console.log('WeatherService Initialized')
  }

  getWeather(lat: number, lon: number) {
    let url = `${this.API_URL}weather?lat=${lat}&lon=${lon}`
    // let url = 'http://localhost:3000/results'
    return this.http.get(url).map(res => res.json())
  }

  getLocation(location: string) {
    let url = `${this.API_URL}location?address=${location}`
    // let url = 'http://localhost:3001/db'
    return this.http.get(url).map(res => res.json())
  }

}
