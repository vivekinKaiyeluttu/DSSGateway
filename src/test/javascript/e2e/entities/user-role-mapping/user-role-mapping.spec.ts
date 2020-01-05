import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserRoleMappingComponentsPage, UserRoleMappingDeleteDialog, UserRoleMappingUpdatePage } from './user-role-mapping.page-object';

const expect = chai.expect;

describe('UserRoleMapping e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userRoleMappingComponentsPage: UserRoleMappingComponentsPage;
  let userRoleMappingUpdatePage: UserRoleMappingUpdatePage;
  let userRoleMappingDeleteDialog: UserRoleMappingDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserRoleMappings', async () => {
    await navBarPage.goToEntity('user-role-mapping');
    userRoleMappingComponentsPage = new UserRoleMappingComponentsPage();
    await browser.wait(ec.visibilityOf(userRoleMappingComponentsPage.title), 5000);
    expect(await userRoleMappingComponentsPage.getTitle()).to.eq('User Role Mappings');
  });

  it('should load create UserRoleMapping page', async () => {
    await userRoleMappingComponentsPage.clickOnCreateButton();
    userRoleMappingUpdatePage = new UserRoleMappingUpdatePage();
    expect(await userRoleMappingUpdatePage.getPageTitle()).to.eq('Create or edit a User Role Mapping');
    await userRoleMappingUpdatePage.cancel();
  });

  it('should create and save UserRoleMappings', async () => {
    const nbButtonsBeforeCreate = await userRoleMappingComponentsPage.countDeleteButtons();

    await userRoleMappingComponentsPage.clickOnCreateButton();
    await promise.all([userRoleMappingUpdatePage.usersSelectLastOption(), userRoleMappingUpdatePage.userRoleSelectLastOption()]);
    await userRoleMappingUpdatePage.save();
    expect(await userRoleMappingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userRoleMappingComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last UserRoleMapping', async () => {
    const nbButtonsBeforeDelete = await userRoleMappingComponentsPage.countDeleteButtons();
    await userRoleMappingComponentsPage.clickOnLastDeleteButton();

    userRoleMappingDeleteDialog = new UserRoleMappingDeleteDialog();
    expect(await userRoleMappingDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this User Role Mapping?');
    await userRoleMappingDeleteDialog.clickOnConfirmButton();

    expect(await userRoleMappingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
