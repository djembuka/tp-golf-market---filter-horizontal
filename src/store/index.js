import { createStore } from 'vuex';

export default createStore({
  state: {},
  getters: {
    items(state) {
      return state.bxResponse ? Object.values(state.bxResponse.ITEMS) : [];
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
    changeBxResponseItem(state, { id, name, value }) {
      Object.values(state.bxResponse.ITEMS).find((item) => item.ID === id)[
        name
      ] = value;
    },
    changeBxResponseDisabled(state, fetchResult) {
      const disabled = {};

      Object.items(fetchResult.ITEMS).forEach((item) => {
        Object.items(item.VALUES).forEach((value) => {
          disabled[value.CONTROL_ID] = value.DISABLED;
        });
      });

      Object.items(state.bxResponse.ITEMS).forEach((item) => {
        Object.items(item.VALUES).forEach((value) => {
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

      setTimeout(() => {
        if (!response) {
          controller.abort();
        }
      }, 20000);

      if (!state.bxResponse) {
        response = await fetch(
          document.getElementById('vmFilter').getAttribute('data-filtered') ||
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