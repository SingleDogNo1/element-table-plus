<template>
  <el-table-column
    :sortable="column.sortable ? column.sortable : false"
    :align="column.align || 'center'"
    :header-align="column.hAlign || 'center'"
    :prop="column.prop"
    :width="column.width || ''"
    :min-width="column.minWidth || ''"
    :fixed="column.fixed || false"
    :label="column.label"
    :type="column.type"
    :column-key="column.columnKey"
    :render-header="column.renderHeader"
  >
    <template v-if="isMulColumn">
      <HeadCol
        v-for="(column, index) in column.children"
        :key="parentKey + '_' + index"
        :column="column"
        :parentKey="parentKey + '_' + index"
      >
        <div :slot="column.slot" slot-scope="{ row }">
          {{ row }}
          <slot :name="column.slot" :row="row"></slot>
        </div>
      </HeadCol>
    </template>
    <template slot-scope="scope">
      <div v-if="column.render">
        <CellRender :column="column" :row="scope.row" :render="column.render" />
      </div>
      <div v-else-if="column.formatter">
        {{ column.formatter(scope.row, scope.column, scope.row[column.prop]) }}
      </div>
      <div v-else-if="column.slot">
        <slot :name="column.slot" :row="scope.row"></slot>
      </div>
      <div v-else>
        {{ scope.row[column.prop] }}
      </div>
    </template>
  </el-table-column>
</template>

<script>
import CellRender from './cellRender.vue'
export default {
  name: 'HeadCol',
  components: {
    CellRender
  },
  props: ['column', 'parentKey'],
  computed: {
    isMulColumn() {
      const col = this.column
      let isMulColumn
      if (col.children && col.children.length) {
        isMulColumn = true
      } else {
        isMulColumn = false
      }
      return isMulColumn
    }
  }
}
</script>
