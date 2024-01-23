<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import type { ListResult, RecordModel } from 'pocketbase';
	import Deck from '$lib/components/design_system/Deck.svelte';
	import Button from '$lib/components/design_system/buttons/Button.svelte';

	let page = 1;

	function gotoPage(nb: number) {
		page = nb;
	}

	let deck_request: Promise<ListResult<RecordModel>> | undefined = undefined;
	$: {
		deck_request = pb.collection('decks').getList(page, 20, {
			expand: 'owner',
			sort: '-created'
		});
	}

	function avatarURL(deck: RecordModel): string {
		return pb.files.getUrl(deck.expand?.owner, deck.expand?.owner.avatar, { thumb: '25x25' });
	}
</script>

{#if deck_request}
	{#await deck_request}
		Chargement ...
	{:then deck_list}
		<div class="deck-list">
			{#each deck_list.items as deck}
				<Deck id={deck.id} name={deck.name} size={deck.cards.length} owner={deck.expand?.owner.username ?? 'inconnu'} avatar_url={avatarURL(deck)} description={deck.description} />
			{/each}
		</div>

		<!-- Pages -->
		{#if deck_list.totalPages > 1}
			{#each [...new Array(deck_list.totalPages).keys()].map((v) => v + 1) as page_id}
				{@const variant = page_id == page ? 'primary' : ''}
				<Button type="text" {variant} on:click={() => gotoPage(page_id)}>{page_id}</Button>
			{/each}
		{/if}
	{/await}
{/if}

<style type="scss">
	.deck-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		grid-gap: 1rem;
	}
</style>
