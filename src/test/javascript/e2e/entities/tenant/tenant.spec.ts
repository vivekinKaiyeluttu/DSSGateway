import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TenantComponentsPage, TenantDeleteDialog, TenantUpdatePage } from './tenant.page-object';

const expect = chai.expect;

describe('Tenant e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tenantComponentsPage: TenantComponentsPage;
  let tenantUpdatePage: TenantUpdatePage;
  let tenantDeleteDialog: TenantDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tenants', async () => {
    await navBarPage.goToEntity('tenant');
    tenantComponentsPage = new TenantComponentsPage();
    await browser.wait(ec.visibilityOf(tenantComponentsPage.title), 5000);
    expect(await tenantComponentsPage.getTitle()).to.eq('Tenants');
  });

  it('should load create Tenant page', async () => {
    await tenantComponentsPage.clickOnCreateButton();
    tenantUpdatePage = new TenantUpdatePage();
    expect(await tenantUpdatePage.getPageTitle()).to.eq('Create or edit a Tenant');
    await tenantUpdatePage.cancel();
  });

  it('should create and save Tenants', async () => {
    const nbButtonsBeforeCreate = await tenantComponentsPage.countDeleteButtons();

    await tenantComponentsPage.clickOnCreateButton();
    await promise.all([
      tenantUpdatePage.setNameInput('name'),
      tenantUpdatePage.setDomainInput('domain'),
      tenantUpdatePage.setPrimaryEmailInput('primaryEmail'),
      tenantUpdatePage.setSecondaryEmailInput('secondaryEmail'),
      tenantUpdatePage.setOrganizationInput('organization'),
      tenantUpdatePage.setCreatedByInput('createdBy'),
      tenantUpdatePage.setCreatedAtInput('2000-12-31'),
      tenantUpdatePage.setUpdatedByInput('updatedBy'),
      tenantUpdatePage.setUpdatedAtInput('2000-12-31')
    ]);
    expect(await tenantUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await tenantUpdatePage.getDomainInput()).to.eq('domain', 'Expected Domain value to be equals to domain');
    expect(await tenantUpdatePage.getPrimaryEmailInput()).to.eq('primaryEmail', 'Expected PrimaryEmail value to be equals to primaryEmail');
    expect(await tenantUpdatePage.getSecondaryEmailInput()).to.eq(
      'secondaryEmail',
      'Expected SecondaryEmail value to be equals to secondaryEmail'
    );
    expect(await tenantUpdatePage.getOrganizationInput()).to.eq('organization', 'Expected Organization value to be equals to organization');
    expect(await tenantUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await tenantUpdatePage.getCreatedAtInput()).to.eq('2000-12-31', 'Expected createdAt value to be equals to 2000-12-31');
    expect(await tenantUpdatePage.getUpdatedByInput()).to.eq('updatedBy', 'Expected UpdatedBy value to be equals to updatedBy');
    expect(await tenantUpdatePage.getUpdatedAtInput()).to.eq('2000-12-31', 'Expected updatedAt value to be equals to 2000-12-31');
    await tenantUpdatePage.save();
    expect(await tenantUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tenantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Tenant', async () => {
    const nbButtonsBeforeDelete = await tenantComponentsPage.countDeleteButtons();
    await tenantComponentsPage.clickOnLastDeleteButton();

    tenantDeleteDialog = new TenantDeleteDialog();
    expect(await tenantDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Tenant?');
    await tenantDeleteDialog.clickOnConfirmButton();

    expect(await tenantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
