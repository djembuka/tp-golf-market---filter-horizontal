<template>
  <div
    class="vm-filter-block"
    :class="{
      'vm-filter-block--animate': animate,
      'vm-filter-block--dropdown': block.dropdown,
    }"
  >
    <div class="vm-filter-block__head" @click="drop()">
      <span class="vm-filter-block__head-content"
        >{{ block.NAME.toLowerCase() }}
        <span v-html="getCount() ? `<b>${getCount()}</b>` : ''"></span
      ></span>
      <IconArrow />
    </div>
    <div class="vm-filter-block__dropdown">
      <div class="vm-filter-block__body">
        <checkbox-control
          v-for="item in Object.values(block.VALUES)"
          :key="item.CONTROL_ID"
          :item="item"
          :blockId="block.ID"
        />
      </div>
      <a
        :href="$store.state.bxResponse.SEF_SET_FILTER_URL"
        class="vm-filter-block__button"
      >
        {{
          $store.state.lang && $store.state.lang.filter
            ? $store.state.lang.filter
            : ''
        }}
        <span
          v-html="
            $store.state.bxResponse.ELEMENT_COUNT
              ? `(${$store.state.bxResponse.ELEMENT_COUNT})`
              : ''
          "
        ></span>
      </a>
    </div>
  </div>
</template>

<script>
import CheckboxControl from './CheckboxControl.vue';
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
          id: this.block.ID,
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
            id: block.ID,
            name: 'dropdown',
            value: false,
          });
        });

        this.$store.commit('changeBxResponseItem', {
          id: this.block.ID,
          name: 'dropdown',
          value: true,
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
    CheckboxControl,
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
.vm-filter-block__dropdown {
  position: absolute;
  top: 48px;
  left: 0;
  width: auto;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0px 12px 12px #0000000d;
  padding: 8px;
  opacity: 0;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  pointer-events: none;
  -webkit-transform: translateY(-10px);
  transform: translateY(-10px);
  background-color: #fff;
  z-index: -1;
}
.vm-filter-block.vm-filter-block--dropdown .vm-filter-block__dropdown {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
  z-index: 8;
}
.vm-filter-block__body {
  margin-bottom: 8px;
  max-height: 180px;
  overflow-y: auto;
  scrollbar-color: #ccc #fff;
  scrollbar-width: thin;
  border-bottom: 1px solid #ededed;
}
.vm-filter-block__body::-webkit-scrollbar {
  width: 4px; /* ширина для вертикального скролла */
  height: 4px; /* высота для горизонтального скролла */
  background-color: #fff;
}
.vm-filter-block__body::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 2px;
}
.vm-filter-block__body::-webkit-scrollbar-thumb:hover {
  background-color: #c0c0c0;
}
.vm-filter-block__button {
  display: flex;
  padding: 15px 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 2px;
  background: var(--twpx-button-colors-black, #000);
  color: var(--twpx-button-text-color-hover, #fff);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition: opacity 0.3s ease;
  -webkit-transition: opacity 0.3s ease;
}
.vm-filter-block__button:hover {
  background-color: #000;
  color: #fff;
  opacity: 0.7;
}
a.vm-filter-block__button,
a.vm-filter-block__button:hover,
a.vm-filter-block__button:focus,
a.vm-filter-block__button:active {
  color: var(--twpx-button-text-color-hover, #fff);
}
</style>
