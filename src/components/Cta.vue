<template>
  <button :style="getStyle()" @click="$router.push({ name: props.toName })">
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
type CtaStyle = "normal" | "compact";

const props = defineProps({
  text: { type: String, required: true },
  toName: { type: String, required: true },
  ctaStyle: { type: String, required: false, default: "normal" },
});

const styles = {
  normal: {
    height: "3.5rem",
    padding: "0 2.5rem",
    "border-radius": "3px",
  },
  compact: {
    height: "2rem",
    padding: "0 1.5rem",
    "border-radius": "1rem",
  },
};

const getStyle = () => {
  console.log(props.ctaStyle, styles[<CtaStyle>props.ctaStyle] || {});

  return styles[<CtaStyle>props.ctaStyle] || {};
};
</script>

<style lang="scss">
button {
  border: none;
  color: $c-on-primary;
  background-color: $c-primary;
  text-transform: uppercase;

  cursor: pointer;

  &:hover {
    color: $c-on-primary;
  }

  &:focus {
    outline: none;
    text-decoration: underline;
    outline: none;
  }
}
</style>
