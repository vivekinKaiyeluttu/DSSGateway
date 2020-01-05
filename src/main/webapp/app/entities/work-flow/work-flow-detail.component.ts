import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWorkFlow } from 'app/shared/model/work-flow.model';

@Component({
  selector: 'jhi-work-flow-detail',
  templateUrl: './work-flow-detail.component.html'
})
export class WorkFlowDetailComponent implements OnInit {
  workFlow: IWorkFlow | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workFlow }) => {
      this.workFlow = workFlow;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
