<script setup lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let label: string;
	export let id: string;
	export let error_message: string = '';
	export let placeholder: string = '';
	export let password: boolean = false;

	function typeAction(node: HTMLInputElement) {
		node.type = password ? 'password' : 'text';
	}

	export let value = '';
	function updateValue(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		dispatch('input', (event.target as HTMLInputElement)?.value ?? '');
	}
</script>

<div class:error={error_message} class="form-field">
	<label for={id}>{label}</label>
	<input use:typeAction {id} bind:value on:input={updateValue} {placeholder} autocomplete="off" />
	{#if error_message}
		<div class="error-message">{error_message || '&nbsp;'}</div>
	{/if}
</div>

<style lang="scss">
	$transition-duration: 0.3s;

	.form-field {
		position: relative;
	}

	label,
	input {
		color: var(--c-on-main);
		background-color: var(--c-form-field-bg);
		padding-left: 15px;
		padding-right: 15px;

		cursor: text;

		transition:
			background-color $transition-duration ease,
			color $transition-duration ease;
	}

	label {
		display: flex;
		text-transform: uppercase;
		color: var(--c-form-field-label);
		font-size: 0.8rem;

		padding-top: 10px;
		border-radius: var(--form-input-radius) var(--form-input-radius) 0 0;

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
		border-radius: 0 0 var(--form-input-radius) var(--form-input-radius);

		&:focus {
			outline: none;
		}
	}

	// On focus
	.form-field:focus-within label,
	.form-field:focus-within input {
		background-color: var(--c-form-field-active-bg);
	}

	.form-field:focus-within label {
		color: var(--c-form-field-focused-label);
	}

	// Error message
	.form-field.error label,
	.form-field.error input {
		background-color: var(--c-form-field-error-bg);
	}

	.error-message {
		color: var(--c-form-field-error-label);
	}
</style>
