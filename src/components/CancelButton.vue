<template>
  <div
    class="vm-filter-block__cancel"
    :class="{'vm-filter-block__cancel--disabled': !$store.getters.checkedCount}"
    @click.prevent="clear"
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
  margin-left: calc(-140px - 16px);
}
.vm-filter-block__cancel--disabled {
  color: #fff;
  pointer-events: none;
}
@media(max-width: 767px) {
  .vm-filter-block__cancel {
    margin-left: 0;
  }
}
</style>
