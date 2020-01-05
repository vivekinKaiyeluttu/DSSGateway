import { element, by, ElementFinder } from 'protractor';

export class DocumentSignatureComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-document-signature div table .btn-danger'));
  title = element.all(by.css('jhi-document-signature div h2#page-heading span')).first();

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

export class DocumentSignatureUpdatePage {
  pageTitle = element(by.id('jhi-document-signature-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  validFromInput = element(by.id('field_validFrom'));
  validToInput = element(by.id('field_validTo'));
  deviceIdInput = element(by.id('field_deviceId'));
  signatureInput = element(by.id('field_signature'));
  createdAtInput = element(by.id('field_createdAt'));
  documentSelect = element(by.id('field_document'));
  workFlowUserSelect = element(by.id('field_workFlowUser'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setValidFromInput(validFrom: string): Promise<void> {
    await this.validFromInput.sendKeys(validFrom);
  }

  async getValidFromInput(): Promise<string> {
    return await this.validFromInput.getAttribute('value');
  }

  async setValidToInput(validTo: string): Promise<void> {
    await this.validToInput.sendKeys(validTo);
  }

  async getValidToInput(): Promise<string> {
    return await this.validToInput.getAttribute('value');
  }

  async setDeviceIdInput(deviceId: string): Promise<void> {
    await this.deviceIdInput.sendKeys(deviceId);
  }

  async getDeviceIdInput(): Promise<string> {
    return await this.deviceIdInput.getAttribute('value');
  }

  async setSignatureInput(signature: string): Promise<void> {
    await this.signatureInput.sendKeys(signature);
  }

  async getSignatureInput(): Promise<string> {
    return await this.signatureInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt: string): Promise<void> {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput(): Promise<string> {
    return await this.createdAtInput.getAttribute('value');
  }

  async documentSelectLastOption(): Promise<void> {
    await this.documentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async documentSelectOption(option: string): Promise<void> {
    await this.documentSelect.sendKeys(option);
  }

  getDocumentSelect(): ElementFinder {
    return this.documentSelect;
  }

  async getDocumentSelectedOption(): Promise<string> {
    return await this.documentSelect.element(by.css('option:checked')).getText();
  }

  async workFlowUserSelectLastOption(): Promise<void> {
    await this.workFlowUserSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async workFlowUserSelectOption(option: string): Promise<void> {
    await this.workFlowUserSelect.sendKeys(option);
  }

  getWorkFlowUserSelect(): ElementFinder {
    return this.workFlowUserSelect;
  }

  async getWorkFlowUserSelectedOption(): Promise<string> {
    return await this.workFlowUserSelect.element(by.css('option:checked')).getText();
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

export class DocumentSignatureDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-documentSignature-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-documentSignature'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
