<template>
  <div
    class="vm-filter-block__cancel"
    @click.prevent="clear"
    v-if="$store.getters.checkedCount"
  >
    Очистить фильтры
  </div>
</template>

<script>
export default {
  methods: {
    clear() {
      if (this.$store.state.bxResponse) {
        window.location.href = this.$store.state.bxResponse.SEF_DEL_FILTER_URL;
      }
    },
  },
};
</script>

<style>
.vm-filter-block__cancel {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 12px;
  color: #000000;
  font-size: 0.88rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  -webkit-transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}
</style>
