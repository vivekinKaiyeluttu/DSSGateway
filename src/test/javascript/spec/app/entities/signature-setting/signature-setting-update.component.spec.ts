import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DssGatewayTestModule } from '../../../test.module';
import { SignatureSettingUpdateComponent } from 'app/entities/signature-setting/signature-setting-update.component';
import { SignatureSettingService } from 'app/entities/signature-setting/signature-setting.service';
import { SignatureSetting } from 'app/shared/model/signature-setting.model';

describe('Component Tests', () => {
  describe('SignatureSetting Management Update Component', () => {
    let comp: SignatureSettingUpdateComponent;
    let fixture: ComponentFixture<SignatureSettingUpdateComponent>;
    let service: SignatureSettingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [SignatureSettingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SignatureSettingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SignatureSettingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SignatureSettingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SignatureSetting(123);
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
        const entity = new SignatureSetting();
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
