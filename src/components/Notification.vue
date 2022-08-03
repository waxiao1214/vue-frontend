<!-- TO DO: Need to update component and store to use multi-alert -->
<template>
  <div class="notification">
    <div :class="showAlert">
      <span>{{ altertText }}</span>
      <span @click="closeAlert">&#10006;</span>
    </div>
  </div>
</template>

<script>
import store from '../store';
import { mapState } from 'vuex';

export default {
  name: 'Notification',
    computed: {
    ...mapState({
      altertText: (state) => state.altertText,
      showAlert: (state) => state.showAlert
    })
  },
  methods: {
    closeAlert() {
      store.dispatch('setAlert', { type: null, text: '' })
    }
  }
}
</script>
<style scoped>
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 2;
    min-width: 200px;
    width: fit-content;
    text-align: center;
    color: white;
    font-size: 12px;
    font-weight: 600;
  }
  div {
    padding: 10px 20px;
    border-radius: 8px;
    display: flex;
    gap: 30px;
    justify-content: space-between;
  }
  span:nth-child(2) {
    cursor: pointer;
  }
  .SUCCESS {
    background: rgb(3, 100, 3);
  }
  .ERROR {
    background: rgb(160, 4, 4);
  }
</style>