import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserRoleMapping } from 'app/shared/model/user-role-mapping.model';

@Component({
  selector: 'jhi-user-role-mapping-detail',
  templateUrl: './user-role-mapping-detail.component.html'
})
export class UserRoleMappingDetailComponent implements OnInit {
  userRoleMapping: IUserRoleMapping | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userRoleMapping }) => {
      this.userRoleMapping = userRoleMapping;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
