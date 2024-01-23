<script lang="ts">
	import { Icon, type IconSource } from '@steeze-ui/svelte-icon';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	type ButtonTypes = 'filled' | 'outlined' | 'text';
	type ButtonVariants = 'primary' | 'accent' | '';

	export let type: ButtonTypes = 'filled';
	export let variant: ButtonVariants = '';
	export let icon: IconSource | undefined = undefined;
</script>

<button class="btn btn--{type} btn--{variant}" on:click={() => dispatch('click')}>
	{#if icon}
		<Icon src={icon} size="24px" theme="default" class="btn__icon" />
	{/if}
	<slot />
</button>

<style type="scss">
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;

		border: none;
		padding: 0.8rem;
		border-radius: var(--roundness);

		color: var(--c-on-bg-dimmed-3);
		background-color: initial;

		cursor: pointer;

		&:hover {
			color: var(--c-on-bg-dimmed-1);
			background-color: var(--c-bg-contrast-1);
		}
	}

	.btn--primary {
		color: var(--c-on-primary);
		background-color: var(--c-primary);

		&:hover {
			color: var(--c-on-primary);
			background-color: var(--c-primary-contrast-1);
		}
	}
</style>
