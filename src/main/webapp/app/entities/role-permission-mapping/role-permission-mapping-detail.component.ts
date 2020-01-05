import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRolePermissionMapping } from 'app/shared/model/role-permission-mapping.model';

@Component({
  selector: 'jhi-role-permission-mapping-detail',
  templateUrl: './role-permission-mapping-detail.component.html'
})
export class RolePermissionMappingDetailComponent implements OnInit {
  rolePermissionMapping: IRolePermissionMapping | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rolePermissionMapping }) => {
      this.rolePermissionMapping = rolePermissionMapping;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
