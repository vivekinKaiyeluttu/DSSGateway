import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { DssGatewayTestModule } from '../../../test.module';
import { SignatureSettingDetailComponent } from 'app/entities/signature-setting/signature-setting-detail.component';
import { SignatureSetting } from 'app/shared/model/signature-setting.model';

describe('Component Tests', () => {
  describe('SignatureSetting Management Detail Component', () => {
    let comp: SignatureSettingDetailComponent;
    let fixture: ComponentFixture<SignatureSettingDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ signatureSetting: new SignatureSetting(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [SignatureSettingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SignatureSettingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SignatureSettingDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load signatureSetting on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.signatureSetting).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
