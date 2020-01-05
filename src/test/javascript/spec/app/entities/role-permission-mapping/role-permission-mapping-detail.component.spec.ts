import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DssGatewayTestModule } from '../../../test.module';
import { RolePermissionMappingDetailComponent } from 'app/entities/role-permission-mapping/role-permission-mapping-detail.component';
import { RolePermissionMapping } from 'app/shared/model/role-permission-mapping.model';

describe('Component Tests', () => {
  describe('RolePermissionMapping Management Detail Component', () => {
    let comp: RolePermissionMappingDetailComponent;
    let fixture: ComponentFixture<RolePermissionMappingDetailComponent>;
    const route = ({ data: of({ rolePermissionMapping: new RolePermissionMapping(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [RolePermissionMappingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RolePermissionMappingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RolePermissionMappingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load rolePermissionMapping on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rolePermissionMapping).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
