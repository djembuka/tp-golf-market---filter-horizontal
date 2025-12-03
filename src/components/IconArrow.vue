<template>
  <div class="vm-filter-block__arrow">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="4"
      viewBox="0 0 6 4"
      fill="none"
    >
      <path
        d="M5.23067 0.15301C5.40666 -0.0510033 5.69201 -0.0510032 5.868 0.15301C6.044 0.357023 6.044 0.687793 5.868 0.891806L3.31867 3.84699C3.14267 4.051 2.85733 4.051 2.68133 3.84699L0.131996 0.891806C-0.0439992 0.687793 -0.0439992 0.357023 0.131996 0.15301C0.307991 -0.0510032 0.593335 -0.0510033 0.769331 0.15301L3 2.7388L5.23067 0.15301Z"
        fill="black"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'IconArrow',
};
</script>

<style>
.vm-filter-block__arrow {
  display: flex;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  border-radius: 4px;
  background: var(--twpx-button-colors-default, #fafafa);
}
</style>
