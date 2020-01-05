import { element, by, ElementFinder } from 'protractor';

export class DocumentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-document div table .btn-danger'));
  title = element.all(by.css('jhi-document div h2#page-heading span')).first();

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

export class DocumentUpdatePage {
  pageTitle = element(by.id('jhi-document-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  fileNameInput = element(by.id('field_fileName'));
  messageDigestInput = element(by.id('field_messageDigest'));
  fileInput = element(by.id('file_file'));
  expireAtInput = element(by.id('field_expireAt'));
  createdAtInput = element(by.id('field_createdAt'));
  workFlowSelect = element(by.id('field_workFlow'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setFileNameInput(fileName: string): Promise<void> {
    await this.fileNameInput.sendKeys(fileName);
  }

  async getFileNameInput(): Promise<string> {
    return await this.fileNameInput.getAttribute('value');
  }

  async setMessageDigestInput(messageDigest: string): Promise<void> {
    await this.messageDigestInput.sendKeys(messageDigest);
  }

  async getMessageDigestInput(): Promise<string> {
    return await this.messageDigestInput.getAttribute('value');
  }

  async setFileInput(file: string): Promise<void> {
    await this.fileInput.sendKeys(file);
  }

  async getFileInput(): Promise<string> {
    return await this.fileInput.getAttribute('value');
  }

  async setExpireAtInput(expireAt: string): Promise<void> {
    await this.expireAtInput.sendKeys(expireAt);
  }

  async getExpireAtInput(): Promise<string> {
    return await this.expireAtInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt: string): Promise<void> {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput(): Promise<string> {
    return await this.createdAtInput.getAttribute('value');
  }

  async workFlowSelectLastOption(): Promise<void> {
    await this.workFlowSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async workFlowSelectOption(option: string): Promise<void> {
    await this.workFlowSelect.sendKeys(option);
  }

  getWorkFlowSelect(): ElementFinder {
    return this.workFlowSelect;
  }

  async getWorkFlowSelectedOption(): Promise<string> {
    return await this.workFlowSelect.element(by.css('option:checked')).getText();
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

export class DocumentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-document-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-document'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
