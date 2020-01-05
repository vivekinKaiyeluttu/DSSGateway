import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DssGatewayTestModule } from '../../../test.module';
import { WorkFlowUserDetailComponent } from 'app/entities/work-flow-user/work-flow-user-detail.component';
import { WorkFlowUser } from 'app/shared/model/work-flow-user.model';

describe('Component Tests', () => {
  describe('WorkFlowUser Management Detail Component', () => {
    let comp: WorkFlowUserDetailComponent;
    let fixture: ComponentFixture<WorkFlowUserDetailComponent>;
    const route = ({ data: of({ workFlowUser: new WorkFlowUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [WorkFlowUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(WorkFlowUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WorkFlowUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load workFlowUser on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.workFlowUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
