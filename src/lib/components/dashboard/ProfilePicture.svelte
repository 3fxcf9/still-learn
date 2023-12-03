<script setup lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	import { currentUser, pb } from '$lib/pocketbase';

	// Icons
	import { Icon } from '@steeze-ui/svelte-icon';
	import { UserCircle, Cog6Tooth, ArrowLeftOnRectangle } from '@steeze-ui/heroicons';

	function logout() {
		pb.authStore.clear();
		goto(base + '/login');
	}

	const name_capital = ($currentUser?.name || $currentUser?.username)[0].toUpperCase();

	let dropdown_open = false;

	const dropdown_items = [
		{
			name: 'Profil',
			onclick: () => {},
			icon: UserCircle
		},
		{
			name: 'Paramètres',
			onclick: () => {},
			icon: Cog6Tooth
		},
		{
			name: 'Se&nbsp;déconnecter',
			onclick: logout,
			icon: ArrowLeftOnRectangle
		}
	];
</script>

<div
	class="user-profile-pic"
	class:dropdown_open
	role="button"
	tabindex="0"
	on:click={(e) => {
		if (e.currentTarget == e.target) dropdown_open = !dropdown_open;
	}}
	on:keyup={(e) => {
		if (e.code == 'Space' || e.code == 'Enter') {
			if (e.currentTarget == e.target) dropdown_open = !dropdown_open;
		}
	}}
>
	{name_capital}
	<div class="dropdown">
		{#each dropdown_items as item}
			<button class="dropdown-item" on:click={item.onclick}>
				<Icon src={item.icon} size="24px" theme="default" class="dropdown-item__svg" />
				<span class="menuitem__label">{@html item.name}</span>
			</button>
		{/each}
	</div>
</div>

{#if dropdown_open}
	<!-- TODO: Add tab focus hint -->
	<div
		class="account-curtain"
		role="button"
		tabindex="0"
		on:click={() => {
			dropdown_open = false;
		}}
		on:keyup={(e) => {
			if (e.code == 'Space' || e.code == 'Enter') dropdown_open = false;
		}}
	></div>
{/if}

<style lang="scss">
	@import './DashboardConfig.scss';

	.user-profile-pic {
		height: calc($navbar-height - 2 * $navbar-padding);
		aspect-ratio: 1;

		display: flex;
		align-items: center;
		justify-content: center;

		border-radius: 50%;

		color: var(--c-on-accent);
		background-color: var(--c-accent);

		font-size: 1.2rem;
		font-weight: bold;

		cursor: pointer;
	}

	// Dropdown
	.dropdown {
		display: none;

		position: absolute;
		top: calc(100% + 2 * $navbar-padding);
		right: 0;

		border: var(--border-width) solid var(--border-color);
		padding: $navbar-padding;
		border-radius: calc(var(--roundness) + $navbar-padding);

		background-color: var(--c-bg);

		z-index: 1000;
		cursor: initial;
	}

	.user-profile-pic.dropdown_open .dropdown {
		display: block;
	}

	// Dropdown item
	.dropdown-item:not(:last-of-type) {
		margin-bottom: $navbar-items-gap;
	}

	.dropdown-item {
		width: 100%;

		display: flex;
		align-items: center;
		gap: $navbar-items-gap;

		border: none;
		padding: $navbar-padding;
		border-radius: var(--roundness);

		color: var(--c-on-bg-dimmed-3);
		background-color: initial;

		cursor: pointer;

		&:hover {
			background-color: var(--c-bg-contrast-1);
			color: var(--c-on-bg-dimmed-1);
		}
	}
	:global(.dropdown-item__svg) {
		width: $icon-size;
		height: $icon-size;
	}

	// Curtain
	.account-curtain {
		height: 100%;
		width: 100%;

		position: fixed;
		top: 0;
		left: 0;

		background-color: var(--c-curtain);
		z-index: 999;
	}
</style>
