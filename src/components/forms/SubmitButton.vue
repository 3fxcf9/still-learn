<template>
  <input type="submit" :value="props.text" />
</template>

<script setup lang="ts">
const props = defineProps({
  text: { type: String, required: false, default: "Valider" },
});
</script>

<style lang="scss" scoped>
input {
  border: none;
  color: white;
  background-color: black;
  padding: 20px 25px;
  border-radius: 5px;

  cursor: pointer;

  &:focus {
    outline: none;
    text-decoration: underline;
  }
}
</style>
