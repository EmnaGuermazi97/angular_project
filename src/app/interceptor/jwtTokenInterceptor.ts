import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../../services/token-storage.service';
import {Injectable} from '@angular/core';


@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor{
  constructor(private tokenStorage: TokenStorageService) {


  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const interceptRequest = req.clone({headers : req.headers.set('Authorization', 'Bearer ' + this.tokenStorage.getToken())});
    console.log(this.tokenStorage.getToken());
    return next.handle(interceptRequest);
  }

}
