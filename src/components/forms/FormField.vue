<template>
  <div class="form-field">
    <label :for="props.id">{{ props.label }}</label>
    <input
      :type="props.type"
      :id="props.id"
      :value="props.modelValue"
      v-on:input="updateValue((<HTMLInputElement>$event.target).value)"
      autocomplete="off"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: { type: String, required: false, default: "text" },
  label: { type: String, required: true },
  id: { type: String, required: true },
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(value: string) {
  emit("update:modelValue", value);
}
</script>

<style lang="scss" scoped>
$transition-duration: 0.3s;

label,
input {
  background-color: $c-form-field-bg;
  padding-left: 15px;

  cursor: text;

  transition: background-color $transition-duration ease,
    color $transition-duration ease;
}

label {
  display: flex;
  text-transform: uppercase;
  color: $c-form-field-label;
  font-size: 0.8rem;

  padding-top: 10px;
  border-radius: $form-input-radius $form-input-radius 0 0;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

input {
  border: none;
  width: 100%;

  padding-top: 5px;
  padding-bottom: 10px;
  border-radius: 0 0 $form-input-radius $form-input-radius;

  &:focus {
    outline: none;
  }
}
.form-field:focus-within label,
.form-field:focus-within input {
  background-color: $c-form-field-active-bg;
}

.form-field:focus-within label {
  color: $c-form-field-focused-label;
}
</style>
