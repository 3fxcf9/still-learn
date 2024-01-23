<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import type { RecordModel } from 'pocketbase';
	import { page } from '$app/stores';
	import Card from '$lib/components/design_system/Card.svelte';

	let page_nb = 1;

	function gotoPage(nb: number) {
		page_nb = nb;
	}

	let deck_request: Promise<RecordModel> | undefined = undefined;
	// TODO: Check if empty and remove useless reaction
	$: {
		deck_request = pb.collection('decks').getOne($page.params.slug, {
			expand: 'cards' // TODO: Sort expands by date desc
		});
	}
</script>

<div id="deck-info">
	{#if deck_request}
		{#await deck_request}
			Chargement ...
		{:then deck_details}
			<h1>{deck_details.name}</h1>
			<div class="cards-list">
				{#if deck_details.expand?.cards}
					{#each deck_details.expand.cards as card}
						<Card term={card.term} definition={card.definition} />
					{/each}
				{:else}
					Aucune carte
				{/if}
			</div>
		{/await}
	{/if}
</div>

<style type="scss">
	#deck-info {
		padding: 1rem;
	}
	.cards-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
