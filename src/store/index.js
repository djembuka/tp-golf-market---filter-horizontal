import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: true,
  },
  getters: {
    items(state) {
      if (
        !state.bxResponse ||
        !state.bxResponse.ITEMS ||
        !state.bxResponse.PROPERTY_ID_LIST
      ) return [];

      const items = state.bxResponse.ITEMS;
      const idArr = state.bxResponse.PROPERTY_ID_LIST;

      const result = idArr.map(id => {
        return items[String(id)] || {};
      });

      const withValues = result.filter(item => {
        if (typeof item.VALUES === 'object' && Object.values(item.VALUES).length) {
          return true;
        } else {
          return false;
        }
      });

      return withValues;
    },
    prices(state) {
      if (
        !state.bxResponse ||
        !state.bxResponse.PRICES ||
        !state.bxResponse.ITEMS
      )
        return [];

      const keys = Object.keys(state.bxResponse.PRICES);
      const items = state.bxResponse.ITEMS;

      return keys.map((key) => {
        return items[key];
      });
    },
    checkedCount(state) {
      if (
        !state.bxResponse ||
        !state.bxResponse.PRICES ||
        !state.bxResponse.ITEMS
      )
        return 0;

      // items
      const items = state.bxResponse.ITEMS;
      const a = Object.values(items).filter((item) => {
        if (
          item.PROPERTY_TYPE === 'L' &&
          typeof item.VALUES === 'object' &&
          item.VALUES.length === undefined &&
          Object.values(item.VALUES).find((value) => value.CHECKED)
        ) {
          return true;
        }
        return false;
      });

      // prices
      const keys = Object.keys(state.bxResponse.PRICES);

      const prices = keys.map((key) => {
        return items[key];
      });

      const b = Object.values(prices).filter((item) => {
        return Object.values(item.VALUES).some(
          (v) => v.HTML_VALUE && String(v.HTML_VALUE) !== String(v.VALUE)
        );
      });

      return a.length + b.length;
    },
    formData(state) {
      if (state.bxResponse) {
        const dataObj = {};
        Object.values(state.bxResponse.ITEMS).forEach((item) => {
          if (item.PROPERTY_TYPE) {
            Object.values(item.VALUES).forEach((value) => {
              if (value.CHECKED) {
                dataObj[value.CONTROL_NAME] = value.HTML_VALUE;
              }
            });
          } else if (item.PRICE) {
            Object.values(item.VALUES).forEach((value) => {
              dataObj[value.CONTROL_NAME] = value.HTML_VALUE || value.VALUE;
            });
          }
        });

        return Object.entries(dataObj)
          .map((entry) => `${entry[0]}=${entry[1]}`)
          .join('&');
      } else {
        return '';
      }
    },
  },
  mutations: {
    changeLoading(state, value) {
      state.loading = value;
    },
    check(state, { id, checked, blockId }) {
      const block = Object.values(state.bxResponse.ITEMS).find(
        (item) => item.ID === blockId
      );
      const item = Object.values(block.VALUES).find(
        (value) => value.CONTROL_ID === id
      );
      item.CHECKED = checked;
    },
    range(state, { blockId, from, to }) {
      const block = Object.values(state.bxResponse.ITEMS).find(
        (item) => item.ID === blockId
      );
      const min = Object.values(block.VALUES).find((value) =>
        value.CONTROL_ID.includes('MIN')
      );
      const max = Object.values(block.VALUES).find((value) =>
        value.CONTROL_ID.includes('MAX')
      );
      min.HTML_VALUE = from;
      max.HTML_VALUE = to;
    },
    bxResponse(state, { obj }) {
      state.bxResponse = obj;
    },
    changeBxResponse(state, { name, value }) {
      state.bxResponse[name] = value;
    },
    changeBxResponseItem(state, { block, name, value }) {
      block[name] = value;
    },
    changeBxResponseDisabled(state, fetchResult) {
      const disabled = {};

      Object.values(fetchResult.ITEMS).forEach((item) => {
        Object.values(item.VALUES).forEach((value) => {
          disabled[value.CONTROL_ID] = value.DISABLED;
        });
      });

      Object.values(state.bxResponse.ITEMS).forEach((item) => {
        Object.values(item.VALUES).forEach((value) => {
          value.DISABLED = disabled[value.CONTROL_ID];
        });
      });
    },
  },
  actions: {
    async change({ state, commit, getters }) {
      let controller = new AbortController(),
        response,
        result;

      // for local dev
      if (!window.BX) {
        if (!state.bxResponse) {
          commit('changeLoading', true);

          response = await fetch('/response.json');
          result = await response.json();

          commit('changeLoading', false);

          commit('bxResponse', {
            obj: result,
          });
        } else {
          response = await fetch('/response-checked.json');
          result = await response.json();

          commit('changeBxResponse', {
            name: 'ELEMENT_COUNT',
            value: result.ELEMENT_COUNT,
          });

          commit('changeBxResponse', {
            name: 'SEF_SET_FILTER_URL',
            value: result.SEF_SET_FILTER_URL,
          });

          commit('changeBxResponseDisabled', result);
        }
      }

      setTimeout(() => {
        if (!response) {
          controller.abort();
        }
      }, 20000);

      if (!state.bxResponse) {
        commit('changeLoading', true);

        response = await fetch(
          document.getElementById('vmFilter').getAttribute('data-url') ||
            '?ajax=y',
          {
            method: 'GET',
            signal: controller.signal,
          }
        );

        result = await response.json();

        if (result && typeof result === 'object') {
          commit('changeLoading', false);

          commit('bxResponse', {
            obj: result,
          });
        }
      } else {
        response = await fetch(
          `?ajax=y${state.bxResponse ? '&' + getters.formData : ''}`,
          {
            method: 'GET',
            signal: controller.signal,
          }
        );

        result = await response.json();

        if (result && typeof result === 'object') {
          commit('changeBxResponse', {
            name: 'ELEMENT_COUNT',
            value: result.ELEMENT_COUNT,
          });

          commit('changeBxResponse', {
            name: 'SEF_SET_FILTER_URL',
            value: result.SEF_SET_FILTER_URL,
          });

          commit('changeBxResponseDisabled', result);
        }
      }
    },
  },
  modules: {},
});
