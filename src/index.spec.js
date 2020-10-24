import { shallowMount, config } from '@vue/test-utils'
import A11yDialog from 'a11y-dialog'
import { A11yDialog as VueA11yDialog } from './'

// Stubbing Vue 3's teleport
config.stubs.teleport = '<div><slot /></div>'

const isA11yDialogInstance = component => component instanceof A11yDialog

describe('VueA11yDialog', () => {
  const defaultProps = {
    id: 'app-dialog',
    appRoot: '#app',
    dialogRoot: '#dialog'
  }

  test('is a Vue instance', () => {
    const wrapper = shallowMount(VueA11yDialog, { propsData: defaultProps })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('default props are valid', () => {
    const wrapper = shallowMount(VueA11yDialog, {
      propsData: defaultProps
    })

    expect(wrapper.props().id).toBe('app-dialog')
    expect(wrapper.props().appRoot).toEqual('#app')
    expect(wrapper.props().dialogRoot).toEqual('#dialog')
    expect(wrapper.props().classNames).toEqual({})
    expect(wrapper.props().titleId).toBeUndefined()
    expect(wrapper.props().closeButtonLabel).toEqual('Close this dialog window')
    expect(wrapper.props().disableNative).toBe(false)
    expect(wrapper.props().role).toEqual('dialog')

    expect(wrapper.vm.fullTitleId).toBe('app-dialog-title')
    expect(wrapper.vm.dialogElement).toBe('dialog')
    expect(wrapper.vm.roleAttribute).toBe('dialog')
  })

  test('roleAttribute is always correct', () => {
    const wrapper = shallowMount(VueA11yDialog, {
      propsData: defaultProps
    })
    expect(wrapper.vm.roleAttribute).toBe('dialog')

    wrapper.setProps({ role: 'foo' })
    expect(wrapper.vm.roleAttribute).toBe('dialog')

    wrapper.setProps({ role: 'alertdialog' })
    expect(wrapper.vm.roleAttribute).toBe('alertdialog')
  })

  test('A11yDialog instance exists', async () => {
    const wrapper = shallowMount(VueA11yDialog, {
      propsData: defaultProps
    })

    expect(wrapper.vm.dialog).toEqual(null)
    expect(isA11yDialogInstance(wrapper.vm.dialog)).toBe(false)

    await wrapper.vm.$nextTick()

    expect(isA11yDialogInstance(wrapper.vm.dialog)).toBe(true)
    expect(wrapper.emitted('dialog-ref')).toBeTruthy()
    expect(isA11yDialogInstance(wrapper.emitted('dialog-ref')[0][0])).toBe(true)
  })

  test('A11yDialog instance methods called', async () => {
    const dialog = { hide: jest.fn(), destroy: jest.fn() }
    const wrapper = shallowMount(VueA11yDialog, {
      propsData: defaultProps
    })
    await wrapper.vm.$nextTick()

    wrapper.setData({ dialog })

    wrapper.vm.close()
    expect(dialog.hide).toHaveBeenCalled()
  })
})
