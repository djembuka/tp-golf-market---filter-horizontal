<template>
  <div class="vm-filter">
    <div v-for="block in $store.getters.items" :key="block.ID">
      <block-checkbox :block="block"></block-checkbox>
    </div>
    <cancel-button></cancel-button>
  </div>
</template>

<script>
import BlockCheckbox from './components/BlockCheckbox.vue';
import CancelButton from './components/CancelButton.vue';

export default {
  name: 'App',
  components: {
    BlockCheckbox,
    CancelButton,
  },
  mounted() {
    //bx data
    this.$store.dispatch('change');
    //lang
    setTimeout(() => {
      if (window.vmFilterData) {
        Object.keys(window.vmFilterData).forEach((key) => {
          this.$store.state[key] = window.vmFilterData[key];
        });
      }
    }, 1000);
    //hide event
    window.document.addEventListener('click', (e) => {
      if (
        !e.target.classList.contains('vm-filter-block') &&
        !e.target.closest('.vm-filter-block')
      ) {
        this.$store.getters.items.forEach((block) => {
          this.$store.commit('changeBxResponseItem', {
            id: block.ID,
            name: 'dropdown',
            value: false,
          });
        });
      }
    });
  },
};
</script>

<style>
.vm-filter {
  display: flex;
  flex-wrap: wrap;
}
</style>
