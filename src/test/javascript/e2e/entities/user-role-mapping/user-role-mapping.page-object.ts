import { element, by, ElementFinder } from 'protractor';

export class UserRoleMappingComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-role-mapping div table .btn-danger'));
  title = element.all(by.css('jhi-user-role-mapping div h2#page-heading span')).first();

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

export class UserRoleMappingUpdatePage {
  pageTitle = element(by.id('jhi-user-role-mapping-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  usersSelect = element(by.id('field_users'));
  userRoleSelect = element(by.id('field_userRole'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
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

  async userRoleSelectLastOption(): Promise<void> {
    await this.userRoleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userRoleSelectOption(option: string): Promise<void> {
    await this.userRoleSelect.sendKeys(option);
  }

  getUserRoleSelect(): ElementFinder {
    return this.userRoleSelect;
  }

  async getUserRoleSelectedOption(): Promise<string> {
    return await this.userRoleSelect.element(by.css('option:checked')).getText();
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

export class UserRoleMappingDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userRoleMapping-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userRoleMapping'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
