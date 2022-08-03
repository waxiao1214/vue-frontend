import { createStore } from 'vuex';
import { deleteApi, getApi, postApi, putApi } from '../utils/api';

const baseUrl = 'http://localhost:5000'

const store = createStore({
  state() {
    return {
      clients: [],
      providers: [],
      showPopup: false,
      currentClient: null,
      showAlert: null,
      altertText: ''
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
    setCurrentClient(state, payload) {
      state.currentClient = payload
    },
    setAlert(state, payload) {
      state.showAlert = payload.type
      state.altertText = payload.text
      setTimeout(() => {
        state.showAlert = null
        state.altertText = ''
      }, [2000])
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
      context.commit('setCurrentClient', null)
      context.commit('setPopup', false)
    },
    editClient(context, data) {
      context.commit('setCurrentClient', data)
      context.commit('setPopup', true)
    },
    async updateClient(context, data) {
      const id = data.id;
      const body = data.body;
      const url = `${baseUrl}/clients`;
      await putApi(`${url}/${id}`, body);
      const clients = await getApi(url);
      context.commit('setClients', clients);
      context.commit('setPopup', false);
    },
    async removeClient(context, id) {
      const url = `${baseUrl}/clients`;
      await deleteApi(`${url}/${id}`);
      const clients = await getApi(url);
      context.commit('setClients', clients);
      context.commit('setPopup', false);
      context.commit('setCurrentClient', null)
    },
    setAlert(context, data) {
      /**
       * interface data = {
       *    type: 'SUCCESS' | 'ERROR' | null;
       *    text: string
       * }
       */
      context.commit('setAlert', data)
    },
  }
})

export default store;