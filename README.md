# el-table-plus

## 介绍

对 Element-UI 的 el-table 进行二次封装

> 需要全局引入`element-ui`

## 使用说明

本地运行查看示例

## API

> 所有 `element-ui Table` 配置均可使用

### Table Props

|        属性         |       类型        | 默认值 |    可选值    |                说明                 |
| :-----------------: | :---------------: | :----: | :----------: | :---------------------------------: |
|        data         |       Array       |   -    |      -       |              表格数据               |
|       height        | Nullable<Number>  |  null  |    number    |   table 高度,超过高度表头锁定滚动   |
|      maxHeight      | Nullable<Number>  |  null  |    number    | table 最大高度,超过高度表头锁定滚动 |
|       stripe        |      Boolean      | false  |     true     |          是否显示为斑马纹           |
|       border        |      Boolean      | false  |     true     |          是否显示纵向边框           |
|        size         |      String       | medium | small / mini |              表格尺寸               |
|      rowHeader      |       Array       |   -    |      -       |              表头数据               |
|       loading       |      Boolean      | false  |     true     |        表格是否为加载中状态         |
|    rowClassName     | Function / String |   -    |      -       |         同 element-ui 参数          |
|      rowStyle       | Function / String |   -    |      -       |         同 element-ui 参数          |
|    cellClassName    | Function / String |   -    |      -       |         同 element-ui 参数          |
|      cellStyle      | Function / String |   -    |      -       |         同 element-ui 参数          |
| headerRowClassName  | Function / String |   -    |      -       |         同 element-ui 参数          |
|   headerRowStyle    | Function / String |   -    |      -       |         同 element-ui 参数          |
| headerCellClassName | Function / String |   -    |      -       |         同 element-ui 参数          |
|   headerCellStyle   | Function / String |   -    |      -       |         同 element-ui 参数          |
|       rowKey        | Function / String |   -    |      -       |         同 element-ui 参数          |
|  defaultExpandAll   |      Boolean      | false  |     true     |         同 element-ui 参数          |
|    expandRowKeys    |       Array       |   -    |      -       |         同 element-ui 参数          |
|    tooltipEffect    |      String       |   -    |  dark/light  |         同 element-ui 参数          |
|     showSummary     |      Boolean      | false  |     true     |        是否在表尾显示合计行         |
|  getSummaryMethod   |     Function      |   -    |      -       |        自定义的合计计算方法         |
|     spanMethod      |     Function      |   -    |      -       |        合并行或列的计算方法         |
|     pagination      |      Boolean      |  true  |    false     |           是否需要分页器            |
|     currentPage     |      Number       |   1    |      -       |         分页器当前在第几页          |
|        total        |      Number       |   -    |      -       |     表格信息的总条数,用于分页器     |

### Table Methods

|   属性    |       类型       | 默认值 | 可选值 |                说明                 |
| :-------: | :--------------: | :----: | :----: | :---------------------------------: |
|   data    |      Array       |   -    |   -    |              表格数据               |
|  height   | Nullable<Number> |  null  | number |   table 高度,超过高度表头锁定滚动   |
| maxHeight | Nullable<Number> |  null  | number | table 最大高度,超过高度表头锁定滚动 |
|  stripe   |     Boolean      | false  |  true  |          是否显示为斑马纹           |

```js

/*

selectionChange         当选择项发生变化时会触发该事件


@onPageChange =(page,pageSize)=>{
               //接受组件 翻页,或者 pageSize 变动的消息;
}

pageSizes  //可不传 default: () => [10, 20, 50, 100] //默认值.代表可选择的每页数据数量

total=1000; //type: Number // 分页时必传 后台数据 的总条数; 为 0 ,无法分页
currentPage="1" // 分页必传 不然分页会一致在第一页
pageSize="10" // 可不传 默认每页 10 条 */
```

## columns.js

```javascript
export const columns = function() {
  return [
    { prop: "id", label: "序号", align: "left", fixed: "left" },
    {
      prop: "date",
      label: "日期",
      align: "left",
      formatter: (record, column, text) => {
        return text;
      },
    },
    {
      label: "配送信息",
      children: [
        { prop: "name", label: "姓名", align: "center" },
        {
          prop: "rate",
          label: "用户信用度",
          align: "center",
          render: this.startRender,
        },
        {
          prop: "",
          label: "地址",
          children: [
            {
              prop: "province",
              label: "省",
            },
            {
              prop: "city",
              label: "市",
            },
            {
              prop: "address",
              label: "地址",
              minWidth: 300,
            },
          ],
        },
      ],
    },
    {
      prop: "do",
      label: "操作",
      align: "left",
      minWidth: 150,
      render: this.deleteRecord,
    },
  ];
};
```
