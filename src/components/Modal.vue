<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <div class="header">
        <p>{{ currentClient ? "Edit Client": "New Client" }}</p>
      </div>
      <div class="modal-content-body">
        <InputBox name="name" label="Name" v-bind:value="name" @change="handleChange" />
        <InputBox name="email" label="Email" v-bind:value="email" @change="handleChange" />
        <InputBox name="phone_number" label="Phone" v-bind:value="phone_number" @change="handleChange" />
        <div class="flex">
          <InputBox name="providerName" label="Providers" v-bind:value="providerName" @change="handleChange">
            <div class="provider-box">
              <div v-for="(provider, index) in providers" :key="index">
                <div class="provider-item">
                  <input type="checkbox" @change="(selectProviders($event, provider))">
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
      </div>
      <div class="footer">
        <Button variation="primary" @click="closeModal">
          Cancel
        </Button>
        <Button variation="primary" @click="addClient">
          Add Client
        </Button>
      </div>
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
      currentProviders: []
    }
  },
  computed: {
    ...mapState({
      isOpen: (state) => state.showPopup,
      providers: (state) => state.providers,
      currentClient: (state) => state.currentClient
    })
  },
  methods: {
    removeProvider(id) {
      store.dispatch('removeProvider', id)
    },
    addProvider() {
      const data = {
        name: this.providerName
      }
      store.dispatch('addProvider', data);
    },
    handleChange(event) {
      if(event && event.target) this[event.target.name] = event.target.value;
    },
    selectProviders(event, provider) {
      if(event && event.target) {
        event.target.checked ?
          this.currentProviders.push(provider._id) :
          this.currentProviders.splice(this.providers.indexOf(provider._id), 1)
      }
    },
    addClient() {
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
    width: 20px;
    height: 20px;
  }
  .provider-button {
    margin-top: 6px;
  }
  .footer {
    display: flex;
    gap: 20px;
    justify-content: end;
    padding: 16px;
    border-top: solid 1px lightgray;
    margin-top: 20px;
  }
</style>