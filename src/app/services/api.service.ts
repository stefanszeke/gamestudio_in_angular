import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Score } from '../model/Score';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL: string = 'http://localhost:8090/api/score';

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getTopScoresByGame(game: string): Observable<Score[]> {
      return this.http.get<Score[]>(`${this.API_URL}/top/${game}`);
  }

  postScore(score: Score): Observable<string> {
    return this.http.post<string>(this.API_URL, score, this.options);
  }
}


  // getAllScores(): Observable<Score> {
  //   return this.http.get<Score>(this.API_URL);
  // }

  // getScoresByGame(game: string): Observable<Score> {
  //     return this.http.get<Score>(`${this.API_URL}/${game}`);
  // }