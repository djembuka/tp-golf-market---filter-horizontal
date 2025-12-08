<template>
  <div class="slr2-cf__range-slider">
    <div class="slr2-cf__inputs">
      <price-range-input
        label="От"
        inputName="CF_PRICE_FROM"
        v-model="modelFrom"
      />

      <price-range-input label="До" inputName="CF_PRICE_TO" v-model="modelTo" />
    </div>

    <div class="slr2-cf__sliders-control">
      <input
        class="slr2-cf__from-slider"
        type="range"
        v-model="fromValue"
        :min="min"
        :max="max"
        :style="{ background: fromBg }"
        @input="fromSlide"
      />
      <input
        class="slr2-cf__to-slider"
        type="range"
        v-model="toValue"
        :min="min"
        :max="max"
        :style="{ background: toBg, 'z-index': toZIndex }"
        @input="toSlide"
      />
    </div>

    <input
      type="hidden"
      name="arrFILTER_P3_MIN"
      id="arrFILTER_P3_MIN"
      v-model="fromValue"
      onchange="smartFilter.keyup(this)"
    />
    <input
      type="hidden"
      name="arrFILTER_P3_MAX"
      id="arrFILTER_P3_MAX"
      v-model="toValue"
      onchange="smartFilter.keyup(this)"
    />
  </div>
</template>

<script>
import PriceRangeInput from './PriceRangeInput.vue';

export default {
  data() {
    return {
      fromValue: this.from,
      toValue: this.to,
      sliderColor: '#F9F9F9',
      rangeColor: '#000',
      fromBg: '',
      toBg: '',
      toZIndex: 0,
    };
  },
  components: {
    PriceRangeInput,
  },
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 10000,
    },
    from: {
      type: Number,
      default: 100,
    },
    to: {
      type: Number,
      default: 3000,
    },
  },
  emits: ['slide'],
  computed: {
    modelFrom: {
      get() {
        return this.fromValue ?? 0;
      },
      set(val) {
        this.fromValue = val ?? 0;
        this.fromSlide();
      },
    },
    modelTo: {
      get() {
        return this.toValue ?? 0;
      },
      set(val) {
        this.toValue = val ?? 0;
        this.toSlide();
      },
    },
  },
  methods: {
    fillSlider(code) {
      const rangeDistance = this.max - this.min;
      const fromPosition = this.fromValue - this.min;
      const toPosition = this.toValue - this.min;
      const gradient = `linear-gradient(
        to right,
        ${this.sliderColor} 0%,
        ${this.sliderColor} ${(fromPosition / rangeDistance) * 100}%,
        ${this.rangeColor} ${(fromPosition / rangeDistance) * 100}%,
        ${this.rangeColor} ${(toPosition / rangeDistance) * 100}%,
        ${this.sliderColor} ${(toPosition / rangeDistance) * 100}%,
        ${this.sliderColor} 100%)`;

      this.fromBg = code === 'from' ? gradient : this.sliderColor;
      this.toBg = code === 'to' ? gradient : this.sliderColor;
    },
    setToggleAccessible() {
      if (this.toValue <= this.min) {
        this.toZIndex = 2;
      } else {
        this.toZIndex = 0;
      }
    },
    fromSlide() {
      // const [from, to] = getParsed(fromSlider, toSlider);
      this.fillSlider('to');
      if (Number(this.fromValue) > Number(this.toValue)) {
        this.fromValue = this.toValue;
      }

      this.$emit('slide', { from: this.fromValue, to: this.toValue });
    },
    toSlide() {
      // const [from, to] = getParsed(fromSlider, toSlider);
      this.fillSlider('to');
      this.setToggleAccessible();
      if (Number(this.fromValue) <= Number(this.toValue)) {
        // this.toValue = this.toValue;
      } else {
        this.toValue = this.fromValue;
      }

      this.$emit('slide', { from: this.fromValue, to: this.toValue });
    },
  },
  mounted() {
    this.fillSlider('to');
  },
};
</script>

<style>
/*Inputs*/
.slr2-cf__inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.slr2-cf__input {
  position: relative;
}
.slr2-cf__input-label {
  position: absolute;
  top: 8px;
  left: 16px;
  font-family: 'Inter', Helvetica;
  font-weight: 400;
  color: rgba(64, 64, 64, 1);
  font-size: 12px;
  -webkit-transition: top 0.3s ease;
  transition: top 0.3s ease;
}
.slr2-cf__input-control {
  display: flex;
  width: 100%;
  height: 48px;
  padding: 24px 16px 6px 16px;
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
/*Inputs End*/

/*Range*/
.slr2-cf__range-slider {
  display: grid;
  gap: 16px;
  padding-bottom: 16px;
}

.slr2-cf__sliders-control {
  position: relative;
  min-height: 16px;
  padding: 20px 0 30px;
}

.slr2-cf__sliders-control .thumb {
  display: none;
}

.slr2-cf__sliders-control input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #000;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: none;
}

.slr2-cf__sliders-control input[type='range']::-moz-range-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #000;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: none;
}

.slr2-cf__sliders-control input[type='range']::-webkit-slider-thumb:hover {
  background: #000;
  box-shadow: none;
}

/* Убираем тень при фокусе (на iOS она может появляться) */
.slr2-cf__sliders-control input[type='range']:focus::-webkit-slider-thumb {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}

.slr2-cf__sliders-control input[type='range'] {
  -webkit-appearance: none !important;
  appearance: none;
  height: 8px;
  width: 100%;
  position: absolute;
  background-color: #f9f9f9;
  pointer-events: none;
  margin: 0;
}

.slr2-cf__range-slider input[type='range'].slr2-cf__from-slider {
  height: 0;
  margin-top: 4px;
  z-index: 1;
}

@media (max-width: 767px) {
  .slr2-cf__sliders-control input[type='range']::-webkit-slider-thumb {
    width: 36px;
    height: 36px;
  }
  .slr2-cf__sliders-control input[type='range']::-moz-range-thumb {
    width: 36px;
    height: 36px;
  }
}
/*Range End*/
</style>
