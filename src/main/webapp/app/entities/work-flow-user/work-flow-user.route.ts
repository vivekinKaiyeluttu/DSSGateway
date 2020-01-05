import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWorkFlowUser, WorkFlowUser } from 'app/shared/model/work-flow-user.model';
import { WorkFlowUserService } from './work-flow-user.service';
import { WorkFlowUserComponent } from './work-flow-user.component';
import { WorkFlowUserDetailComponent } from './work-flow-user-detail.component';
import { WorkFlowUserUpdateComponent } from './work-flow-user-update.component';

@Injectable({ providedIn: 'root' })
export class WorkFlowUserResolve implements Resolve<IWorkFlowUser> {
  constructor(private service: WorkFlowUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorkFlowUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((workFlowUser: HttpResponse<WorkFlowUser>) => {
          if (workFlowUser.body) {
            return of(workFlowUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WorkFlowUser());
  }
}

export const workFlowUserRoute: Routes = [
  {
    path: '',
    component: WorkFlowUserComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'WorkFlowUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WorkFlowUserDetailComponent,
    resolve: {
      workFlowUser: WorkFlowUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'WorkFlowUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WorkFlowUserUpdateComponent,
    resolve: {
      workFlowUser: WorkFlowUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'WorkFlowUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WorkFlowUserUpdateComponent,
    resolve: {
      workFlowUser: WorkFlowUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'WorkFlowUsers'
    },
    canActivate: [UserRouteAccessService]
  }
];
