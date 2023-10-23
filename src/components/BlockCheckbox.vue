<template>
  <div
    class="vm-filter-block"
    :class="{
      'vm-filter-block--animate': animate,
      'vm-filter-block--dropdown': block.dropdown,
    }"
  >
    <div class="vm-filter-block__head" @click="drop()">
      <span
        >{{ block.NAME }}
        <span v-html="getCount() ? `(${getCount()})` : ''"></span
      ></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <g transform="translate(16 16) rotate(180)">
          <circle cx="8" cy="8" r="8" transform="translate(0 0)" fill="#fff" />
          <path
            d="M3.512,0a.5.5,0,0,0-.355.147L.147,3.157a.5.5,0,1,0,.709.709L3.512,1.211,6.167,3.866a.5.5,0,0,0,.709-.709L3.867.147A.5.5,0,0,0,3.512,0Z"
            transform="translate(4.461 5.23)"
          />
        </g>
      </svg>
    </div>
    <div class="vm-filter-block__dropdown">
      <div class="vm-filter-block__body">
        <element-checkbox
          v-for="item in Object.values(block.VALUES)"
          :key="item.CONTROL_ID"
          :item="item"
          :blockId="block.ID"
        ></element-checkbox>
      </div>
      <a
        :href="$store.state.bxResponse.SEF_SET_FILTER_URL"
        class="vm-filter-block__button btn btn-default btn-size-S"
      >
        {{
          $store.state.lang && $store.state.lang.filter
            ? $store.state.lang.filter
            : ''
        }}
        <span
          v-html="
            $store.state.bxResponse.ELEMENT_COUNT
              ? `&nbsp;(${
                  $store.state.bxResponse.ELEMENT_COUNT
                } ${productWord()})`
              : ''
          "
        ></span>
      </a>
    </div>
  </div>
</template>

<script>
import ElementCheckbox from './ElementCheckbox.vue';

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
      return Object.values(this.block.VALUES).reduce((acc, cur) => {
        if (cur.CHECKED && cur.ELEMENT_COUNT) {
          return acc + Number(cur.ELEMENT_COUNT);
        }
        return acc;
      }, 0);
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
    ElementCheckbox,
  },
};
</script>

<style>
.vm-filter-block {
  min-width: 100px;
  margin: 0 12px 12px 0;
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
  padding: 5px 12px;
  background-color: #f7f7f7;
  color: #000000;
  font-size: 0.88rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  -webkit-transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
  user-select: none;
}
.vm-filter-block__head:hover {
  background-color: #000;
  color: #fff;
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
  padding: 16px;
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
  margin-bottom: 16px;
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
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 12px;
  background-color: #f7f7f7;
  color: #000000;
  font-size: 0.88rem;
  cursor: pointer;
}
.vm-filter-block__button:hover {
  background-color: #000;
  color: #fff;
}
</style>
