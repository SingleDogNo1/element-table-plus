<template>
  <div style="padding: 0 20px">
    <h3>多级表头表格</h3>
    <Table
      :data="tableData"
      :rowHeader="columns"
      :total="total"
      :currentPage="currentPage"
      @onPageChange="pageChange"
    >
      <template #date="{ row }">
        {{ new Date(row.date).toLocaleDateString() }}
      </template>
      <template #rate="{ row }">
        <Rate :number="row.rate" />
      </template>
    </Table>
  </div>
</template>

<script>
import Table from '@/components/Table'
import Rate from '@/components/rate.vue'
import { columns } from './columns'

export default {
  components: {
    Table,
    Rate
  },
  data() {
    return {
      columns,
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  created() {
    this.tableData = Array(52)
      .fill({
        date: 1609459200000,
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        rate: 3
      })
      .map((item, i) => {
        return { ...item, rate: i % 5 }
      })
    this.total = this.tableData.length
    this.columns = columns.call(this)
  },
  methods: {
    pageChange(page, size) {
      console.log('val :>> ', page, size)
    },
    selectionChange(row) {
      console.log('row :>> ', row)
    }
  }
}
</script>
