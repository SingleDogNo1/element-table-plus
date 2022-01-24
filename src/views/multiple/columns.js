import Starts from '@/components/rate.vue'
import { useElButton } from '@/utils/createButton'

const { createButton, createDelButton, createDropDown } = useElButton()

export const columns = function () {
  return [
    {
      prop: 'date',
      label: '日期(render函数)',
      render: (h, record) => {
        return h('span', {
          domProps: {
            innerHTML: new Date(record.date).toLocaleDateString()
          }
        })
      }
    },
    {
      prop: 'date',
      label: '日期(插槽)',
      slot: 'date'
    },
    {
      label: '配送信息',
      children: [
        { prop: 'name', label: '姓名', align: 'center' },
        {
          prop: 'rate',
          label: '用户信用度',
          minWidth: 200,
          render: (h, record, _index, columnItem) => {
            let number = record[columnItem.prop]
            return h(Starts, {
              props: {
                number
              }
            })
          }
        },
        {
          prop: '',
          label: '地址',
          children: [
            {
              prop: 'province',
              label: '省'
            },
            {
              prop: 'city',
              label: '市'
            },
            {
              prop: 'address',
              label: '地址',
              minWidth: 300
            }
          ]
        }
      ]
    },
    {
      label: '操作',
      minWidth: '200',
      fixed: 'right',
      render: (h, record) => {
        return h({
          render: createElement => {
            // 创建按钮组父组件
            return createElement('div', [
              // 创建删除按钮
              createDelButton(
                createElement,
                () => {
                  this.handleDelete(record)
                },
                {
                  disabled: record.editable
                }
              ),
              // 创建普通按钮
              createButton(
                createElement,
                '编辑',
                () => {
                  this.handleEdit(record)
                },
                {
                  disabled: record.editable
                }
              ),
              // 创建下拉菜单
              createDropDown(
                createElement,
                [
                  {
                    attrs: {
                      command: 'show',
                      disabled: record.editable
                    },
                    text: '查看'
                  },
                  {
                    attrs: {
                      command: 'download',
                      disabled: record.editable
                    },
                    text: '下载'
                  }
                ],
                command => {
                  console.log('command, record :>> ', command, record)
                }
              )
            ])
          }
        })
      }
    }
  ]
}
