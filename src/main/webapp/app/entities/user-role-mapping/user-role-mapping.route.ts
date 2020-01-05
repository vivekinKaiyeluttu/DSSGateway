import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUserRoleMapping, UserRoleMapping } from 'app/shared/model/user-role-mapping.model';
import { UserRoleMappingService } from './user-role-mapping.service';
import { UserRoleMappingComponent } from './user-role-mapping.component';
import { UserRoleMappingDetailComponent } from './user-role-mapping-detail.component';
import { UserRoleMappingUpdateComponent } from './user-role-mapping-update.component';

@Injectable({ providedIn: 'root' })
export class UserRoleMappingResolve implements Resolve<IUserRoleMapping> {
  constructor(private service: UserRoleMappingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserRoleMapping> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((userRoleMapping: HttpResponse<UserRoleMapping>) => {
          if (userRoleMapping.body) {
            return of(userRoleMapping.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UserRoleMapping());
  }
}

export const userRoleMappingRoute: Routes = [
  {
    path: '',
    component: UserRoleMappingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserRoleMappings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: UserRoleMappingDetailComponent,
    resolve: {
      userRoleMapping: UserRoleMappingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserRoleMappings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: UserRoleMappingUpdateComponent,
    resolve: {
      userRoleMapping: UserRoleMappingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserRoleMappings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: UserRoleMappingUpdateComponent,
    resolve: {
      userRoleMapping: UserRoleMappingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'UserRoleMappings'
    },
    canActivate: [UserRouteAccessService]
  }
];
