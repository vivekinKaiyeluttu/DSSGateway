import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserRoleMapping } from 'app/shared/model/user-role-mapping.model';

type EntityResponseType = HttpResponse<IUserRoleMapping>;
type EntityArrayResponseType = HttpResponse<IUserRoleMapping[]>;

@Injectable({ providedIn: 'root' })
export class UserRoleMappingService {
  public resourceUrl = SERVER_API_URL + 'api/user-role-mappings';

  constructor(protected http: HttpClient) {}

  create(userRoleMapping: IUserRoleMapping): Observable<EntityResponseType> {
    return this.http.post<IUserRoleMapping>(this.resourceUrl, userRoleMapping, { observe: 'response' });
  }

  update(userRoleMapping: IUserRoleMapping): Observable<EntityResponseType> {
    return this.http.put<IUserRoleMapping>(this.resourceUrl, userRoleMapping, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserRoleMapping>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserRoleMapping[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
