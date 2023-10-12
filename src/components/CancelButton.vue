<template>
  <div class="vm-filter-block__cancel" @click.prevent="clear">
    Очистить фильтры
  </div>
</template>

<script>
export default {
  methods: {
    clear() {
      console.log('clear');
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
}
</style>
