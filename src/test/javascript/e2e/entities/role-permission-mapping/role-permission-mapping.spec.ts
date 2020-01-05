import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  RolePermissionMappingComponentsPage,
  RolePermissionMappingDeleteDialog,
  RolePermissionMappingUpdatePage
} from './role-permission-mapping.page-object';

const expect = chai.expect;

describe('RolePermissionMapping e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rolePermissionMappingComponentsPage: RolePermissionMappingComponentsPage;
  let rolePermissionMappingUpdatePage: RolePermissionMappingUpdatePage;
  let rolePermissionMappingDeleteDialog: RolePermissionMappingDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RolePermissionMappings', async () => {
    await navBarPage.goToEntity('role-permission-mapping');
    rolePermissionMappingComponentsPage = new RolePermissionMappingComponentsPage();
    await browser.wait(ec.visibilityOf(rolePermissionMappingComponentsPage.title), 5000);
    expect(await rolePermissionMappingComponentsPage.getTitle()).to.eq('Role Permission Mappings');
  });

  it('should load create RolePermissionMapping page', async () => {
    await rolePermissionMappingComponentsPage.clickOnCreateButton();
    rolePermissionMappingUpdatePage = new RolePermissionMappingUpdatePage();
    expect(await rolePermissionMappingUpdatePage.getPageTitle()).to.eq('Create or edit a Role Permission Mapping');
    await rolePermissionMappingUpdatePage.cancel();
  });

  it('should create and save RolePermissionMappings', async () => {
    const nbButtonsBeforeCreate = await rolePermissionMappingComponentsPage.countDeleteButtons();

    await rolePermissionMappingComponentsPage.clickOnCreateButton();
    await promise.all([
      rolePermissionMappingUpdatePage.userRoleSelectLastOption(),
      rolePermissionMappingUpdatePage.permissionSelectLastOption()
    ]);
    await rolePermissionMappingUpdatePage.save();
    expect(await rolePermissionMappingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rolePermissionMappingComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last RolePermissionMapping', async () => {
    const nbButtonsBeforeDelete = await rolePermissionMappingComponentsPage.countDeleteButtons();
    await rolePermissionMappingComponentsPage.clickOnLastDeleteButton();

    rolePermissionMappingDeleteDialog = new RolePermissionMappingDeleteDialog();
    expect(await rolePermissionMappingDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Role Permission Mapping?');
    await rolePermissionMappingDeleteDialog.clickOnConfirmButton();

    expect(await rolePermissionMappingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
