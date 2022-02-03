import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export class User {
  username!: string;
  password!: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: User): Promise<any> {
    let api = `${environment.api_url}register-user`;
    return this.http.post<any>(api, user).toPromise().then(response => {
      //redirect to home page if success
    })
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${environment.api_url}api-token-auth/`, user).toPromise().then(response => {
      localStorage.setItem('access_token', response.token);
      localStorage.setItem('username', user.username);
      this.router.navigate(['home/']);
    }).catch(error =>{
        return error;
    })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
    //return true;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    if (removeToken == null) {
      this.router.navigate(['splash']);
    }
  }

  // User profile
  // getUserProfile(id: string): Observable<any> {
  //   let api = `${this.endpoint}/user-profile/${id}`;
  //   return this.http.get(api, { headers: this.headers }).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.handleError)
  //   )
  // }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
