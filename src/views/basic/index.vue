<template>
  <div style="padding: 0 20px">
    <h3>基础表格</h3>
    <div style="margin-bottom: 10px">
      <el-checkbox v-model="config.stripe">带斑马纹</el-checkbox>
      <el-checkbox v-model="config.border">带纵向边框</el-checkbox>
      <el-checkbox v-model="config.fixHeight">固定高度 200px(固定表头滚动)</el-checkbox>
      <el-checkbox disabled v-model="config.maxHeight">
        最大高度设置为 499px, 修改每页条数查看效果
      </el-checkbox>
      <br />
      <br />
      <el-button @click="toggleSetCurrent(1)">单选状态下,选中第二条</el-button>
      <el-button @click="toggleSetCurrent()">取消选择</el-button>
      <br />
      <br />
      <el-checkbox v-model="config.selection">多选</el-checkbox>
      <el-button @click="selectionRows([1, 3])" style="margin-left: 10px">选择 2/4 行</el-button>
      <el-button @click="selectionRows()">多选取消所有选项</el-button>
    </div>

    <Table
      :data="tableData"
      :rowHeader="columns"
      :total="total"
      :selection="config.selection"
      :stripe="config.stripe"
      :border="config.border"
      :height="config.fixHeight ? '200' : '499'"
      :maxHeight="499"
      :currentPage="currentPage"
      @onPageChange="pageChange"
      @currentChange="handleCurrentChange"
      @selectionChange="handleSelectionChange"
      ref="basicTable"
    />
  </div>
</template>

<script>
import Table from '@/components/Table'

export default {
  components: { Table },
  data() {
    return {
      config: {
        stripe: false,
        border: false,
        fixHeight: false,
        maxHeight: true,
        selection: false
      },
      columns: [
        {
          prop: 'date',
          label: '日期',
          width: '400px'
        },
        {
          prop: 'name',
          label: '姓名',
          width: '400px'
        },
        {
          prop: 'address',
          label: '地址',
          width: '400px'
        },
        {
          prop: 'sex',
          label: '性别',
          width: '400px'
        },
        {
          prop: 'age',
          label: '年龄',
          width: '400px',
          fixed: 'right'
        }
      ],
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  created() {
    this.tableData = Array(31)
      .fill({})
      .map((_item, i) => {
        return {
          date: '2021-01-' + (i + 1),
          name: '王小虎' + (i + 1),
          address: `上海市普陀区金沙江路 15${i + 1} 弄`,
          sex: i % 2 === 0 ? '男' : '女',
          age: i + 1
        }
      })

    this.total = this.tableData.length
  },
  methods: {
    pageChange(page, size) {
      console.log('val :>> ', page, size)
    },
    selectionChange(row) {
      console.log('row :>> ', row)
    },
    selectionRows(rows) {
      this.$refs.basicTable.toggleRowSelection(rows)
    },
    handleCurrentChange(row) {
      console.log('选中当前行发生变化 :>> ', row)
    },
    toggleSetCurrent(row) {
      this.$refs.basicTable.setCurrentRow(row)
    },
    handleSelectionChange(row) {
      console.log('多选列表选择项发生变化 :>> ', row)
    }
  }
}
</script>
