import { element, by, ElementFinder } from 'protractor';

export class PermissionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-permission div table .btn-danger'));
  title = element.all(by.css('jhi-permission div h2#page-heading span')).first();

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

export class PermissionUpdatePage {
  pageTitle = element(by.id('jhi-permission-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameSelect = element(by.id('field_name'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNameSelect(name: string): Promise<void> {
    await this.nameSelect.sendKeys(name);
  }

  async getNameSelect(): Promise<string> {
    return await this.nameSelect.element(by.css('option:checked')).getText();
  }

  async nameSelectLastOption(): Promise<void> {
    await this.nameSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class PermissionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-permission-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-permission'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
