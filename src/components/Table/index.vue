<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :height="height"
      :max-height="maxHeight"
      :size="size"
      :stripe="stripe"
      :border="border"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :header-cell-class-name="headerCellClassName"
      :header-cell-style="headerCellStyle"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :row-key="rowKey"
      :show-summary="showSummary"
      :summary-method="getSummaryMethod"
      :span-method="spanMethod"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      highlight-current-row
      ref="tableDataRef"
      style="width: 100%"
    >
      <el-table-column v-if="selection" type="selection" width="60" fixed align="center" />
      <el-table-column
        label="序号"
        type="index"
        width="60"
        fixed
        align="center"
        :index="genIndexNumber"
      />
      <Column
        v-for="(column, index) in rowHeader"
        :key="'tableColumn_' + index"
        :column="column"
        :parentKey="'tableColumn_' + index"
      >
        <div :slot="column.slot" slot-scope="{ row }">
          <slot :name="column.slot" :row="row"></slot>
        </div>
      </Column>
    </el-table>
    <el-pagination
      v-if="!pagination"
      :size="size"
      :total="total"
      :current-page="page"
      :page-sizes="pageSizes"
      :page-size="pageSizeCount"
      background
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<script>
import Column from './column.vue'

export default {
  components: { Column },
  props: {
    headerRowClassName: {
      default: function () {}
    },
    headerRowStyle: {
      default: function () {}
    },
    headerCellClassName: {
      default: function () {}
    },
    rowClassName: {
      default: function () {}
    },
    rowStyle: {
      default: function () {}
    },
    cellClassName: {
      default: function () {}
    },
    cellStyle: {
      default: function () {}
    },
    size: {
      validator: value => ['medium', 'small', 'mini'].includes(value),
      default: 'medium'
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    expandRowKeys: {
      type: Array,
      default: null
    },
    rowKey: {
      default: null
    },
    getSummaryMethod: {
      default: function () {}
    },
    showSummary: {
      default: false
    },
    spanMethod: { default: null },
    selectionChange: {
      default: ''
    },
    border: {
      default: false
    },
    selection: {
      type: Boolean,
      default: false
    },
    stripe: { default: false },
    pagination: {
      default: false
    },
    height: { default: null },
    maxHeight: {
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 表格数据
    data: {
      type: Array,
      default: () => []
    },
    // 表头数据
    rowHeader: {
      type: Array,
      default: () => []
    },
    total: {
      default: null,
      type: Number
    },
    currentPage: {
      default: 1
    },
    doLayout: {
      default: false
    },
    headerCellStyle: {
      default: () => ({ background: '#F7F7F7', color: '#000' })
    },
    pageSize: {
      default: 10
    },
    pageSizes: {
      default: () => [10, 20, 30, 50]
    }
  },
  data() {
    return {
      page: 1,
      pageSizeCount: 10,
      tableData: []
    }
  },
  watch: {
    data: {
      handler() {
        this.initData()
        this.$nextTick(() => {
          if (this.doLayout) {
            // 触发重新计算布局
            this.$refs.tableDataRef.doLayout()
          }
        })
      },
      deep: true
    }
  },
  //方法集合
  methods: {
    genIndexNumber(index) {
      return this.pageSizeCount * (this.page - 1) + index + 1
    },
    initData() {
      this.pageSizeCount = this.pageSize
      this.page = this.currentPage
      if (this.pagination) {
        this.tableData = this.data
      } else {
        console.log(this.page, this.pageSizeCount)
        this.pageAutoChange(this.page, this.pageSizeCount)
      }
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex === 0) {
        return 'warning-row table-header-0'
      } else if (rowIndex === 1) {
        return 'success-row'
      }
      return ''
    },
    handlePageSizeChange(size) {
      this.pageSizeCount = size
      this.pageAutoChange(this.page, size)
      this.$emit('onPageChange', this.page, size)
    },
    handleCurrentPageChange(val) {
      this.page = val
      this.pageAutoChange(val, this.pageSizeCount)
      this.$emit('onPageChange', val, this.pageSizeCount)
    },
    pageAutoChange(page, pageSize) {
      if (this.data.length && this.data.length > pageSize) {
        let start = (page - 1) * pageSize
        let end = (page - 1) * pageSize + pageSize
        this.tableData = JSON.parse(JSON.stringify(this.data)).slice(start, end)
      } else {
        this.tableData = JSON.parse(JSON.stringify(this.data))
      }
    },
    handleSelectionChange(row) {
      console.log('handleSelectionChange:>> ', row)
      this.$emit('selectionChange', row)
    },
    handleCurrentChange(row) {
      this.$emit('currentChange', row)
    },
    setCurrentRow(row) {
      console.log('row :>> ', JSON.stringify(row) === JSON.stringify(this.tableData[1]))
      this.$refs.tableDataRef.setCurrentRow(this.tableData[1])
      this.$refs.tableDataRef.setCurrentRow(row)
    },
    toggleRowSelection() {
      this.$refs.tableDataRef.toggleRowSelection.apply(this.$refs.tableDataRef, arguments)
    }
  },
  created() {
    this.initData()
  }
}
</script>

<style scoped>
>>> .el-pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
