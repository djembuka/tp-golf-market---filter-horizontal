<template>
  <label
    :class="{
      'vm-filter-checkbox': true,
      'vm-filter-checkbox--disabled': item.DISABLED,
    }"
  >
    <input
      type="checkbox"
      :value="item.HTML_VALUE"
      :name="item.CONTROL_NAME"
      v-model="checked"
    />

    <icon-checkbox />

    <span
      class="vm-filter-checkbox__label"
      v-html="item.VALUE.toLowerCase()"
    ></span>
  </label>
</template>

<script>
import IconCheckbox from '../icons/IconCheckbox.vue';

export default {
  data() {
    return {
      checked: this.item.CHECKED,
    };
  },
  props: ['item', 'blockId'],
  watch: {
    checked() {
      this.$store.commit('check', {
        id: this.item.CONTROL_ID,
        checked: this.checked,
        blockId: this.blockId,
      });

      this.$store.dispatch('change');
    },
  },
  components: {
    IconCheckbox,
  },
};
</script>

<style>
.vm-filter-checkbox {
  --primary-color: #000;
  --primary-color-hover: #000000bb;
  position: relative;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.vm-filter-checkbox--disabled {
  opacity: 0.3;
  pointer-events: none;
}

.vm-filter-checkbox [type='checkbox']:not(:checked),
.vm-filter-checkbox [type='checkbox']:checked {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.vm-filter-checkbox .vm-filter-checkbox__label {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 16px;
  line-height: 1.2;
  font-size: 12px;
  font-weight: normal;
  user-select: none;
  color: var(--primary-color);
}

.vm-filter-checkbox [type='checkbox']:checked + .vm-filter-checkbox__label {
  font-weight: bold;
}
</style>
