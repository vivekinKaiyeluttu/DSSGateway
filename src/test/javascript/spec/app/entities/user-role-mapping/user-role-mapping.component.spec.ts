import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DssGatewayTestModule } from '../../../test.module';
import { UserRoleMappingComponent } from 'app/entities/user-role-mapping/user-role-mapping.component';
import { UserRoleMappingService } from 'app/entities/user-role-mapping/user-role-mapping.service';
import { UserRoleMapping } from 'app/shared/model/user-role-mapping.model';

describe('Component Tests', () => {
  describe('UserRoleMapping Management Component', () => {
    let comp: UserRoleMappingComponent;
    let fixture: ComponentFixture<UserRoleMappingComponent>;
    let service: UserRoleMappingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [UserRoleMappingComponent],
        providers: []
      })
        .overrideTemplate(UserRoleMappingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserRoleMappingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserRoleMappingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserRoleMapping(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userRoleMappings && comp.userRoleMappings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
