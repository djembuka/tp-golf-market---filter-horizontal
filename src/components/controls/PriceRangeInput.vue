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
      v-model="value"
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
import IconClear from '../icons/IconClear.vue';

export default {
  data() {
    return {
      clearable: false,
    };
  },
  components: {
    IconClear,
  },
  props: ['label', 'inputName', 'modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.formatNumber(this.modelValue) ?? '';
      },
      set(val) {
        return this.$emit(
          'update:modelValue',
          Number(String(val).replace(/\D/g, '')) || 0
        );
      },
    },
  },
  methods: {
    clear() {
      this.value = '';
      this.$refs.input.focus();
    },
    focusInput() {
      if (this.value.trim() === '0' || this.value === '') {
        this.value = '';
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
      if (this.value.trim() === '') {
        this.value = '0';
      }

      setTimeout(() => {
        this.clearable = false;
      }, 300);

      // Можно вернуть оригинальный viewport, если нужно
      const meta = document.querySelector('meta[name="viewport"]');
      meta.setAttribute('content', 'width=device-width, initial-scale=1.0');
    },
    formatNumber(value) {
      value = String(value);
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

      if (this.value.trim() === '') {
        this.clearable = false;
      } else {
        this.clearable = true;
      }
    },
  },
};
</script>

<style>
.slr2-cf__input {
  position: relative;
}
.slr2-cf__input-label {
  position: absolute;
  top: 6px;
  left: 16px;
  font-family: 'Inter', Helvetica;
  font-weight: 400;
  color: rgba(64, 64, 64, 1);
  font-size: 12px;
  -webkit-transition: top 0.3s ease;
  transition: top 0.3s ease;
  margin-bottom: 0;
}
.slr2-cf__input-control {
  display: flex;
  width: 100%;
  height: 48px;
  padding: 24px 16px 8px 16px;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #f9f9f9;
  background: #f9f9f9;
  -webkit-transition: border-color 0.3s ease, background-color 0.3s ease;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}
input.slr2-cf__input-control {
  font-size: 16px !important;
}
.slr2-cf__input-control:focus {
  outline: none;
  border-color: rgba(67, 66, 255, 1);
  background: rgba(242, 242, 255, 1);
}
.slr2-cf__input-clear {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  cursor: pointer;
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
  border-radius: 8px;
  border: 1px solid #000;
  z-index: -1;
}
.slr2-cf__input-clear svg {
  pointer-events: none;
}
.slr2-cf__input--clearable .slr2-cf__input-clear {
  opacity: 1;
  z-index: 10;
}
</style>
