<template>
  <el-rate
    :value="number"
    :max="max"
    show-score
    text-color="#ff9900"
    :score-template="`${number.toFixed(1)}`"
  />
</template>

<script>
export default {
  props: ["value", "disabled", "number"],
  data() {
    return {
      max: 5.0
    };
  }
};
</script>
