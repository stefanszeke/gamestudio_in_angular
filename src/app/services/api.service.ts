import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Score } from '../model/Score';
import { Comment } from '../model/Comment';
import { Rating } from '../model/Rating';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL: string = 'http://localhost:8090/api';

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getTopScoresByGame(game: string): Observable<Score[]> {
      return this.http.get<Score[]>(`${this.API_URL}/score/top/${game}`);
  }

  postScore(score: Score): Observable<string> {
    return this.http.post<string>(`${this.API_URL}/score`, score, this.options);
  }

  getTopCommentsByGame(game: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URL}/comment/${game}`);
  }

  postComment(comment: Comment): Observable<string> {
    return this.http.post<string>(`${this.API_URL}/comment`, comment, this.options);
  }

  getRatingByGame(game: string): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/rating/avg/${game}`);
  }

  postRating(rating: Rating): Observable<string> {
    return this.http.post<string>(`${this.API_URL}/rating`, rating, this.options);
  }
  
}


  // getAllScores(): Observable<Score> {
  //   return this.http.get<Score>(this.API_URL);
  // }

  // getScoresByGame(game: string): Observable<Score> {
  //     return this.http.get<Score>(`${this.API_URL}/${game}`);
  // }