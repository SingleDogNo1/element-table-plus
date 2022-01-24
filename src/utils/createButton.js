import { MessageBox } from 'element-ui'

export function useElButton() {
  /**
   * 创建 el-button 删除按钮
   * @param {Function} createElement 创建节点的钩子函数(必填)
   * @param {Function} callback 点击按钮的回调
   * @param {Object} attrs el-button 的属性(禁用/loading等)
   * @returns 返回整个按钮节点
   */
  function createDelButton(createElement, callback, attrs) {
    return createElement('el-button', {
      attrs: { type: 'text', size: 'medium', ...attrs },
      domProps: { innerHTML: '删除' },
      on: {
        click: () => {
          MessageBox.confirm('是否确认删除此行数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              callback()
            })
            .catch(() => {})
        }
      }
    })
  }

  /**
   * 创建 el-button 按钮
   * @param {Function} createElement 创建节点的钩子函数(必填)
   * @param {String | HTMLElement} text 按钮显示的文字,也可以是 html 节点
   * @param {Function} callback 点击按钮的回调
   * @param {Object} attrs el-button 的属性(禁用/loading等)
   * @returns 返回整个按钮节点
   */
  function createButton(createElement, text, callback, attrs = {}) {
    return createElement('el-button', {
      attrs: { type: 'text', size: 'medium', ...attrs },
      domProps: { innerHTML: text },
      on: {
        click: () => {
          callback()
        }
      }
    })
  }

  /**
   * 创建 el-dropdown 按钮组
   * @param {Function} createElement 创建节点的钩子函数(必填)
   * @param {Array} dropdownList 下拉菜单, 详见 createDropDownItem 参数
   * @param {Function} callback 点击菜单项触发的回调
   * @param {String} dropdownText 下拉按钮显示的文字
   * @returns 返回整个下拉菜单组件
   */
  function createDropDown(createElement, dropdownList, callback, dropdownText = '更多') {
    const dropdownItems = dropdownList.reduce((res, pre) => {
      res.push(createDropDownItem(createElement, pre.attrs, pre.text))
      return res
    }, [])

    return createElement(
      'el-dropdown',
      {
        style: { marginLeft: '10px' },
        on: {
          command: command => {
            callback(command)
          }
        }
      },
      [
        createElement('div', [
          createElement('el-button', {
            attrs: { size: 'medium', type: 'text' },
            domProps: { innerHTML: dropdownText },
            class: 'el-dropdown-link'
          }),
          createElement('i', {
            class: 'el-icon-arrow-down el-icon--right',
            style: { fontSize: '12px' }
          })
        ]),

        createElement(
          'el-dropdown-menu',
          {
            slot: 'dropdown'
          },
          [dropdownItems]
        )
      ]
    )
  }

  /**
   * 创建 el-dropdown-item 菜单项
   * @param {Function} createElement 创建节点的钩子函数(必填)
   * @param {Object} attrs 菜单项的属性,element-ui dropDownItem 属性均可, command 属性为必填
   * @param {String} text 菜单项显示文字,必填
   * @returns 返回 el-dropdown-item 菜单项
   */
  function createDropDownItem(createElement, attrs, text) {
    return createElement('el-dropdown-item', {
      attrs: { disabled: false, ...attrs },
      domProps: { innerHTML: text }
    })
  }

  return {
    createDelButton,
    createButton,
    createDropDown
  }
}
