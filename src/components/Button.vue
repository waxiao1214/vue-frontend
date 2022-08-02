<template>
  <button :class=[variation] @click="$emit('onClick')">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    variation: String
  }
}
</script>

<style scoped>
  button {
    width: 130px;
    min-width: 130px;
    border-radius: 8px;
    outline: none;
    padding: 6px;
    font-weight: 600;
    height: 36px;
    font-size: 16px;
    border: solid 1px #80808080;
    cursor: pointer;
  }
  .primary {
    background: linear-gradient(white, #80808080);
  }
  .primary:hover {
    background: linear-gradient(#80808080, white);
  }
  .secondary {
    background: linear-gradient(#FFFFFF10 10%, red 95%);
    color: white
  }
  .secondary:hover {
    background: linear-gradient(red , #FFFFFF10 95%);
  }
</style>