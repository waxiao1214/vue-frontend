import { createStore } from 'vuex';
import { deleteApi, getApi, postApi } from '../utils/api';

const baseUrl = 'http://localhost:5000'

const store = createStore({
  state() {
    return {
      clients: [],
      providers: [],
      showPopup: false,
      currentClient: null,
    }
  },
  mutations: {
    setClients(state, payload) {
      state.clients = [...payload];
    },
    setProviders(state, payload) {
      state.providers = payload
    },
    setPopup(state, payload) {
      state.showPopup = payload
    },
  },
  actions: {
    async getClients(context) {
      const url = `${baseUrl}/clients`;
      const clients = await getApi(url);
      context.commit('setClients', clients);
    },
    async getProviders(context) {
      const url = `${baseUrl}/providers`;
      const providers = await getApi(url);
      context.commit('setProviders', providers)
    },
    togglePopup(context, value) {
      context.commit('setPopup', value)
    },
    async removeProvider(context, id) {
      const url = `${baseUrl}/providers`;
      await deleteApi(`${url}/${id}`);
      const providers = await getApi(url);
      context.commit('setProviders', providers);
    },
    async addProvider(context, data) {
      const url = `${baseUrl}/provider`;
      await postApi(url, data);
      const providers = await getApi(`${baseUrl}/providers`);
      context.commit('setProviders', providers);
    },
    async addClient(context, data) {
      const url = `${baseUrl}/client`;
      await postApi(url, data);
      const clients = await getApi(`${baseUrl}/clients`)
      context.commit('setClients', clients)
      context.commit('setPopup', false)
    }
  }
})

export default store;