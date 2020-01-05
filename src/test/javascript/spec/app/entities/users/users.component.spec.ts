import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DssGatewayTestModule } from '../../../test.module';
import { UsersComponent } from 'app/entities/users/users.component';
import { UsersService } from 'app/entities/users/users.service';
import { Users } from 'app/shared/model/users.model';

describe('Component Tests', () => {
  describe('Users Management Component', () => {
    let comp: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let service: UsersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [UsersComponent],
        providers: []
      })
        .overrideTemplate(UsersComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UsersComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UsersService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Users(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.users && comp.users[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
