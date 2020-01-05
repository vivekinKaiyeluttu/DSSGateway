import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DssGatewayTestModule } from '../../../test.module';
import { DocumentSignatureUpdateComponent } from 'app/entities/document-signature/document-signature-update.component';
import { DocumentSignatureService } from 'app/entities/document-signature/document-signature.service';
import { DocumentSignature } from 'app/shared/model/document-signature.model';

describe('Component Tests', () => {
  describe('DocumentSignature Management Update Component', () => {
    let comp: DocumentSignatureUpdateComponent;
    let fixture: ComponentFixture<DocumentSignatureUpdateComponent>;
    let service: DocumentSignatureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [DocumentSignatureUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DocumentSignatureUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentSignatureUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentSignatureService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DocumentSignature(123);
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
        const entity = new DocumentSignature();
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
