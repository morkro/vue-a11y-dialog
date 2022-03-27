import { mount } from '@cypress/vue'
import AlertDialog from './AlertDialog.vue'

/**
 * We need to test the alertdialog behavior in its own fixture as the low-level a11y-dialog
 * will eval the data attributes as soon as instantiation time happens (as such, the `role`
 * prop is not reactive in that you can remove `data-a11y-dialog-hide` after the fact.)
 */
describe('alertdialog', () => {
  it('should use alertdialog role', () => {
    mount(AlertDialog)
      .get('[data-test-id="dialogRefBtn"]')
      .click()
      .get('[role="alertdialog"]')
      .should('have.focus')
      .get('.dialog-overlay[data-a11y-dialog-hide]')
      .should('not.exist')
  })
})
