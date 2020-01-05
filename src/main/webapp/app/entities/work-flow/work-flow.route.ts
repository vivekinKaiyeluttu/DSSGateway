import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWorkFlow, WorkFlow } from 'app/shared/model/work-flow.model';
import { WorkFlowService } from './work-flow.service';
import { WorkFlowComponent } from './work-flow.component';
import { WorkFlowDetailComponent } from './work-flow-detail.component';
import { WorkFlowUpdateComponent } from './work-flow-update.component';

@Injectable({ providedIn: 'root' })
export class WorkFlowResolve implements Resolve<IWorkFlow> {
  constructor(private service: WorkFlowService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorkFlow> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((workFlow: HttpResponse<WorkFlow>) => {
          if (workFlow.body) {
            return of(workFlow.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WorkFlow());
  }
}

export const workFlowRoute: Routes = [
  {
    path: '',
    component: WorkFlowComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'WorkFlows'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WorkFlowDetailComponent,
    resolve: {
      workFlow: WorkFlowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'WorkFlows'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WorkFlowUpdateComponent,
    resolve: {
      workFlow: WorkFlowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'WorkFlows'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WorkFlowUpdateComponent,
    resolve: {
      workFlow: WorkFlowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'WorkFlows'
    },
    canActivate: [UserRouteAccessService]
  }
];
