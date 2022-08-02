<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Providers</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(client, index) in clients" :key="index">
        <td>{{ client.name }}</td>
        <td>{{ client.email }}</td>
        <td>{{ client.phone_number }}</td>
        <td>{{ client.providers }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from 'vuex';
import { exProvidersName } from '../utils/functions'
export default {
  name: "Table",
  computed: {
    ...mapState({
      clients: (state) => state.clients
    })
  },
  created() {
    console.log(this.clients)
    this.clients = exProvidersName(this.clients)
  }
}
</script>
<style scoped>

</style>