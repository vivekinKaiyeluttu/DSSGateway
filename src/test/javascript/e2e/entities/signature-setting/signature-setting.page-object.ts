import { element, by, ElementFinder } from 'protractor';

export class SignatureSettingComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-signature-setting div table .btn-danger'));
  title = element.all(by.css('jhi-signature-setting div h2#page-heading span')).first();

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

export class SignatureSettingUpdatePage {
  pageTitle = element(by.id('jhi-signature-setting-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  signAsInput = element(by.id('field_signAs'));
  designationInput = element(by.id('field_designation'));
  imageInput = element(by.id('file_image'));
  defaultSignatureInput = element(by.id('field_defaultSignature'));
  addressInput = element(by.id('field_address'));
  createdAtInput = element(by.id('field_createdAt'));
  updatedAtInput = element(by.id('field_updatedAt'));
  usersSelect = element(by.id('field_users'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setSignAsInput(signAs: string): Promise<void> {
    await this.signAsInput.sendKeys(signAs);
  }

  async getSignAsInput(): Promise<string> {
    return await this.signAsInput.getAttribute('value');
  }

  async setDesignationInput(designation: string): Promise<void> {
    await this.designationInput.sendKeys(designation);
  }

  async getDesignationInput(): Promise<string> {
    return await this.designationInput.getAttribute('value');
  }

  async setImageInput(image: string): Promise<void> {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput(): Promise<string> {
    return await this.imageInput.getAttribute('value');
  }

  getDefaultSignatureInput(): ElementFinder {
    return this.defaultSignatureInput;
  }
  async setAddressInput(address: string): Promise<void> {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput(): Promise<string> {
    return await this.addressInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt: string): Promise<void> {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput(): Promise<string> {
    return await this.createdAtInput.getAttribute('value');
  }

  async setUpdatedAtInput(updatedAt: string): Promise<void> {
    await this.updatedAtInput.sendKeys(updatedAt);
  }

  async getUpdatedAtInput(): Promise<string> {
    return await this.updatedAtInput.getAttribute('value');
  }

  async usersSelectLastOption(): Promise<void> {
    await this.usersSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async usersSelectOption(option: string): Promise<void> {
    await this.usersSelect.sendKeys(option);
  }

  getUsersSelect(): ElementFinder {
    return this.usersSelect;
  }

  async getUsersSelectedOption(): Promise<string> {
    return await this.usersSelect.element(by.css('option:checked')).getText();
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

export class SignatureSettingDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-signatureSetting-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-signatureSetting'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
