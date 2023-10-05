<template>
  <div
    class="vm-filter-checkbox"
    :class="{
      'vm-filter-checkbox--disabled': Number(item.ELEMENT_COUNT) <= 0,
    }"
  >
    <label
      ><input
        type="checkbox"
        :value="item.HTML_VALUE"
        :name="item.CONTROL_NAME"
        v-model="checked"
        class="filled-in" />
      <span v-html="item.VALUE"></span
    ></label>
  </div>
</template>

<script>
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
};
</script>

<style>
.vm-filter-checkbox {
  --primary-color: #000;
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

.vm-filter-checkbox [type='checkbox'] + span {
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  display: inline-block;
  height: 25px;
  line-height: 1.2;
  font-size: 1rem;
  font-weight: normal;
  user-select: none;
}

.vm-filter-checkbox [type='checkbox']:checked + span {
  font-weight: bold;
}

.vm-filter-checkbox [type='checkbox'] + span:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  z-index: 0;
  border: 2px solid #5a5a5a;
  border-radius: 1px;
  margin-top: 3px;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

.vm-filter-checkbox [type='checkbox']:not(:checked):disabled + span:before {
  border: none;
  background-color: rgba(0, 0, 0, 0.42);
}

.vm-filter-checkbox [type='checkbox']:checked + span:before {
  top: -4px;
  left: -5px;
  width: 12px;
  height: 22px;
  border-top: 2px solid transparent;
  border-left: 2px solid transparent;
  border-right: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  -webkit-transform: rotate(40deg);
  transform: rotate(40deg);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}

.vm-filter-checkbox [type='checkbox']:checked:disabled + span:before {
  border-right: 2px solid rgba(0, 0, 0, 0.42);
  border-bottom: 2px solid rgba(0, 0, 0, 0.42);
}

.vm-filter-checkbox [type='checkbox'].filled-in + span:after {
  border-radius: 2px;
}

.vm-filter-checkbox [type='checkbox'].filled-in + span:before,
.vm-filter-checkbox [type='checkbox'].filled-in + span:after {
  content: '';
  left: 0;
  position: absolute;
  -webkit-transition: border 0.25s, background-color 0.25s, width 0.2s 0.1s,
    height 0.2s 0.1s, top 0.2s 0.1s, left 0.2s 0.1s;
  transition: border 0.25s, background-color 0.25s, width 0.2s 0.1s,
    height 0.2s 0.1s, top 0.2s 0.1s, left 0.2s 0.1s;
  z-index: 1;
}

.vm-filter-checkbox [type='checkbox'].filled-in:not(:checked) + span:before {
  width: 0;
  height: 0;
  border: 3px solid transparent;
  left: 6px;
  top: 10px;
  -webkit-transform: rotateZ(37deg);
  transform: rotateZ(37deg);
  -webkit-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}

.vm-filter-checkbox [type='checkbox'].filled-in:not(:checked) + span:after {
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: 2px solid #5a5a5a;
  top: 0px;
  z-index: 0;
}

.vm-filter-checkbox [type='checkbox'].filled-in:checked + span:before {
  top: 0;
  left: 1px;
  width: 8px;
  height: 13px;
  border-top: 2px solid transparent;
  border-left: 2px solid transparent;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  -webkit-transform: rotateZ(37deg);
  transform: rotateZ(37deg);
  -webkit-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}

.vm-filter-checkbox [type='checkbox'].filled-in:checked + span:after {
  top: 0;
  width: 20px;
  height: 20px;
  border: 2px solid var(--primary-color);
  background-color: var(--primary-color);
  z-index: 0;
}

.vm-filter-checkbox
  [type='checkbox'].filled-in:disabled:not(:checked)
  + span:before {
  background-color: transparent;
  border: 2px solid transparent;
}

.vm-filter-checkbox
  [type='checkbox'].filled-in:disabled:not(:checked)
  + span:after {
  border-color: transparent;
  background-color: #949494;
}

.vm-filter-checkbox [type='checkbox'].filled-in:disabled:checked + span:before {
  background-color: transparent;
}

.vm-filter-checkbox [type='checkbox'].filled-in:disabled:checked + span:after {
  background-color: #949494;
  border-color: #949494;
}
</style>
