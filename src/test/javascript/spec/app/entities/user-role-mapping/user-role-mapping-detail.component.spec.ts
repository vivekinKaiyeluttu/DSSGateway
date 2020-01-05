import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DssGatewayTestModule } from '../../../test.module';
import { UserRoleMappingDetailComponent } from 'app/entities/user-role-mapping/user-role-mapping-detail.component';
import { UserRoleMapping } from 'app/shared/model/user-role-mapping.model';

describe('Component Tests', () => {
  describe('UserRoleMapping Management Detail Component', () => {
    let comp: UserRoleMappingDetailComponent;
    let fixture: ComponentFixture<UserRoleMappingDetailComponent>;
    const route = ({ data: of({ userRoleMapping: new UserRoleMapping(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [UserRoleMappingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserRoleMappingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserRoleMappingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userRoleMapping on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userRoleMapping).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
