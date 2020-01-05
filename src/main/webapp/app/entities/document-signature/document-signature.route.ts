import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDocumentSignature, DocumentSignature } from 'app/shared/model/document-signature.model';
import { DocumentSignatureService } from './document-signature.service';
import { DocumentSignatureComponent } from './document-signature.component';
import { DocumentSignatureDetailComponent } from './document-signature-detail.component';
import { DocumentSignatureUpdateComponent } from './document-signature-update.component';

@Injectable({ providedIn: 'root' })
export class DocumentSignatureResolve implements Resolve<IDocumentSignature> {
  constructor(private service: DocumentSignatureService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocumentSignature> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((documentSignature: HttpResponse<DocumentSignature>) => {
          if (documentSignature.body) {
            return of(documentSignature.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DocumentSignature());
  }
}

export const documentSignatureRoute: Routes = [
  {
    path: '',
    component: DocumentSignatureComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocumentSignatures'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DocumentSignatureDetailComponent,
    resolve: {
      documentSignature: DocumentSignatureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocumentSignatures'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DocumentSignatureUpdateComponent,
    resolve: {
      documentSignature: DocumentSignatureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocumentSignatures'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DocumentSignatureUpdateComponent,
    resolve: {
      documentSignature: DocumentSignatureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DocumentSignatures'
    },
    canActivate: [UserRouteAccessService]
  }
];
