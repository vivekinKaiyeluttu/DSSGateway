import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UsersComponentsPage, UsersDeleteDialog, UsersUpdatePage } from './users.page-object';

const expect = chai.expect;

describe('Users e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let usersComponentsPage: UsersComponentsPage;
  let usersUpdatePage: UsersUpdatePage;
  let usersDeleteDialog: UsersDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Users', async () => {
    await navBarPage.goToEntity('users');
    usersComponentsPage = new UsersComponentsPage();
    await browser.wait(ec.visibilityOf(usersComponentsPage.title), 5000);
    expect(await usersComponentsPage.getTitle()).to.eq('Users');
  });

  it('should load create Users page', async () => {
    await usersComponentsPage.clickOnCreateButton();
    usersUpdatePage = new UsersUpdatePage();
    expect(await usersUpdatePage.getPageTitle()).to.eq('Create or edit a Users');
    await usersUpdatePage.cancel();
  });

  it('should create and save Users', async () => {
    const nbButtonsBeforeCreate = await usersComponentsPage.countDeleteButtons();

    await usersComponentsPage.clickOnCreateButton();
    await promise.all([
      usersUpdatePage.setFirstNameInput('firstName'),
      usersUpdatePage.setLastNameInput('lastName'),
      usersUpdatePage.setEmailInput('T18H0@sMK4'),
      usersUpdatePage.setPasswordInput('password'),
      usersUpdatePage.setChallengeTokenInput('challengeToken'),
      usersUpdatePage.setCreatedByInput('createdBy'),
      usersUpdatePage.setCreatedAtInput('2000-12-31'),
      usersUpdatePage.setUpdatedByInput('updatedBy'),
      usersUpdatePage.setUpdatedAtInput('2000-12-31'),
      usersUpdatePage.tenantSelectLastOption()
    ]);
    expect(await usersUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await usersUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await usersUpdatePage.getEmailInput()).to.eq('T18H0@sMK4', 'Expected Email value to be equals to T18H0@sMK4');
    expect(await usersUpdatePage.getPasswordInput()).to.eq('password', 'Expected Password value to be equals to password');
    const selectedVerified = usersUpdatePage.getVerifiedInput();
    if (await selectedVerified.isSelected()) {
      await usersUpdatePage.getVerifiedInput().click();
      expect(await usersUpdatePage.getVerifiedInput().isSelected(), 'Expected verified not to be selected').to.be.false;
    } else {
      await usersUpdatePage.getVerifiedInput().click();
      expect(await usersUpdatePage.getVerifiedInput().isSelected(), 'Expected verified to be selected').to.be.true;
    }
    expect(await usersUpdatePage.getChallengeTokenInput()).to.eq(
      'challengeToken',
      'Expected ChallengeToken value to be equals to challengeToken'
    );
    const selectedWorkFlowInitiate = usersUpdatePage.getWorkFlowInitiateInput();
    if (await selectedWorkFlowInitiate.isSelected()) {
      await usersUpdatePage.getWorkFlowInitiateInput().click();
      expect(await usersUpdatePage.getWorkFlowInitiateInput().isSelected(), 'Expected workFlowInitiate not to be selected').to.be.false;
    } else {
      await usersUpdatePage.getWorkFlowInitiateInput().click();
      expect(await usersUpdatePage.getWorkFlowInitiateInput().isSelected(), 'Expected workFlowInitiate to be selected').to.be.true;
    }
    expect(await usersUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await usersUpdatePage.getCreatedAtInput()).to.eq('2000-12-31', 'Expected createdAt value to be equals to 2000-12-31');
    expect(await usersUpdatePage.getUpdatedByInput()).to.eq('updatedBy', 'Expected UpdatedBy value to be equals to updatedBy');
    expect(await usersUpdatePage.getUpdatedAtInput()).to.eq('2000-12-31', 'Expected updatedAt value to be equals to 2000-12-31');
    await usersUpdatePage.save();
    expect(await usersUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await usersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Users', async () => {
    const nbButtonsBeforeDelete = await usersComponentsPage.countDeleteButtons();
    await usersComponentsPage.clickOnLastDeleteButton();

    usersDeleteDialog = new UsersDeleteDialog();
    expect(await usersDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Users?');
    await usersDeleteDialog.clickOnConfirmButton();

    expect(await usersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
