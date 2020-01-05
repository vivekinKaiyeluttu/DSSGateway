import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DssGatewayTestModule } from '../../../test.module';
import { WorkFlowUpdateComponent } from 'app/entities/work-flow/work-flow-update.component';
import { WorkFlowService } from 'app/entities/work-flow/work-flow.service';
import { WorkFlow } from 'app/shared/model/work-flow.model';

describe('Component Tests', () => {
  describe('WorkFlow Management Update Component', () => {
    let comp: WorkFlowUpdateComponent;
    let fixture: ComponentFixture<WorkFlowUpdateComponent>;
    let service: WorkFlowService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [WorkFlowUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(WorkFlowUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WorkFlowUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WorkFlowService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WorkFlow(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new WorkFlow();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
