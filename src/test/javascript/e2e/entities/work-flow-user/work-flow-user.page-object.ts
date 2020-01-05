import { element, by, ElementFinder } from 'protractor';

export class WorkFlowUserComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-work-flow-user div table .btn-danger'));
  title = element.all(by.css('jhi-work-flow-user div h2#page-heading span')).first();

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

export class WorkFlowUserUpdatePage {
  pageTitle = element(by.id('jhi-work-flow-user-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  stepInput = element(by.id('field_step'));
  workFlowSelect = element(by.id('field_workFlow'));
  usersSelect = element(by.id('field_users'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setStepInput(step: string): Promise<void> {
    await this.stepInput.sendKeys(step);
  }

  async getStepInput(): Promise<string> {
    return await this.stepInput.getAttribute('value');
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

export class WorkFlowUserDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-workFlowUser-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-workFlowUser'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
