import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DssGatewayTestModule } from '../../../test.module';
import { WorkFlowDetailComponent } from 'app/entities/work-flow/work-flow-detail.component';
import { WorkFlow } from 'app/shared/model/work-flow.model';

describe('Component Tests', () => {
  describe('WorkFlow Management Detail Component', () => {
    let comp: WorkFlowDetailComponent;
    let fixture: ComponentFixture<WorkFlowDetailComponent>;
    const route = ({ data: of({ workFlow: new WorkFlow(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [WorkFlowDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(WorkFlowDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WorkFlowDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load workFlow on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.workFlow).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
