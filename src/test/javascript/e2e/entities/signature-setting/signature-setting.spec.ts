import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SignatureSettingComponentsPage, SignatureSettingDeleteDialog, SignatureSettingUpdatePage } from './signature-setting.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('SignatureSetting e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let signatureSettingComponentsPage: SignatureSettingComponentsPage;
  let signatureSettingUpdatePage: SignatureSettingUpdatePage;
  let signatureSettingDeleteDialog: SignatureSettingDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SignatureSettings', async () => {
    await navBarPage.goToEntity('signature-setting');
    signatureSettingComponentsPage = new SignatureSettingComponentsPage();
    await browser.wait(ec.visibilityOf(signatureSettingComponentsPage.title), 5000);
    expect(await signatureSettingComponentsPage.getTitle()).to.eq('Signature Settings');
  });

  it('should load create SignatureSetting page', async () => {
    await signatureSettingComponentsPage.clickOnCreateButton();
    signatureSettingUpdatePage = new SignatureSettingUpdatePage();
    expect(await signatureSettingUpdatePage.getPageTitle()).to.eq('Create or edit a Signature Setting');
    await signatureSettingUpdatePage.cancel();
  });

  it('should create and save SignatureSettings', async () => {
    const nbButtonsBeforeCreate = await signatureSettingComponentsPage.countDeleteButtons();

    await signatureSettingComponentsPage.clickOnCreateButton();
    await promise.all([
      signatureSettingUpdatePage.setNameInput('name'),
      signatureSettingUpdatePage.setSignAsInput('signAs'),
      signatureSettingUpdatePage.setDesignationInput('designation'),
      signatureSettingUpdatePage.setImageInput(absolutePath),
      signatureSettingUpdatePage.setAddressInput('address'),
      signatureSettingUpdatePage.setCreatedAtInput('2000-12-31'),
      signatureSettingUpdatePage.setUpdatedAtInput('2000-12-31'),
      signatureSettingUpdatePage.usersSelectLastOption()
    ]);
    expect(await signatureSettingUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await signatureSettingUpdatePage.getSignAsInput()).to.eq('signAs', 'Expected SignAs value to be equals to signAs');
    expect(await signatureSettingUpdatePage.getDesignationInput()).to.eq(
      'designation',
      'Expected Designation value to be equals to designation'
    );
    expect(await signatureSettingUpdatePage.getImageInput()).to.endsWith(
      fileNameToUpload,
      'Expected Image value to be end with ' + fileNameToUpload
    );
    const selectedDefaultSignature = signatureSettingUpdatePage.getDefaultSignatureInput();
    if (await selectedDefaultSignature.isSelected()) {
      await signatureSettingUpdatePage.getDefaultSignatureInput().click();
      expect(await signatureSettingUpdatePage.getDefaultSignatureInput().isSelected(), 'Expected defaultSignature not to be selected').to.be
        .false;
    } else {
      await signatureSettingUpdatePage.getDefaultSignatureInput().click();
      expect(await signatureSettingUpdatePage.getDefaultSignatureInput().isSelected(), 'Expected defaultSignature to be selected').to.be
        .true;
    }
    expect(await signatureSettingUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await signatureSettingUpdatePage.getCreatedAtInput()).to.eq('2000-12-31', 'Expected createdAt value to be equals to 2000-12-31');
    expect(await signatureSettingUpdatePage.getUpdatedAtInput()).to.eq('2000-12-31', 'Expected updatedAt value to be equals to 2000-12-31');
    await signatureSettingUpdatePage.save();
    expect(await signatureSettingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await signatureSettingComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last SignatureSetting', async () => {
    const nbButtonsBeforeDelete = await signatureSettingComponentsPage.countDeleteButtons();
    await signatureSettingComponentsPage.clickOnLastDeleteButton();

    signatureSettingDeleteDialog = new SignatureSettingDeleteDialog();
    expect(await signatureSettingDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Signature Setting?');
    await signatureSettingDeleteDialog.clickOnConfirmButton();

    expect(await signatureSettingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
