<template>
  <price-range
    :min="Number(minValue.VALUE)"
    :max="Number(maxValue.VALUE)"
    :from="Number(minValue.FILTERED_VALUE)"
    :to="Number(maxValue.FILTERED_VALUE)"
  />
</template>

<script>
import PriceRange from './PriceRange.vue';

export default {
  name: 'BlockDropdownRange',
  props: ['block'],
  components: {
    PriceRange,
  },
  computed: {
    minValue() {
      return Object.values(this.block.VALUES).find((v) =>
        v.CONTROL_ID.endsWith('MIN')
      );
    },
    maxValue() {
      return Object.values(this.block.VALUES).find((v) =>
        v.CONTROL_ID.endsWith('MAX')
      );
    },
  },
};
</script>
