<template>
  <table>
    <thead>
      <tr>
        <th @click="sortByName">
          <div class="flex">
            <span>Name</span>
            <span v-if="nameDirection">&#8593;</span> 
            <span v-else>&#8595;</span>
          </div>
        </th>
        <th @click="sortByEmail">
          <div class="flex">
            <span>Email</span>
            <span v-if="emailDirection">&#8593;</span> 
            <span v-else>&#8595;</span>
          </div>
        </th>
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
        <td>{{ exProvidersName(client).join(", ") }}</td>
        <td @click="editClient(client)">Edit</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from 'vuex';
import store from '../store'
import { sortBy } from '../utils/functions';

export default {
  name: "Table",
  data() {
    return {
      nameDirection: true,
      emailDirection: false
    }
  },
  computed: {
    ...mapState({
      clients: (state) => state.clients,
      providers: (state) => state.providers
    })
  },
  methods: {
    sortByName() {
      this.nameDirection = !this.nameDirection
      this.clients = [...sortBy(this.clients, 'name', !this.nameDirection)]
    },
    sortByEmail() {
      this.emailDirection = !this.emailDirection
      this.clients = [...sortBy(this.clients, 'email', !this.emailDirection)]
    },
    editClient(currentClient) {
      store.dispatch('editClient', currentClient)
    },
    exProvidersName(client) {
      let subProviders = client.providers;
      return subProviders.map(subProvider => this.providers.filter(provider => provider._id === subProvider)[0]?.name)
    }
  }
}
</script>
<style scoped>
  thead, tbody, table {
    width: 100%;
    text-align: left;
  }
  th, td {
    padding: 10px 16px;
  }
  th {
    background: #f2f2f2;
    cursor: pointer;
  }
  table, th, td {
    border: 1px solid lightgray
  }
  table {
    border-collapse: collapse;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
  td:last-child {
    width: 40px;
    text-align: center;
    color: darkblue;
    cursor: pointer;
    font-weight: 600;
  }
  td:last-child:hover {
    text-decoration: underline;
  }
</style>