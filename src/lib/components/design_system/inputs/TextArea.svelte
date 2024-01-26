<script setup lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let label: string;
	export let id: string;
	export let error_message: string = '';
	export let placeholder: string = '';
	export let value = '';

	function updateValue(event: Event & { currentTarget: EventTarget & HTMLTextAreaElement }) {
		dispatch('input', (event.target as HTMLTextAreaElement)?.value ?? '');
	}
</script>

<div class:error={error_message} class="form-textarea">
	<label for={id}>{label}</label>
	<textarea {id} bind:value on:input={updateValue} {placeholder} autocomplete="off"></textarea>
	{#if error_message}
		<div class="error-message">{error_message || '&nbsp;'}</div>
	{/if}
</div>

<style lang="scss">
	$transition-duration: 0.3s;

	.form-textarea {
		position: relative;
	}

	label,
	textarea {
		padding-left: 15px;
		padding-right: 15px;

		color: var(--c-on-bg);
		background-color: var(--c-bg-contrast-1);

		cursor: text;

		transition:
			background-color $transition-duration ease,
			color $transition-duration ease;
	}

	label {
		display: flex;

		padding-top: 10px;
		border-radius: var(--roundness) var(--roundness) 0 0;

		color: var(--c-on-bg-dimmed-3);

		font-size: 0.8rem;
		text-transform: uppercase;

		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	textarea {
		width: 100%;

		border: none;
		padding-top: 5px;
		padding-bottom: 10px;
		border-radius: 0 0 var(--roundness) var(--roundness);

		resize: none;

		&:focus {
			outline: none;
		}
	}

	// On focus
	.form-textarea:focus-within label,
	.form-textarea:focus-within textarea {
		background-color: var(--c-bg-contrast-2);
	}

	.form-textarea:focus-within label {
		color: var(--c-on-bg-dimmed-2);
	}

	// Error message
	.form-textarea.error label,
	.form-textarea.error textarea {
		background-color: var(--c-bg-error);
	}

	.error-message {
		color: var(--c-on-bg-error);
	}
</style>
