import { createStore } from 'vuex';

export default createStore({
  state: {},
  getters: {
    items(state) {
      if (
        state.bxResponse &&
        state.bxResponse.ITEMS &&
        typeof state.bxResponse.ITEMS === 'object'
      ) {
        const items = state.bxResponse.ITEMS;
        const a = Object.values(items).filter((item) => {
          if (
            item.PROPERTY_TYPE === 'L' &&
            typeof item.VALUES === 'object' &&
            item.VALUES.length === undefined
          ) {
            return true;
          }
          return false;
        });
        return a.length ? a : [];
      }
    },
    checkedCount(state) {
      if (
        state.bxResponse &&
        state.bxResponse.ITEMS &&
        typeof state.bxResponse.ITEMS === 'object'
      ) {
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
        return a.length;
      }
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
    check(state, { id, checked, blockId }) {
      const block = Object.values(state.bxResponse.ITEMS).find(
        (item) => item.ID === blockId
      );
      const item = Object.values(block.VALUES).find(
        (value) => value.CONTROL_ID === id
      );
      item.CHECKED = checked;
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
          response = await fetch('/response.json');
          result = await response.json();

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
