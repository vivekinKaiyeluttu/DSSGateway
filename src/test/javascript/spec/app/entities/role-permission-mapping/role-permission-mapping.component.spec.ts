import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DssGatewayTestModule } from '../../../test.module';
import { RolePermissionMappingComponent } from 'app/entities/role-permission-mapping/role-permission-mapping.component';
import { RolePermissionMappingService } from 'app/entities/role-permission-mapping/role-permission-mapping.service';
import { RolePermissionMapping } from 'app/shared/model/role-permission-mapping.model';

describe('Component Tests', () => {
  describe('RolePermissionMapping Management Component', () => {
    let comp: RolePermissionMappingComponent;
    let fixture: ComponentFixture<RolePermissionMappingComponent>;
    let service: RolePermissionMappingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [RolePermissionMappingComponent],
        providers: []
      })
        .overrideTemplate(RolePermissionMappingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RolePermissionMappingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RolePermissionMappingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RolePermissionMapping(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rolePermissionMappings && comp.rolePermissionMappings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
