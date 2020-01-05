import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISignatureSetting, SignatureSetting } from 'app/shared/model/signature-setting.model';
import { SignatureSettingService } from './signature-setting.service';
import { SignatureSettingComponent } from './signature-setting.component';
import { SignatureSettingDetailComponent } from './signature-setting-detail.component';
import { SignatureSettingUpdateComponent } from './signature-setting-update.component';

@Injectable({ providedIn: 'root' })
export class SignatureSettingResolve implements Resolve<ISignatureSetting> {
  constructor(private service: SignatureSettingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISignatureSetting> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((signatureSetting: HttpResponse<SignatureSetting>) => {
          if (signatureSetting.body) {
            return of(signatureSetting.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SignatureSetting());
  }
}

export const signatureSettingRoute: Routes = [
  {
    path: '',
    component: SignatureSettingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SignatureSettings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SignatureSettingDetailComponent,
    resolve: {
      signatureSetting: SignatureSettingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SignatureSettings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SignatureSettingUpdateComponent,
    resolve: {
      signatureSetting: SignatureSettingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SignatureSettings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SignatureSettingUpdateComponent,
    resolve: {
      signatureSetting: SignatureSettingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SignatureSettings'
    },
    canActivate: [UserRouteAccessService]
  }
];
