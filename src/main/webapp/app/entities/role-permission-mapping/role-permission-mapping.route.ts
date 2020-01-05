import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRolePermissionMapping, RolePermissionMapping } from 'app/shared/model/role-permission-mapping.model';
import { RolePermissionMappingService } from './role-permission-mapping.service';
import { RolePermissionMappingComponent } from './role-permission-mapping.component';
import { RolePermissionMappingDetailComponent } from './role-permission-mapping-detail.component';
import { RolePermissionMappingUpdateComponent } from './role-permission-mapping-update.component';

@Injectable({ providedIn: 'root' })
export class RolePermissionMappingResolve implements Resolve<IRolePermissionMapping> {
  constructor(private service: RolePermissionMappingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRolePermissionMapping> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((rolePermissionMapping: HttpResponse<RolePermissionMapping>) => {
          if (rolePermissionMapping.body) {
            return of(rolePermissionMapping.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RolePermissionMapping());
  }
}

export const rolePermissionMappingRoute: Routes = [
  {
    path: '',
    component: RolePermissionMappingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RolePermissionMappings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RolePermissionMappingDetailComponent,
    resolve: {
      rolePermissionMapping: RolePermissionMappingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RolePermissionMappings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RolePermissionMappingUpdateComponent,
    resolve: {
      rolePermissionMapping: RolePermissionMappingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RolePermissionMappings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RolePermissionMappingUpdateComponent,
    resolve: {
      rolePermissionMapping: RolePermissionMappingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RolePermissionMappings'
    },
    canActivate: [UserRouteAccessService]
  }
];
