<template>
  <price-range
    :min="Number(minValue.VALUE)"
    :max="Number(maxValue.VALUE)"
    :from="Number(minValue.HTML_VALUE || minValue.VALUE)"
    :to="Number(maxValue.HTML_VALUE || maxValue.VALUE)"
    @slide="slide"
  />
</template>

<script>
import PriceRange from './controls/PriceRange.vue';

export default {
  name: 'BlockDropdownRange',
  data() {
    return {
      timeoutId: null,
    };
  },
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
  methods: {
    slide({ from, to }) {
      this.$store.commit('range', {
        from,
        to,
        blockId: this.block.ID,
      });

      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.$store.dispatch('change');
      }, 300);
    },
  },
};
</script>
