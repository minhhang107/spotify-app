import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptTokenService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // only clone and set headers for specified requests
    if (!request.url.includes('spotify.com')) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` },
      });
    }
    return next.handle(request);
  }
}
