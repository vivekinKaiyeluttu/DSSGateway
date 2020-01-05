import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DssGatewayTestModule } from '../../../test.module';
import { WorkFlowUserComponent } from 'app/entities/work-flow-user/work-flow-user.component';
import { WorkFlowUserService } from 'app/entities/work-flow-user/work-flow-user.service';
import { WorkFlowUser } from 'app/shared/model/work-flow-user.model';

describe('Component Tests', () => {
  describe('WorkFlowUser Management Component', () => {
    let comp: WorkFlowUserComponent;
    let fixture: ComponentFixture<WorkFlowUserComponent>;
    let service: WorkFlowUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [WorkFlowUserComponent],
        providers: []
      })
        .overrideTemplate(WorkFlowUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WorkFlowUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WorkFlowUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new WorkFlowUser(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.workFlowUsers && comp.workFlowUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
