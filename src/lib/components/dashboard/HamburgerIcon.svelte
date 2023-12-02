<script setup lang="ts">
	// Icons
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Bars3, XMark } from '@steeze-ui/heroicons';

	export let state: boolean = false;

	let className = '';
	export { className as class };

	function updateState() {
		state = !state;
	}
</script>

<div
	class="{className} menu-hamburger-icon"
	role="button"
	tabindex="0"
	on:click={updateState}
	on:keyup={(e) => {
		if (e.key == ' ' || e.key == 'Enter') updateState();
	}}
>
	<Icon src={state ? XMark : Bars3} size="24px" theme="default" class="menu-hamburger-icon__svg" />
</div>

<style lang="scss">
	@import './DashboardConfig.scss';

	.menu-hamburger-icon {
		height: 100%;
		padding-left: $navbar-padding;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	:global(.menu-hamburger-icon__svg) {
		width: 2rem;
		height: 2rem;
	}
</style>
