import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WorkFlowComponentsPage, WorkFlowDeleteDialog, WorkFlowUpdatePage } from './work-flow.page-object';

const expect = chai.expect;

describe('WorkFlow e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let workFlowComponentsPage: WorkFlowComponentsPage;
  let workFlowUpdatePage: WorkFlowUpdatePage;
  let workFlowDeleteDialog: WorkFlowDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load WorkFlows', async () => {
    await navBarPage.goToEntity('work-flow');
    workFlowComponentsPage = new WorkFlowComponentsPage();
    await browser.wait(ec.visibilityOf(workFlowComponentsPage.title), 5000);
    expect(await workFlowComponentsPage.getTitle()).to.eq('Work Flows');
  });

  it('should load create WorkFlow page', async () => {
    await workFlowComponentsPage.clickOnCreateButton();
    workFlowUpdatePage = new WorkFlowUpdatePage();
    expect(await workFlowUpdatePage.getPageTitle()).to.eq('Create or edit a Work Flow');
    await workFlowUpdatePage.cancel();
  });

  it('should create and save WorkFlows', async () => {
    const nbButtonsBeforeCreate = await workFlowComponentsPage.countDeleteButtons();

    await workFlowComponentsPage.clickOnCreateButton();
    await promise.all([
      workFlowUpdatePage.setNameInput('name'),
      workFlowUpdatePage.statusSelectLastOption(),
      workFlowUpdatePage.setCreatedAtInput('2000-12-31'),
      workFlowUpdatePage.setUpdatedAtInput('2000-12-31'),
      workFlowUpdatePage.usersSelectLastOption()
    ]);
    expect(await workFlowUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await workFlowUpdatePage.getCreatedAtInput()).to.eq('2000-12-31', 'Expected createdAt value to be equals to 2000-12-31');
    expect(await workFlowUpdatePage.getUpdatedAtInput()).to.eq('2000-12-31', 'Expected updatedAt value to be equals to 2000-12-31');
    await workFlowUpdatePage.save();
    expect(await workFlowUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await workFlowComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last WorkFlow', async () => {
    const nbButtonsBeforeDelete = await workFlowComponentsPage.countDeleteButtons();
    await workFlowComponentsPage.clickOnLastDeleteButton();

    workFlowDeleteDialog = new WorkFlowDeleteDialog();
    expect(await workFlowDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Work Flow?');
    await workFlowDeleteDialog.clickOnConfirmButton();

    expect(await workFlowComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
