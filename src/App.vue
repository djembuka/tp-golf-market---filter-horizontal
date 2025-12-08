<template>
  <placeholder-element v-if="loading" />
  <div class="vm-filter" v-else>
    <div class="vm-filter-scroll" ref="fscroll">
      <block-component
        v-for="block in $store.getters.prices"
        :key="block.ID"
        :block="block"
      />
      <block-component
        v-for="block in $store.getters.items"
        :key="block.ID"
        :block="block"
      />
      <cancel-button></cancel-button>
    </div>
    <block-dropdown
      v-if="$store.getters.items || $store.getters.prices"
      :block="activeBlock"
    />
  </div>
</template>

<script>
import PlaceholderElement from './components/PlaceholderElement.vue';
import BlockDropdown from './components/BlockDropdown.vue';
import BlockComponent from './components/BlockComponent.vue';
import CancelButton from './components/CancelButton.vue';

export default {
  name: 'App',
  components: {
    PlaceholderElement,
    BlockDropdown,
    BlockComponent,
    CancelButton,
  },
  computed: {
    activeBlock() {
      if (!this.$store.getters.items && !this.$store.getters.prices)
        return null;

      const block = [
        ...this.$store.getters.items,
        ...this.$store.getters.prices,
      ].find((i) => i.dropdown);

      return block || null;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    hideDropdowns(e) {
      if (window.matchMedia('(width <= 767px)').matches) {
        //mobile
        if (
          !e.target.classList.contains('vm-filter-block__dropdown') &&
          !e.target.closest('.vm-filter-block__dropdown')
        ) {
          const active = this.$store.getters.items.find(
            (i) => i.dropdown && !i.animate
          );

          if (active) {
            this.$store.commit('changeBxResponseItem', {
              block: active,
              name: 'dropdown',
              value: false,
            });
          }
        }
      } else {
        //desktop
        if (
          !e.target.classList.contains('vm-filter-block') &&
          !e.target.closest('.vm-filter-block')
        ) {
          [...this.$store.getters.items, ...this.$store.getters.prices].forEach(
            (block) => {
              this.$store.commit('changeBxResponseItem', {
                block,
                name: 'dropdown',
                value: false,
              });
            }
          );
        }
      }
    },
  },
  watch: {
    loading(newVal) {
      if (newVal === false) {
        //hide event
        window.document.addEventListener('click', this.hideDropdowns);

        this.$nextTick(() => {
          this.$refs.fscroll.addEventListener('scroll', () => {
            if (this.activeBlock) {
              this.$store.commit('changeBxResponseItem', {
                block: this.activeBlock,
                name: 'dropdown',
                value: false,
              });
            }
          });
        });
      }
    },
  },
  beforeUnmount() {
    window.document.removeEventListener('click', this.hideDropdowns);
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
  },
};
</script>

<style>
.vm-filter {
  position: relative;
  padding: 16px 0;
}
.vm-filter-scroll {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
}
@media (max-width: 767px) {
  .vm-filter {
    padding: 8px 0;
  }
  .vm-filter-scroll {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 5px;
  }
}
</style>
