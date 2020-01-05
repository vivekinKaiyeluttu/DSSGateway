import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  DocumentSignatureComponentsPage,
  DocumentSignatureDeleteDialog,
  DocumentSignatureUpdatePage
} from './document-signature.page-object';

const expect = chai.expect;

describe('DocumentSignature e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let documentSignatureComponentsPage: DocumentSignatureComponentsPage;
  let documentSignatureUpdatePage: DocumentSignatureUpdatePage;
  let documentSignatureDeleteDialog: DocumentSignatureDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DocumentSignatures', async () => {
    await navBarPage.goToEntity('document-signature');
    documentSignatureComponentsPage = new DocumentSignatureComponentsPage();
    await browser.wait(ec.visibilityOf(documentSignatureComponentsPage.title), 5000);
    expect(await documentSignatureComponentsPage.getTitle()).to.eq('Document Signatures');
  });

  it('should load create DocumentSignature page', async () => {
    await documentSignatureComponentsPage.clickOnCreateButton();
    documentSignatureUpdatePage = new DocumentSignatureUpdatePage();
    expect(await documentSignatureUpdatePage.getPageTitle()).to.eq('Create or edit a Document Signature');
    await documentSignatureUpdatePage.cancel();
  });

  it('should create and save DocumentSignatures', async () => {
    const nbButtonsBeforeCreate = await documentSignatureComponentsPage.countDeleteButtons();

    await documentSignatureComponentsPage.clickOnCreateButton();
    await promise.all([
      documentSignatureUpdatePage.setValidFromInput('2000-12-31'),
      documentSignatureUpdatePage.setValidToInput('2000-12-31'),
      documentSignatureUpdatePage.setDeviceIdInput('5'),
      documentSignatureUpdatePage.setSignatureInput('signature'),
      documentSignatureUpdatePage.setCreatedAtInput('2000-12-31'),
      documentSignatureUpdatePage.documentSelectLastOption(),
      documentSignatureUpdatePage.workFlowUserSelectLastOption()
    ]);
    expect(await documentSignatureUpdatePage.getValidFromInput()).to.eq(
      '2000-12-31',
      'Expected validFrom value to be equals to 2000-12-31'
    );
    expect(await documentSignatureUpdatePage.getValidToInput()).to.eq('2000-12-31', 'Expected validTo value to be equals to 2000-12-31');
    expect(await documentSignatureUpdatePage.getDeviceIdInput()).to.eq('5', 'Expected deviceId value to be equals to 5');
    expect(await documentSignatureUpdatePage.getSignatureInput()).to.eq('signature', 'Expected Signature value to be equals to signature');
    expect(await documentSignatureUpdatePage.getCreatedAtInput()).to.eq(
      '2000-12-31',
      'Expected createdAt value to be equals to 2000-12-31'
    );
    await documentSignatureUpdatePage.save();
    expect(await documentSignatureUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await documentSignatureComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last DocumentSignature', async () => {
    const nbButtonsBeforeDelete = await documentSignatureComponentsPage.countDeleteButtons();
    await documentSignatureComponentsPage.clickOnLastDeleteButton();

    documentSignatureDeleteDialog = new DocumentSignatureDeleteDialog();
    expect(await documentSignatureDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Document Signature?');
    await documentSignatureDeleteDialog.clickOnConfirmButton();

    expect(await documentSignatureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
