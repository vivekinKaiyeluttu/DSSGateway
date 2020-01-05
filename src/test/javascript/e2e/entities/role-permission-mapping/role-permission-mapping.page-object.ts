import { element, by, ElementFinder } from 'protractor';

export class RolePermissionMappingComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-role-permission-mapping div table .btn-danger'));
  title = element.all(by.css('jhi-role-permission-mapping div h2#page-heading span')).first();

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

export class RolePermissionMappingUpdatePage {
  pageTitle = element(by.id('jhi-role-permission-mapping-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  userRoleSelect = element(by.id('field_userRole'));
  permissionSelect = element(by.id('field_permission'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
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

  async permissionSelectLastOption(): Promise<void> {
    await this.permissionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async permissionSelectOption(option: string): Promise<void> {
    await this.permissionSelect.sendKeys(option);
  }

  getPermissionSelect(): ElementFinder {
    return this.permissionSelect;
  }

  async getPermissionSelectedOption(): Promise<string> {
    return await this.permissionSelect.element(by.css('option:checked')).getText();
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

export class RolePermissionMappingDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-rolePermissionMapping-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-rolePermissionMapping'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
