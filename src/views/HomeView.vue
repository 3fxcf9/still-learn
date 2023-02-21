<script setup lang="ts">
import { RouterLink } from "vue-router";
import Cta from "@/components/Cta.vue";
</script>

<template>
  <div id="home">
    <nav class="navbar">
      <span>Still-Learn Logo</span>
      <Cta text="Se connecter" toName="login" ctaStyle="compact" />
    </nav>
    <div class="section-1">
      <div class="circle"></div>
      <h1>Réviser n'a jamais été aussi facile</h1>
      <div class="cta-bar">
        <Cta text="Creer un compte" toName="register" ctaStyle="normal" />
        <Cta text="Explorer" toName="register" ctaStyle="normal" />
      </div>
    </div>
    <div class="section-2">
      <div class="features">
        <div class="feature">
          <div class="feature__img" />
          <div class="feature__content">
            <div class="feature__title">Feature title</div>
            <span class="feature__content"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
              iusto.</span
            >
          </div>
        </div>
        <div class="feature">
          <div class="feature__img" />
          <div class="feature__content">
            <div class="feature__title">Feature title</div>
            <span class="feature__content"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
              iusto.</span
            >
          </div>
        </div>
        <div class="feature">
          <div class="feature__img" />
          <div class="feature__content">
            <div class="feature__title">Feature title</div>
            <span class="feature__content"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
              iusto.</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="a"></div>
  </div>
</template>

<style lang="scss" scoped>
$c-landing-bg: #ffb92955;
$feature-height: 150px;

.navbar {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $c-landing-bg;
}

.navbar__login {
  background-color: $c-accent;
  color: $c-on-accent;
  text-decoration: none !important;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 3px;
}

// Section 1
.section-1 {
  text-align: center;
  padding-top: 5rem;
  padding-bottom: 10rem;
  background-color: $c-landing-bg;
}

.circle {
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-image: url("@/assets/images/register_bg.jpeg");
}

h1 {
  font-size: 3rem;
  font-family: "Unbounded";
  font-weight: 700;
  margin-top: 1rem;
}

.cta-bar {
  margin-top: 3rem;
  display: inline-flex;
  gap: 1rem;
}

.a {
  height: 200vh;
}

// Section 2
.section-2 {
  position: relative;
}
.features {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  gap: 1rem;
  transform: translateY(calc($feature-height / -2));
}

.feature {
  --padding: 1rem;
  height: $feature-height;
  display: flex;
  gap: 1rem;
  background-color: lighten(fade-in($c-landing-bg, 1), 20%);
  padding: var(--padding);
  border-radius: 20px;
  .feature__img {
    height: calc($feature-height - var(--padding) * 2);
    aspect-ratio: 1;
    background-image: url("@/assets/images/register_bg.jpeg");
    background-position: center;
    border-radius: 10px;
  }
  .feature__title {
    font-size: 1.2rem;
    font-weight: 800;
  }
}
</style>
