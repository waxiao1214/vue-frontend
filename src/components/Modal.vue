<template>
  <div class="modal">
    <div class="modal-content">
      <div class="header">
        <p>{{ currentClient ? "Edit Client": "New Client" }}</p>
      </div>
        <form @submit.prevent="">
      <div v-if="loaded" class="modal-content-body">
          <InputBox type="text" name="name" label="Name" :value="name" v-on:input="handleChange" />
          <InputBox type="email" name="email" label="Email" :value="email" v-on:input="handleChange" />
          <InputBox type="number" name="phone_number" label="Phone" :value="phone_number" v-on:input="handleChange" />
          <div class="flex">
            <InputBox name="providerName" label="Providers" :value="providerName" v-on:input="handleChange">
              <div class="provider-box">
                <div v-for="(provider, index) in providers" :key="index">
                  <div class="provider-item">
                    <input type="checkbox" :checked="provider.checked" @change="(selectProviders($event, provider))">
                    <p>{{ provider.name }}</p>	
                    <i class="fa fa-pencil-square-o"></i>
                    <i class="fa fa-trash-o" @click="removeProvider(provider._id)"></i>
                  </div>
                </div>
              </div>
            </InputBox>
            <div class="provider-button">
              <Button variation="primary" @on-click="addProvider">
                Add Provider
              </Button>
            </div>
          </div>
          <div class="footer">
            <div>
              <Button v-if="currentClient" variation="secondary" @click="removeClient">
                Delete Client
              </Button>
            </div>
            <div class="flex">
              <Button variation="primary" @click="closeModal">
                Cancel
              </Button>
              <Button type="submit" v-if="!currentClient" variation="primary" @click="addClient">
                Add Client
              </Button>
              <Button type="submit" v-else variation="primary" @click="updateClient">
                Edit Client
              </Button>
            </div>
          </div>
      </div>
        </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '../store'
import InputBox from './InputBox.vue';
import Button from './Button.vue';
export default {
  name: "Modal",
  components: {
    InputBox,
    Button
  },
  data() {
    return {
      providerName: '',
      email: '',
      name: '',
      phone_number: '',
      currentProviders: [],
      loaded: false,
    }
  },
  computed: {
    ...mapState({
      isOpen: (state) => state.showPopup,
      providers: (state) => state.providers.map(provider => {
        const currentProviders = state.currentClient ? [...state.currentClient.providers] : []
        return {...provider, checked: currentProviders.indexOf(provider._id) > -1 ? true : false}
      }
      ),
      currentClient: (state) => state.currentClient,
    })
  },
  created() {
    this.email = this.currentClient ? this.currentClient.email: ''
    this.name = this.currentClient ? this.currentClient.name: ''
    this.phone_number = this.currentClient ? this.currentClient.phone_number: ''
    this.currentProviders = this.currentClient ? [...this.currentClient.providers]: []
    this.loaded = true
  },
  methods: {
    removeProvider(id) {
      store.dispatch('removeProvider', id)
    },
    addProvider() {
      if(this.providerName === '') {
        store.dispatch('setAlert', {type: 'ERROR', text: 'Please input Provider name'})
        return
      }
      const data = {
        name: this.providerName
      }
      store.dispatch('addProvider', data);
      this.providerName = ''
    },
    handleChange(event) {
      if(event && event.target) this[event.target.name] = event.target.value;
    },
    selectProviders(event, provider) {
      const providerIds = this.providers.map(provider => provider._id);

      if(event && event.target) {
        event.target.checked ?
          this.currentProviders.push(provider._id) :
          this.currentProviders.splice(providerIds.indexOf(provider._id), 1)
      }
    },
    addClient() {
      if(!this.currentProviders || !this.email || !this.name || !this.phone_number ) {
        store.dispatch('setAlert', {type: 'ERROR', text: 'Some fields is missing!'})
        return
      }
      let data = {
        providers: this.currentProviders,
        email: this.email,
        name: this.name,
        phone_number: this.phone_number
      }
      store.dispatch('addClient', data);
    },
    closeModal() {
      store.dispatch('togglePopup', false)
    },
    updateClient() {
      const data = {
        body: {
          providers: this.currentProviders,
          email: this.email,
          name: this.name,
          phone_number: this.phone_number
        },
        id: this.currentClient._id
      }
      store.dispatch('updateClient', data)
    },
    removeClient() {
      const id = this.currentClient._id;
      store.dispatch('removeClient', id)
    }
  }
}
</script>
<style scoped>
  .modal {
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%; 
    overflow: auto;
    background-color: rgba(0,0,0,0.2);
  }

  /* Modal Content */
  .modal-content {
    background-color: #fefefe;
    border-radius: 4px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    margin: auto;
    position: relative;
    border: 1px solid #888;
    width: 80%;
    max-width: 800px;
  }
  .header p {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
  }
  .header {
    padding: 20px;
    background: #00008820;
    display: flex;
    justify-content: space-between;
  }
  .modal-content-body{
    width: 600px;
    margin: auto;
  }
  .flex {
    display: flex;
    gap: 12px
  }
  .provider-box {
    border-radius: 4px;
    margin-top: 8px;
    border: solid 1px lightgray;
    padding: 10px 16px;
  }
  .provider-box p {
    font-size: 18px;
    margin: 0;
    width: 100%
  }
  .provider-item {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }
  i {
    font-size: 20px;
    cursor: pointer;
  }
  input[type="checkbox"] {
    width: 24px;
    height: 24px;
  }
  .provider-button {
    margin-top: 6px;
  }
  .footer {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    padding: 16px;
    border-top: solid 1px lightgray;
    margin-top: 20px;
  }
</style>