import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDocumentSignature } from 'app/shared/model/document-signature.model';

type EntityResponseType = HttpResponse<IDocumentSignature>;
type EntityArrayResponseType = HttpResponse<IDocumentSignature[]>;

@Injectable({ providedIn: 'root' })
export class DocumentSignatureService {
  public resourceUrl = SERVER_API_URL + 'api/document-signatures';

  constructor(protected http: HttpClient) {}

  create(documentSignature: IDocumentSignature): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(documentSignature);
    return this.http
      .post<IDocumentSignature>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(documentSignature: IDocumentSignature): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(documentSignature);
    return this.http
      .put<IDocumentSignature>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDocumentSignature>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDocumentSignature[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(documentSignature: IDocumentSignature): IDocumentSignature {
    const copy: IDocumentSignature = Object.assign({}, documentSignature, {
      validFrom:
        documentSignature.validFrom && documentSignature.validFrom.isValid() ? documentSignature.validFrom.format(DATE_FORMAT) : undefined,
      validTo: documentSignature.validTo && documentSignature.validTo.isValid() ? documentSignature.validTo.format(DATE_FORMAT) : undefined,
      createdAt:
        documentSignature.createdAt && documentSignature.createdAt.isValid() ? documentSignature.createdAt.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.validFrom = res.body.validFrom ? moment(res.body.validFrom) : undefined;
      res.body.validTo = res.body.validTo ? moment(res.body.validTo) : undefined;
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((documentSignature: IDocumentSignature) => {
        documentSignature.validFrom = documentSignature.validFrom ? moment(documentSignature.validFrom) : undefined;
        documentSignature.validTo = documentSignature.validTo ? moment(documentSignature.validTo) : undefined;
        documentSignature.createdAt = documentSignature.createdAt ? moment(documentSignature.createdAt) : undefined;
      });
    }
    return res;
  }
}
