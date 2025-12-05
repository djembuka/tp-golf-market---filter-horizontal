<template>
  <checkbox-control
    v-for="item in Object.values(block.VALUES)"
    :key="item.CONTROL_ID"
    :item="item"
    :blockId="block.ID"
  />
</template>

<script>
import CheckboxControl from './CheckboxControl.vue';

export default {
  name: 'BlockDropdownCheckboxes',
  props: ['block'],
  components: {
    CheckboxControl,
  },
};
</script>
