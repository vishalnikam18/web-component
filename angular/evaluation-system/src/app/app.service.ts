import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    constructor(private http: HttpClient) { }

  getUserDetails()  {
    const getToken: any = JSON.parse(sessionStorage.getItem('token'));
   return this.http.get<any>(`http://localhost:4000/api/auth/userData/` + getToken.token);
  }


  login(user) {
    return this.http.post<any>(`http://localhost:4000/api/auth`, user).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError))
  }


  register(user) {
    return this.http.post<any>(`http://localhost:4000/api/users`, user).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError))
  }
  private handleError(err: HttpErrorResponse) {
    console.log('some error');
    return throwError(err);

  }
}


export class UserCredentials {
  userName: string;
  passWord: string;
}
