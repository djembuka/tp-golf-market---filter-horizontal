<template>
  <div class="vm-filter">
    <div class="vm-filter-scroll">
      <block-checkbox v-for="block in $store.getters.items"
        :key="block.ID"
        :block="block" 
      />
      <cancel-button></cancel-button>
    </div>
    <block-dropdown v-if="$store.getters.items" :block="$store.getters.items[0]" />
  </div>
</template>

<script>
import BlockDropdown from './components/BlockDropdown.vue';
import BlockCheckbox from './components/BlockCheckbox.vue';
import CancelButton from './components/CancelButton.vue';

export default {
  name: 'App',
  components: {
    BlockDropdown,
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
            block,
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
  position: relative;
}
.vm-filter-scroll {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
}
@media (max-width: 767px) {
  .vm-filter-scroll {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 5px;
  }
}
</style>
