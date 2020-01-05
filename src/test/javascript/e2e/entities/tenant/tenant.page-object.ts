import { element, by, ElementFinder } from 'protractor';

export class TenantComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tenant div table .btn-danger'));
  title = element.all(by.css('jhi-tenant div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class TenantUpdatePage {
  pageTitle = element(by.id('jhi-tenant-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  domainInput = element(by.id('field_domain'));
  primaryEmailInput = element(by.id('field_primaryEmail'));
  secondaryEmailInput = element(by.id('field_secondaryEmail'));
  organizationInput = element(by.id('field_organization'));
  createdByInput = element(by.id('field_createdBy'));
  createdAtInput = element(by.id('field_createdAt'));
  updatedByInput = element(by.id('field_updatedBy'));
  updatedAtInput = element(by.id('field_updatedAt'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDomainInput(domain: string): Promise<void> {
    await this.domainInput.sendKeys(domain);
  }

  async getDomainInput(): Promise<string> {
    return await this.domainInput.getAttribute('value');
  }

  async setPrimaryEmailInput(primaryEmail: string): Promise<void> {
    await this.primaryEmailInput.sendKeys(primaryEmail);
  }

  async getPrimaryEmailInput(): Promise<string> {
    return await this.primaryEmailInput.getAttribute('value');
  }

  async setSecondaryEmailInput(secondaryEmail: string): Promise<void> {
    await this.secondaryEmailInput.sendKeys(secondaryEmail);
  }

  async getSecondaryEmailInput(): Promise<string> {
    return await this.secondaryEmailInput.getAttribute('value');
  }

  async setOrganizationInput(organization: string): Promise<void> {
    await this.organizationInput.sendKeys(organization);
  }

  async getOrganizationInput(): Promise<string> {
    return await this.organizationInput.getAttribute('value');
  }

  async setCreatedByInput(createdBy: string): Promise<void> {
    await this.createdByInput.sendKeys(createdBy);
  }

  async getCreatedByInput(): Promise<string> {
    return await this.createdByInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt: string): Promise<void> {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput(): Promise<string> {
    return await this.createdAtInput.getAttribute('value');
  }

  async setUpdatedByInput(updatedBy: string): Promise<void> {
    await this.updatedByInput.sendKeys(updatedBy);
  }

  async getUpdatedByInput(): Promise<string> {
    return await this.updatedByInput.getAttribute('value');
  }

  async setUpdatedAtInput(updatedAt: string): Promise<void> {
    await this.updatedAtInput.sendKeys(updatedAt);
  }

  async getUpdatedAtInput(): Promise<string> {
    return await this.updatedAtInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class TenantDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tenant-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tenant'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
