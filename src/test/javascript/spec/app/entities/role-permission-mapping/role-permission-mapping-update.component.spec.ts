import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DssGatewayTestModule } from '../../../test.module';
import { RolePermissionMappingUpdateComponent } from 'app/entities/role-permission-mapping/role-permission-mapping-update.component';
import { RolePermissionMappingService } from 'app/entities/role-permission-mapping/role-permission-mapping.service';
import { RolePermissionMapping } from 'app/shared/model/role-permission-mapping.model';

describe('Component Tests', () => {
  describe('RolePermissionMapping Management Update Component', () => {
    let comp: RolePermissionMappingUpdateComponent;
    let fixture: ComponentFixture<RolePermissionMappingUpdateComponent>;
    let service: RolePermissionMappingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [RolePermissionMappingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RolePermissionMappingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RolePermissionMappingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RolePermissionMappingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RolePermissionMapping(123);
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
        const entity = new RolePermissionMapping();
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
