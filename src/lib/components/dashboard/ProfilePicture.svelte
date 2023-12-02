<script setup lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { currentUser, pb } from '$lib/pocketbase';

	import { Icon } from '@steeze-ui/svelte-icon';

	//import as many icons from a Icon Pack
	import { UserCircle, Cog6Tooth, ArrowLeftOnRectangle } from '@steeze-ui/heroicons';

	function logout() {
		pb.authStore.clear();
		goto(base + '/login');
	}

	const name_capital = ($currentUser?.name || $currentUser?.username)[0].toUpperCase();

	let dropdown_open: boolean = false;
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
		if (e.key == ' ' || e.key == 'Enter') {
			if (e.currentTarget == e.target) dropdown_open = !dropdown_open;
		}
	}}
>
	{name_capital}
	<div class="dropdown">
		<button class="dropdown-item">
			<Icon src={UserCircle} size="24px" theme="default" class="dropdown-item__svg" />
			<span class="menuitem__label">Profil</span>
		</button>
		<button class="dropdown-item">
			<Icon src={Cog6Tooth} size="24px" theme="default" class="dropdown-item__svg" />
			<span class="menuitem__label">Paramètres</span>
		</button>
		<button class="dropdown-item logout" on:click={logout}>
			<Icon src={ArrowLeftOnRectangle} size="24px" theme="default" class="dropdown-item__svg" />
			<span class="menuitem__label">Se&nbsp;déconnecter</span>
		</button>
	</div>
</div>

{#if dropdown_open}
	<div
		class="account-curtain"
		role="button"
		tabindex="0"
		on:click={() => {
			dropdown_open = false;
		}}
		on:keyup={(e) => {
			if (e.key == ' ' || e.key == 'Enter') dropdown_open = false;
		}}
	></div>
{/if}

<style lang="scss">
	@import './DashboardConfig.scss';

	.user-profile-pic {
		height: calc($navbar-height - 2 * $navbar-padding);
		aspect-ratio: 1;
		border-radius: 50%;

		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--c-accent);
		color: var(--c-on-accent);
		font-weight: bold;
		font-size: 1.2rem;

		cursor: pointer;
	}

	// Dropdown
	.dropdown {
		display: none;

		position: absolute;
		top: calc(100% + 2 * $navbar-padding);
		right: 0;
		padding: $navbar-padding;

		z-index: 1000;
		cursor: initial;

		background-color: var(--c-main-bg);
		border: var(--border-width) solid var(--border-color);
		border-radius: calc(var(--form-input-radius) + $navbar-padding);
	}

	.user-profile-pic.dropdown_open .dropdown {
		display: block;
	}

	// Dropdown item
	.dropdown-item:not(:last-of-type) {
		margin-bottom: $navbar-items-gap;
	}

	.dropdown-item {
		cursor: pointer;

		background-color: initial;
		border: none;
		width: 100%;

		padding: $navbar-padding;

		display: flex;
		align-items: center;
		gap: $navbar-items-gap;

		color: var(--c-on-main-disabled);
		border-radius: var(--form-input-radius);

		&:hover {
			background-color: var(--c-main-bg-hover);
			color: var(--c-on-main-dimmed);
		}

		&.logout {
			cursor: pointer;
			margin-bottom: 0;
		}
	}
	:global(.dropdown-item__svg) {
		width: $icon-size;
		height: $icon-size;
	}

	// Curtain
	.account-curtain {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: var(--c-curtain);
		z-index: 999;
	}
</style>
