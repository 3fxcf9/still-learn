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
$field-bg: #ebeff2;
$field-bg-active: #d5dbdf;

label,
input {
  background-color: $field-bg;
  padding-left: 15px;
}

label {
  display: flex;
  text-transform: uppercase;
  color: #636769;
  font-size: 0.8rem;

  padding-top: 10px;
  border-radius: 5px 5px 0 0;
}

input {
  border: none;
  width: 100%;

  padding-top: 5px;
  padding-bottom: 10px;
  border-radius: 0 0 5px 5px;

  &:focus {
    outline: none;
  }
}
.form-field:focus-within label,
.form-field:focus-within input {
  background-color: $field-bg-active;
}
</style>
