import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WorkFlowUserComponentsPage, WorkFlowUserDeleteDialog, WorkFlowUserUpdatePage } from './work-flow-user.page-object';

const expect = chai.expect;

describe('WorkFlowUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let workFlowUserComponentsPage: WorkFlowUserComponentsPage;
  let workFlowUserUpdatePage: WorkFlowUserUpdatePage;
  let workFlowUserDeleteDialog: WorkFlowUserDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load WorkFlowUsers', async () => {
    await navBarPage.goToEntity('work-flow-user');
    workFlowUserComponentsPage = new WorkFlowUserComponentsPage();
    await browser.wait(ec.visibilityOf(workFlowUserComponentsPage.title), 5000);
    expect(await workFlowUserComponentsPage.getTitle()).to.eq('Work Flow Users');
  });

  it('should load create WorkFlowUser page', async () => {
    await workFlowUserComponentsPage.clickOnCreateButton();
    workFlowUserUpdatePage = new WorkFlowUserUpdatePage();
    expect(await workFlowUserUpdatePage.getPageTitle()).to.eq('Create or edit a Work Flow User');
    await workFlowUserUpdatePage.cancel();
  });

  it('should create and save WorkFlowUsers', async () => {
    const nbButtonsBeforeCreate = await workFlowUserComponentsPage.countDeleteButtons();

    await workFlowUserComponentsPage.clickOnCreateButton();
    await promise.all([
      workFlowUserUpdatePage.setStepInput('5'),
      workFlowUserUpdatePage.workFlowSelectLastOption(),
      workFlowUserUpdatePage.usersSelectLastOption()
    ]);
    expect(await workFlowUserUpdatePage.getStepInput()).to.eq('5', 'Expected step value to be equals to 5');
    await workFlowUserUpdatePage.save();
    expect(await workFlowUserUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await workFlowUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last WorkFlowUser', async () => {
    const nbButtonsBeforeDelete = await workFlowUserComponentsPage.countDeleteButtons();
    await workFlowUserComponentsPage.clickOnLastDeleteButton();

    workFlowUserDeleteDialog = new WorkFlowUserDeleteDialog();
    expect(await workFlowUserDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Work Flow User?');
    await workFlowUserDeleteDialog.clickOnConfirmButton();

    expect(await workFlowUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
