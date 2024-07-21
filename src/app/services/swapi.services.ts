import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private apiUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) { }

  getPeople(): Observable<any> {
    return this.http.get(`${this.apiUrl}/people/`);
  }

  getPerson(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/people/${id}/`);
  }

  getFilms(urls: string[]): Observable<any>[] {
    return urls.map(url => this.http.get(url));
  }

  getSpecies(urls: string[]): Observable<any>[] {
    return urls.map(url => this.http.get(url));
  }

  getStarships(urls: string[]): Observable<any>[] {
    return urls.map(url => this.http.get(url));
  }

  getVehicles(urls: string[]): Observable<any>[] {
    return urls.map(url => this.http.get(url));
  }
}
