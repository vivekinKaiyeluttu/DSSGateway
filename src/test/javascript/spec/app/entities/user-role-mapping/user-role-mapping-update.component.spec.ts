import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DssGatewayTestModule } from '../../../test.module';
import { UserRoleMappingUpdateComponent } from 'app/entities/user-role-mapping/user-role-mapping-update.component';
import { UserRoleMappingService } from 'app/entities/user-role-mapping/user-role-mapping.service';
import { UserRoleMapping } from 'app/shared/model/user-role-mapping.model';

describe('Component Tests', () => {
  describe('UserRoleMapping Management Update Component', () => {
    let comp: UserRoleMappingUpdateComponent;
    let fixture: ComponentFixture<UserRoleMappingUpdateComponent>;
    let service: UserRoleMappingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [UserRoleMappingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserRoleMappingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserRoleMappingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserRoleMappingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserRoleMapping(123);
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
        const entity = new UserRoleMapping();
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
