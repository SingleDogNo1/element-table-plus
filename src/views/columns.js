import Starts from '@/components/rate.vue'

export const columns = function () {
  return [
    { prop: 'id', label: '序号', width: '50', fixed: true },
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
          align: 'center',
          minWidth: 200,
          render: (h, record, index, columnItem) => {
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
      align: 'left',
      minWidth: 150,
      render: (h, record) => {
        // https://cn.vuejs.org/v2/guide/render-function.html
        return h({
          render: createElement => {
            return createElement('div', [
              createElement('el-button', {
                attrs: { plain: true, size: 'small' },
                on: {
                  click: () => {
                    this.$confirm('是否确认删除此行数据?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    })
                      .then(() => {
                        console.log('delete :>> ', record)
                      })
                      .catch(() => {})
                  }
                },
                domProps: {
                  innerHTML: '删除'
                }
              }),
              createElement('el-button', {
                attrs: { plain: true, size: 'small' },
                domProps: {
                  innerHTML: '编辑'
                },
                on: {
                  click: () => {
                    console.log('edit :>> ', record)
                  }
                }
              })
            ])
          }
        })
      }
    }
  ]
}
