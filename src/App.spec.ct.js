import { mount } from '@cypress/vue'
import App from './App.vue'

describe('App', () => {
  it('shows App with trigger buttons', () => {
    mount(App)
      .get('h1').contains('Dialog Test')
      .get('[data-a11y-dialog-show="a11y-dialog"]')
      .get('[data-test-id="dialogRefBtn"]')
      .get('[data-test-id="dataA11yBtn"]')
  })
})

describe('dialog', () => {
  it('should focus the first element in the dialog on open', () => {
    mount(App)
    .get('[data-test-id="dialogRefBtn"]')
    .click()
    .get('[role="dialog"]').should('have.focus')
  })
  
  it('should open and close dialog via data-a11y-dialog-show trigger', () => {
    mount(App)
    .get('[data-test-id="dialogRefBtn"]').click()
    .get('[role="document"]')
    .should('be.visible')
    .get('[data-test-id="dialogTitle"]').contains('A11yDialog Test')
    .get('.dialog-close').click()
    .get('[role="document"]')
    .should('not.be.visible')
  });

  it('should open dialog via dialogRefBtn trigger', () => {
    mount(App)
      .get('[data-test-id="dialogRefBtn"]').click()
      .get('.dialog-overlay')
      .get('[role="document"]')
      .should('be.visible')
  });

  it('should restore focus to previously focused element', () => {
    mount(App)
    .get('[data-test-id="dialogRefBtn"]').click()
    .get('[role="document"]')
    .should('be.visible')
    .get('.dialog-close').click()
    .get('[data-test-id="dialogRefBtn"]').should('have.focus')
  });

  it('should take close position', () => {
    mount(App)
    .get('[data-test-id="useClosePositionFirst"]').click()
    .get('[role="document"]')
    .should('be.visible')
  })
});

describe('aria', () => {
  it('should have container with aria labelledby of title id', () => {
    mount(App)
      .get('[data-test-id="dialogRefBtn"]').click()
      .get('[role="dialog"][aria-labelledby="uniqueTitleId"]')
  });

  it('should have close button aria label', () => {
    mount(App)
      .get('[data-test-id="dialogRefBtn"]').click()
      .get('.dialog-close[aria-label="My close button label"]')
  });

  it('should set aria-hidden to false when opened', () => {
    mount(App)
      .get('[role="dialog"][aria-modal]').should('exist')
      .get('[role="dialog"][aria-hidden]').should('exist')
      .get('[data-test-id="dialogRefBtn"]').click()
      .get('[role="dialog"][aria-hidden]').should('not.exist')
  });
});

describe('alertdialog', () => {
  it('should use alertdialog role', () => {
    mount(App)
    .get('[data-test-id="useAlertDialogRole"]').click()
    .get('[role="alertdialog"]').should('have.focus')
  });
});
