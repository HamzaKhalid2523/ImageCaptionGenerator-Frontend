import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BadInput } from './error/bad-input';
import { NotFoundError } from './error/not-found-error';
import { AppError } from './error/app-error';
import { UnAuthorized } from './error/unauthorized-error';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CaptionService {

    constructor(
        private http: HttpClient
      ) { }
      
  public generateCaption(credentials: object): Observable<any> {
    console.log(credentials);
    const url = 'https://git.heroku.com/fyp-image-caption-generator/predict';

    return this.http.post(url, credentials)
    .pipe(
      map((response: Response) => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput(error));
    }
    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }
    if (error.status === 401) {
      return throwError(new UnAuthorized(error));
    }
    return throwError(new AppError(error));
  }
}
