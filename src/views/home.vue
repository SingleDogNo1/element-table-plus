<template>
  <div>
    <BasicTable />
    <MultipleTable />
  </div>
</template>

<script>
import BasicTable from './basic'
import MultipleTable from './multiple'

export default {
  components: {
    BasicTable,
    MultipleTable
  }
}
</script>
