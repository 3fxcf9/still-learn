<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { UserCircle, Eye, AcademicCap } from '@steeze-ui/heroicons';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	import Button from './buttons/Button.svelte';

	export let id: string;
	export let name: string;
	export let size: number;
	export let description: string;
	export let owner: string;
	export let avatar_url: string;
</script>

<div class="deck">
	<div class="deck__infos">
		<div class="infos__top">
			<span class="deck__name">{name}</span>
			<span class="deck__size">{size} carte{size > 1 ? 's' : ''}</span>
		</div>

		<div class="deck__description">{description || 'Aucune description'}</div>

		<div class="deck__owner">
			{#if avatar_url}
				<div class="deck-owner__avatar" style="background-image: url('{avatar_url}')"></div>
			{:else}
				<div class="deck-owner__avatar no-avatar">
					<Icon src={UserCircle} size="24px" theme="mini" class="no-avatar-icon" />
				</div>
			{/if}
			<span class="deck-owner__username">{owner}</span>
		</div>
	</div>
	<div class="deck__actions">
		<Button type="text" icon={Eye} on:click={() => goto(`${base}/deck/${id}`)}>Voir</Button>
		<Button type="text" icon={AcademicCap}>Réviser</Button>
	</div>
</div>

<style type="scss">
	.deck {
		display: flex;
		justify-content: space-between;
		gap: 1rem;

		padding: 1rem;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--roundness);

		color: var(--c-on-bg);
	}

	.deck__infos,
	.deck__actions {
		display: flex;
		flex-direction: column;
	}

	.deck__infos {
		justify-content: space-between;
		gap: 1rem;
		min-width: 0;
	}
	.deck__actions {
		justify-content: space-around;
	}

	.infos__top {
		display: flex;
		align-items: baseline;
	}

	.deck__name {
		font-size: 1.2rem;
		font-weight: 800;

		white-space: nowrap;
		flex: 0 1 auto;
		text-overflow: ellipsis;
		overflow: hidden;
		min-width: 0px;
	}
	.deck__size {
		margin-left: 1rem;

		color: var(--c-on-bg-dimmed-2);
		font-style: italic;
		white-space: nowrap;
	}
	.deck__description {
		color: var(--c-on-bg-dimmed-3);

		line-height: 1.2rem;
		height: calc(2 * 1.2rem);

		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.deck__owner {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.deck-owner__avatar {
		height: 1.6rem;
		aspect-ratio: 1;
		border-radius: 50%;
		background-size: cover;
	}

	:global(.no-avatar-icon) {
		width: 1.6rem;
		height: 1.6rem;

		color: var(--c-primary);
	}
</style>
