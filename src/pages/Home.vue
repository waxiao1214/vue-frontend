<template>
  <div class="container">
    <header>
      <p>Clients</p>
      <Button variation="primary" @on-click="openPopup">
        New Client
      </Button>
    </header>
    <Table></Table>
    <Modal/>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import store from '../store'
import Table from '../components/Table.vue';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'Home',
  components: {
    Table,
    Button,
    Modal,
},
  created() {
    store.dispatch('getClients');
    store.dispatch('getProviders');
  },
  computed: {
    ...mapState({
      showPopup: (state) => state.showPopup
    })
  },
  methods: {
    openPopup() {
      store.dispatch('togglePopup', !this.showPopup)
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