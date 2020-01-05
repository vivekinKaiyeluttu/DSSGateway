import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DssGatewayTestModule } from '../../../test.module';
import { DocumentSignatureDetailComponent } from 'app/entities/document-signature/document-signature-detail.component';
import { DocumentSignature } from 'app/shared/model/document-signature.model';

describe('Component Tests', () => {
  describe('DocumentSignature Management Detail Component', () => {
    let comp: DocumentSignatureDetailComponent;
    let fixture: ComponentFixture<DocumentSignatureDetailComponent>;
    const route = ({ data: of({ documentSignature: new DocumentSignature(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DssGatewayTestModule],
        declarations: [DocumentSignatureDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DocumentSignatureDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentSignatureDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load documentSignature on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.documentSignature).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
