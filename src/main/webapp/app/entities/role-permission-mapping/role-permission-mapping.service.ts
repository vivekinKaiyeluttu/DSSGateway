import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRolePermissionMapping } from 'app/shared/model/role-permission-mapping.model';

type EntityResponseType = HttpResponse<IRolePermissionMapping>;
type EntityArrayResponseType = HttpResponse<IRolePermissionMapping[]>;

@Injectable({ providedIn: 'root' })
export class RolePermissionMappingService {
  public resourceUrl = SERVER_API_URL + 'api/role-permission-mappings';

  constructor(protected http: HttpClient) {}

  create(rolePermissionMapping: IRolePermissionMapping): Observable<EntityResponseType> {
    return this.http.post<IRolePermissionMapping>(this.resourceUrl, rolePermissionMapping, { observe: 'response' });
  }

  update(rolePermissionMapping: IRolePermissionMapping): Observable<EntityResponseType> {
    return this.http.put<IRolePermissionMapping>(this.resourceUrl, rolePermissionMapping, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRolePermissionMapping>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRolePermissionMapping[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
