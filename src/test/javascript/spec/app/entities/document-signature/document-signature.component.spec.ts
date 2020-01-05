import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DssGatewayTestModule } from '../../../test.module';
import { DocumentSignatureComponent } from 'app/entities/document-signature/document-signature.component';
import { DocumentSignatureService } from 'app/entities/document-signature/document-signature.service';
import { DocumentSignature } from 'app/shared/model/document-signature.model';

describe('Component Tests', () => {
  describe('DocumentSignature Management Component', () => {
    let comp: DocumentSignatureComponent;
    let fixture: ComponentFixture<DocumentSignatureComponent>;
    let service: DocumentSignatureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [DocumentSignatureComponent],
        providers: []
      })
        .overrideTemplate(DocumentSignatureComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentSignatureComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentSignatureService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DocumentSignature(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.documentSignatures && comp.documentSignatures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
