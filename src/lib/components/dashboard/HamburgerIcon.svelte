<script setup lang="ts">
	// Icons
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Bars3, XMark } from '@steeze-ui/heroicons';

	export let state = false;

	function toggleState() {
		state = !state;
	}
</script>

<div
	class="menu-hamburger-icon"
	role="button"
	tabindex="0"
	on:click={toggleState}
	on:keyup={(e) => {
		if (e.code == 'Space' || e.code == 'Enter') toggleState();
	}}
>
	<Icon src={state ? XMark : Bars3} size="24px" theme="default" class="menu-hamburger-icon__svg" />
</div>

<style lang="scss">
	@import './DashboardConfig.scss';
	$hamburger-icon-size: 2rem;

	.menu-hamburger-icon {
		height: 100%;

		display: flex;
		align-items: center;
		justify-content: center;

		padding-left: $navbar-padding;

		cursor: pointer;
	}
	:global(.menu-hamburger-icon__svg) {
		width: $hamburger-icon-size;
		height: $hamburger-icon-size;
	}
</style>
