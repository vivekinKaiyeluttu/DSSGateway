import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWorkFlowUser } from 'app/shared/model/work-flow-user.model';

@Component({
  selector: 'jhi-work-flow-user-detail',
  templateUrl: './work-flow-user-detail.component.html'
})
export class WorkFlowUserDetailComponent implements OnInit {
  workFlowUser: IWorkFlowUser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workFlowUser }) => {
      this.workFlowUser = workFlowUser;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
