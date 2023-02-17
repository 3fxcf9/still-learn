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
  color: $c-on-primary;
  background-color: $c-primary;
  border-radius: $form-input-radius;
  padding: 20px 25px;
  text-transform: uppercase;

  cursor: pointer;

  &:focus {
    outline: none;
    text-decoration: underline;
  }
}
</style>
