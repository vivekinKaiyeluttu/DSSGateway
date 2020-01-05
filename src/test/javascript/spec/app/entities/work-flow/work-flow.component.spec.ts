import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DssGatewayTestModule } from '../../../test.module';
import { WorkFlowComponent } from 'app/entities/work-flow/work-flow.component';
import { WorkFlowService } from 'app/entities/work-flow/work-flow.service';
import { WorkFlow } from 'app/shared/model/work-flow.model';

describe('Component Tests', () => {
  describe('WorkFlow Management Component', () => {
    let comp: WorkFlowComponent;
    let fixture: ComponentFixture<WorkFlowComponent>;
    let service: WorkFlowService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [WorkFlowComponent],
        providers: []
      })
        .overrideTemplate(WorkFlowComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WorkFlowComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WorkFlowService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new WorkFlow(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.workFlows && comp.workFlows[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
