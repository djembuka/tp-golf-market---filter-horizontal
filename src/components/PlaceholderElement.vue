<template>
  <div class="vm-filter-placeholder">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style>
.vm-filter-placeholder {
  display: flex;
  gap: 8px 16px;
  padding: 16px 0;
}
.vm-filter-placeholder div {
  border-radius: 4px;
  background: var(--base-grey-100, #fafafa);
  height: 40px;
  width: 100px;
}
@media (max-width: 767px) {
  .vm-filter-placeholder {
    padding: 8px 0 calc(8px + 5px);
  }
}
</style>
