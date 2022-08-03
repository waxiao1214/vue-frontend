<template>
  <div class="input-control">
    <label>{{ label }}:</label>
    <div class="input-wrapper">
      <input :name="name" :type="type" v-bind:value="inputValue" v-on:input="inputValue = $event.target.value"/>
      <slot />
    </div>
  </div>
</template>

<script>


export default {
  name: 'InputBox',
  props: {
    label: String,
    value: String,
    data: String,
    name: String,
    type: String
  },
  data() {
    return {
      inputValue: this.value
    }
  },
  watch: {
    value() {
      this.inputValue = this.value
    }
  }
}

</script>

<style scoped>
input {
  outline: none;
  border: solid 1px lightgray;
  border-radius: 4px;
  height: 36px;
  width: 100%;
  font-size: 16px;
  padding-left: 12px;
  margin: 6px 0;
  box-sizing: border-box;
}

.input-control {
  display: flex;
  width: 100%;
}

label {
  font-size: 18px;
  font-weight: 600;
  min-width: 140px;
  margin-top: 12px;
  width: 140px;
  text-align: right;
  margin-right: 10px;
}

.input-wrapper {
  width: 100%;
}
</style>