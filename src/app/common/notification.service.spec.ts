import { RuleService } from '../rule/common/rule.service';
import { async, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { NotificationService } from './notification.service';

class MockedSnackBar {
  open(message: string, action?: string, config?: any): any { /** mocked **/
  }
}

describe('RuleService', () => {
  let notificationService: NotificationService;
  let snackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      providers: [
        { provide: MatSnackBar, useClass: MockedSnackBar },
        NotificationService
      ]
    });
  }));

  beforeEach(() => {
    notificationService = TestBed.get(NotificationService);
    snackBar = TestBed.get(MatSnackBar);

    spyOn(snackBar, 'open');
  });

  it('should create service', () => {
    expect(notificationService).toBeDefined();
  });

  it('should execute success notification', () => {
    const successMsg = 'Success :)';
    notificationService.notifySuccess(successMsg);

    const actualParams = (snackBar.open as any).calls.mostRecent().args;

    expect(snackBar.open).toHaveBeenCalled();
    expect(actualParams[0]).toEqual(successMsg);
    expect(actualParams[2].extraClasses).toEqual(['success']);
  });

  it('should execute error notification', () => {
    const errorMsg = 'Error :(';
    notificationService.notifyError(errorMsg);

    const actualParams = (snackBar.open as any).calls.mostRecent().args;

    expect(snackBar.open).toHaveBeenCalled();
    expect(actualParams[0]).toEqual(errorMsg);
    expect(actualParams[2].extraClasses).toEqual(['error']);
  });

  it('should execute alert notification', () => {
    const alertMsg = 'Alert :O';
    notificationService.notifyAlert(alertMsg);

    const actualParams = (snackBar.open as any).calls.mostRecent().args;

    expect(snackBar.open).toHaveBeenCalled();
    expect(actualParams[0]).toEqual(alertMsg);
    expect(actualParams[2].extraClasses).toEqual(['warn']);
  });
});
