import { element, by, ElementFinder } from 'protractor';

export class UsersComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-users div table .btn-danger'));
  title = element.all(by.css('jhi-users div h2#page-heading span')).first();

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

export class UsersUpdatePage {
  pageTitle = element(by.id('jhi-users-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  firstNameInput = element(by.id('field_firstName'));
  lastNameInput = element(by.id('field_lastName'));
  emailInput = element(by.id('field_email'));
  passwordInput = element(by.id('field_password'));
  verifiedInput = element(by.id('field_verified'));
  challengeTokenInput = element(by.id('field_challengeToken'));
  workFlowInitiateInput = element(by.id('field_workFlowInitiate'));
  createdByInput = element(by.id('field_createdBy'));
  createdAtInput = element(by.id('field_createdAt'));
  updatedByInput = element(by.id('field_updatedBy'));
  updatedAtInput = element(by.id('field_updatedAt'));
  tenantSelect = element(by.id('field_tenant'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setFirstNameInput(firstName: string): Promise<void> {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput(): Promise<string> {
    return await this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName: string): Promise<void> {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput(): Promise<string> {
    return await this.lastNameInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setPasswordInput(password: string): Promise<void> {
    await this.passwordInput.sendKeys(password);
  }

  async getPasswordInput(): Promise<string> {
    return await this.passwordInput.getAttribute('value');
  }

  getVerifiedInput(): ElementFinder {
    return this.verifiedInput;
  }
  async setChallengeTokenInput(challengeToken: string): Promise<void> {
    await this.challengeTokenInput.sendKeys(challengeToken);
  }

  async getChallengeTokenInput(): Promise<string> {
    return await this.challengeTokenInput.getAttribute('value');
  }

  getWorkFlowInitiateInput(): ElementFinder {
    return this.workFlowInitiateInput;
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

  async tenantSelectLastOption(): Promise<void> {
    await this.tenantSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tenantSelectOption(option: string): Promise<void> {
    await this.tenantSelect.sendKeys(option);
  }

  getTenantSelect(): ElementFinder {
    return this.tenantSelect;
  }

  async getTenantSelectedOption(): Promise<string> {
    return await this.tenantSelect.element(by.css('option:checked')).getText();
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

export class UsersDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-users-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-users'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
