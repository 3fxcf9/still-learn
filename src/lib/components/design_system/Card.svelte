<script lang="ts">
	import { pb } from '$lib/pocketbase';

	import { createEventDispatcher, onDestroy } from 'svelte';
	const dispatch = createEventDispatcher();

	import { Trash } from '@steeze-ui/heroicons';

	import Button from '$lib/components/design_system/buttons/Button.svelte';
	import TextArea from '$lib/components/design_system/inputs/TextArea.svelte';

	export let id: string;
	export let term: string;
	export let definition: string;

	const autoSaveDelay = 1500;
	let saved = true;

	async function save() {
		try {
			if (id) await pb.collection('cards').update(id, { term, definition });
			else {
				if (term.length == 0 || definition.length == 0) throw false;

				const record = await pb.collection('cards').create({ term, definition });
				id = record.id;
				dispatch('create', { id });
			}
			saved = true;
		} catch (error) {
			console.error(error);
		}
	}

	onDestroy(save);

	let timeout: number;
	function oninput(e: Event) {
		saved = false;
		clearTimeout(timeout);
		timeout = setTimeout(save, autoSaveDelay);
	}

	let deleting = false;
</script>

<!-- TODO: Add status indicator -->
<div class="card" class:saved class:deleting>
	<TextArea label="Question" bind:value={term} on:input={oninput} id="term-textarea" />
	<TextArea label="Réponse" bind:value={definition} on:input={oninput} id="def-textarea" />

	<Button
		type="text"
		icon={Trash}
		on:click={() => {
			deleting = true;
			pb.collection('cards').delete(id);
			dispatch('delete', { id });
		}}
	></Button>
</div>

<style lang="scss">
	@import '$lib/components/dashboard/DashboardConfig.scss';
	@keyframes bg-delete {
		0% {
			filter: brightness(1);
		}
		50% {
			filter: brightness(0.9);
		}
	}

	.card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: $main-padding;

		padding: $main-padding;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--roundness);

		color: var(--c-on-bg);
		background-color: var(--c-bg);

		&.deleting {
			animation: bg-delete 1.2s infinite;
		}
	}

	:global(.form-textarea) {
		flex: 1;
	}
</style>
