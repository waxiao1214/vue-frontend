<template>
<div class="input-control">
  <label>{{ label }}:</label>
  <div class="input-wrapper">
    <input :name="name" type="text" v-model="inputValue" @change="this.$emit('change', inputValue)"/>
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
    name: String
  },
  data() {
    return {
      inputValue: this.value
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