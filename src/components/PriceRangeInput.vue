<template>
  <div
    class="slr2-cf__input"
    :class="{
      'slr2-cf__input--clearable': clearable,
    }"
  >
    <label class="slr2-cf__input-label">{{ label }}</label>
    <input
      ref="input"
      type="text"
      class="slr2-cf__input-control"
      :name="inputName"
      v-model="displayValue"
      @input="formatInputValue"
      @blur="blurInput"
      @focus="focusInput"
    />
    <div class="slr2-cf__input-clear" @click.prevent="clear">
      <icon-clear />
    </div>
  </div>
</template>

<script>
import IconClear from './IconClear.vue';

export default {
  data() {
    return {
      displayValue: '',
      clearable: false,
    };
  },
  components: {
    IconClear,
  },
  props: ['label', 'inputName', 'modelValue'],
  watch: {
    modelValue(newVal) {
      this.initValue(newVal);
    },
  },
  methods: {
    clear() {
      this.displayValue = '';
      this.$refs.input.focus();
    },
    focusInput() {
      if (this.displayValue.trim() === '0' || this.displayValue === '') {
        this.displayValue = '';
        this.clearable = false;
      } else {
        this.clearable = true;
      }

      // Принудительно устанавливаем масштаб 1 при фокусе
      const meta = document.querySelector('meta[name="viewport"]');
      meta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0'
      );
    },
    blurInput() {
      if (this.displayValue.trim() === '') {
        this.displayValue = '0';
      }

      setTimeout(() => {
        this.clearable = false;
      }, 300);

      // Можно вернуть оригинальный viewport, если нужно
      const meta = document.querySelector('meta[name="viewport"]');
      meta.setAttribute('content', 'width=device-width, initial-scale=1.0');
    },
    initValue(value) {
      this.displayValue = this.formatNumber(String(value));
    },
    formatNumber(value) {
      // 1. Оставляем только цифры
      value = value.replace(/\D/g, '');

      // 2. Убираем ведущие нули (но оставляем один 0)
      if (value.length > 1) {
        value = value.replace(/^0+/, '');
      }
      if (value === '') value = ''; // если всё стёрли — ставим пусто

      // 3. Форматируем с пробелами каждые 3 цифры с конца
      const parts = [];
      for (let i = value.length; i > 0; i -= 3) {
        parts.unshift(value.slice(Math.max(0, i - 3), i));
      }
      value = parts.join(' ');

      if (!value) return '';

      return value;
    },
    formatInputValue(e) {
      const inputControl = e.target;

      let value = inputControl.value;

      value = this.formatNumber(value);

      // 4. Обновляем значение (без потери курсора)
      const cursorPos = inputControl.selectionStart;
      const oldValue = inputControl.value;
      inputControl.value = value;

      // Восстанавливаем позицию курсора (примерно)
      const digitsBeforeCursor = oldValue
        .slice(0, cursorPos)
        .replace(/\D/g, '').length;
      let newCursorPos = 0;
      let digitCount = 0;
      for (let char of value) {
        if (/\d/.test(char)) digitCount++;
        newCursorPos++;
        if (digitCount === digitsBeforeCursor) break;
      }
      // Корректировка: если курсор был в конце, ставим в конец
      if (cursorPos === oldValue.length) {
        newCursorPos = value.length;
      }

      setTimeout(
        () => inputControl.setSelectionRange(newCursorPos, newCursorPos),
        0
      );

      if (this.displayValue.trim() === '') {
        this.clearable = false;
      } else {
        this.clearable = true;
      }
    },
  },
  mounted() {
    this.initValue(this.modelValue);
  },
};
</script>
