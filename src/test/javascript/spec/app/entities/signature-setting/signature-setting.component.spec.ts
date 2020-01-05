import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DssGatewayTestModule } from '../../../test.module';
import { SignatureSettingComponent } from 'app/entities/signature-setting/signature-setting.component';
import { SignatureSettingService } from 'app/entities/signature-setting/signature-setting.service';
import { SignatureSetting } from 'app/shared/model/signature-setting.model';

describe('Component Tests', () => {
  describe('SignatureSetting Management Component', () => {
    let comp: SignatureSettingComponent;
    let fixture: ComponentFixture<SignatureSettingComponent>;
    let service: SignatureSettingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [SignatureSettingComponent],
        providers: []
      })
        .overrideTemplate(SignatureSettingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SignatureSettingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SignatureSettingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SignatureSetting(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.signatureSettings && comp.signatureSettings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
