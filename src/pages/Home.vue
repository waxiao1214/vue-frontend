<template>
  <div class="container">
    <header>
      <p>Clients</p>
      <Button variation="primary" @on-click="openPopup">
        New Client
      </Button>
    </header>
    <Table></Table>
  </div>
  <div v-if="showPopup">
    <Modal/>
  </div>
  <div v-if="showAlert">
    <Notification />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import store from '../store'
import Table from '../components/Table.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';
import Notification from '../components/Notification.vue';

export default {
  name: 'Home',
  components: {
    Table,
    Button,
    Modal,
    Notification
},
  created() {
    store.dispatch('getClients');
    store.dispatch('getProviders');
  },
  computed: {
    ...mapState({
      showPopup: (state) => state.showPopup,
      showAlert: (state) => state.showAlert,
    })
  },
  methods: {
    openPopup() {
      store.dispatch('editClient', null)
    }
  }
}
</script>

<style scoped>
  .container {
    max-width: 1400px;
    margin: auto;
  }
  p {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
  }
  header {
    padding: 20px;
    background: #00008820;
    display: flex;
    justify-content: space-between;
  }
</style>