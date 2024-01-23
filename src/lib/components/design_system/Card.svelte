<script lang="ts">
	import { PencilSquare } from '@steeze-ui/heroicons';

	import Button from './buttons/Button.svelte';

	export let term: string;
	export let definition: number;
</script>

<div class="card">
	<span class="card__term">{term}</span>
	<span class="card__definition">{definition}</span>

	<Button type="text" icon={PencilSquare}>Modifier</Button>
</div>

<style type="scss">
	/* TODO: Better layout with grid and text-overflow */
	.card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;

		padding: 1rem;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--roundness);

		color: var(--c-on-bg);
	}
</style>
