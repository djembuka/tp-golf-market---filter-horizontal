<template>
    <div class="vm-filter-block__dropdown" v-if="block">
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
</template>

<script>
import CheckboxControl from './CheckboxControl.vue';

export default {
  name: 'BlockDropdown',
  props: ['block'],
  components: {
    CheckboxControl
  }
}
</script>

<style>
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

/*Mobile dropdown*/
.vm-filter > .vm-filter-block__dropdown {
    display: none;
}
@media(max-width: 767px) {
    .vm-filter > .vm-filter-block__dropdown {
        display: block;
        top: 100%;
        opacity: 1;
        z-index: 10;
    }
}
</style>