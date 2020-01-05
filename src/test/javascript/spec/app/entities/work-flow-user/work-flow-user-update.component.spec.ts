import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DssGatewayTestModule } from '../../../test.module';
import { WorkFlowUserUpdateComponent } from 'app/entities/work-flow-user/work-flow-user-update.component';
import { WorkFlowUserService } from 'app/entities/work-flow-user/work-flow-user.service';
import { WorkFlowUser } from 'app/shared/model/work-flow-user.model';

describe('Component Tests', () => {
  describe('WorkFlowUser Management Update Component', () => {
    let comp: WorkFlowUserUpdateComponent;
    let fixture: ComponentFixture<WorkFlowUserUpdateComponent>;
    let service: WorkFlowUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [WorkFlowUserUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(WorkFlowUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WorkFlowUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WorkFlowUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WorkFlowUser(123);
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
        const entity = new WorkFlowUser();
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
