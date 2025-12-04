<template>
  <div
    class="vm-filter-block"
    :class="{
      'vm-filter-block--animate': animate,
      'vm-filter-block--dropdown': block.dropdown,
    }"
    ref="fblock"
  >
    <div class="vm-filter-block__head" @click="drop()">
      <span class="vm-filter-block__head-content"
        >{{ block.NAME.toLowerCase() }}
        <span v-html="getCount() ? `<b>${getCount()}</b>` : ''"></span
      ></span>
      <IconArrow />
    </div>
    <block-dropdown :block="block" />
  </div>
</template>

<script>
import BlockDropdown from './BlockDropdown.vue';
import IconArrow from './IconArrow.vue';

export default {
  name: 'BlockCheckbox',
  data() {
    return {
      animate: false,
      dropdown: false,
    };
  },
  props: ['block'],
  methods: {
    getCount() {
      return Object.values(this.block.VALUES).filter(
        (value) => value.CHECKED && value.ELEMENT_COUNT
      ).length;
    },
    drop() {
      if (this.block.dropdown) {
        //hide
        this.$store.commit('changeBxResponseItem', {
          block: this.block,
          name: 'dropdown',
          value: false,
        });
        this.animate = true;
        setTimeout(() => {
          this.animate = false;
        }, 200);
      } else {
        //open
        Object.values(this.$store.state.bxResponse.ITEMS).forEach((block) => {
          this.$store.commit('changeBxResponseItem', {
            block,
            name: 'dropdown',
            value: false,
          });
        });

        this.$store.commit('changeBxResponseItem', {
          block: this.block,
          name: 'dropdown',
          value: true,
        });

        // compute coords
        const rect = this.$refs.fblock.getBoundingClientRect();
        this.$store.commit('changeBxResponseItem', {
          block: this.block,
          name: 'rectX',
          value: Math.round(rect.x),
        });
      }
    },
    productWord() {
      if (this.$store.state.lang && this.$store.state.lang.products) {
        const num = Number(this.$store.state.bxResponse.ELEMENT_COUNT);
        const word = this.$store.state.lang.products;
        if (/(10|11|12|13|14|15|16|17|18|19)$/.test(num)) {
          return word[2];
        } else if (/.*1$/.test(num)) {
          return word[0];
        } else if (/[2-4]$/.test(num)) {
          return word[1];
        } else {
          return word[2];
        }
      }
      return '';
    },
  },
  components: {
    BlockDropdown,
    IconArrow,
  },
};
</script>

<style>
.vm-filter-block {
  position: relative;
}
.vm-filter-block.vm-filter-block--animate,
.vm-filter-block.vm-filter-block--dropdown {
  z-index: 30;
}
.vm-filter-block__head {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #fafafa;
  color: #000000;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;
  -webkit-transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
}
.vm-filter-block__head:hover {
  background-color: #000000bb;
  color: #fff;
}
.vm-filter-block__head-content {
  display: flex;
  gap: 8px;
  white-space: nowrap;
}
.vm-filter-block.vm-filter-block--dropdown .vm-filter-block__head svg {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.vm-filter-block__head span span {
  display: inline-block;
  min-width: 50px;
}
</style>
