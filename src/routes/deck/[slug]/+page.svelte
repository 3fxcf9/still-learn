<script lang="ts">
	import { pb } from '$lib/pocketbase';

	import Card from '$lib/components/design_system/Card.svelte';
	import Button from '$lib/components/design_system/buttons/Button.svelte';

	/** @type {import('./$types').PageData} */
	type Card = { id: string; term: string; definition: string };
	export let data: { deck_name: string; deck_id: string; cards: Card[] };

	// Pagination
	import { page } from '$app/stores';
	let page_nb = 1;

	function gotoPage(nb: number) {
		page_nb = nb;
	}

	function createCard() {
		console.log(data.cards);

		data.cards = data.cards.concat([{ id: '', term: '', definition: '' }]);
	}

	async function appendNewCardId(id: string) {
		console.log(id);

		await pb.collection('decks').update(data.deck_id, { 'cards+': [id] });
	}

	async function deleteCard(id: string) {
		data.cards = data.cards.filter((c) => c.id != id);
	}
</script>

<div id="deck-info">
	<h1>{data.deck_name}</h1>
	<div class="cards-list">
		{#if data.cards}
			{#each data.cards as card}
				<Card id={card.id} term={card.term} definition={card.definition} on:create={(e) => appendNewCardId(e.detail.id)} on:delete={() => deleteCard(card.id)} />
			{/each}
		{:else}
			Aucune carte
		{/if}

		<Button type="filled" variant="primary" on:click={createCard}>Creer une carte</Button>
	</div>
</div>

<style lang="scss">
	@import '$lib/components/dashboard/DashboardConfig.scss';

	#deck-info {
		padding: $main-padding;
	}
	.cards-list {
		display: flex;
		flex-direction: column;
		gap: $main-padding;
	}
</style>
