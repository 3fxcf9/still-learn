<script setup lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	import { pb } from '$lib/pocketbase';

	// Icons
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Home, FolderOpen, Heart, ArrowLeftOnRectangle } from '@steeze-ui/heroicons';

	function logout() {
		pb.authStore.clear();
		goto(base + '/login');
	}

	const menuitems = [
		{
			name: 'Accueil',
			link: '/dashboard',
			icon: Home
		},
		{
			name: 'Mes collections',
			link: '/dashboard/decks',
			icon: FolderOpen
		},
		{
			name: 'Suivis',
			link: '/dashboard/followed',
			icon: Heart
		}
	];
</script>

<nav>
	<ul>
		{#each menuitems as item}
			<a href="{base}{item.link}" class:active={$page.url.pathname.endsWith(item.link)}>
				<li class="menuitem">
					<Icon src={item.icon} size="24px" theme="default" class="menuitem__svg" />
					<span class="menuitem__label">{item.name}</span>
				</li>
			</a>
		{/each}
	</ul>

	<div
		role="button"
		tabindex="0"
		class="menuitem logout"
		on:click|preventDefault={logout}
		on:keyup={(e) => {
			if (e.code == 'Space' || e.code == 'Enter') logout();
		}}
	>
		<Icon src={ArrowLeftOnRectangle} size="24px" theme="default" class="menuitem__svg" />
		<span class="menuitem__label">Se déconnecter</span>
	</div>
</nav>

<style lang="scss">
	@import './DashboardConfig.scss';

	nav {
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: space-between;

		padding: $navbar-padding;
	}

	a {
		text-decoration: none;
	}

	a.active li {
		color: var(--c-on-bg-dimmed-1);
		background-color: var(--c-bg-contrast-1);
	}

	.menuitem {
		display: flex;
		align-items: center;
		gap: $navbar-items-gap;

		margin-bottom: $navbar-items-gap;
		padding: $navbar-padding;

		color: var(--c-on-bg-dimmed-3);
		border-radius: var(--roundness);

		&:hover {
			color: var(--c-on-bg-dimmed-1);
			background-color: var(--c-bg-contrast-1);
		}

		&.logout {
			cursor: pointer;
			margin-bottom: 0;
		}
	}
	:global(.menuitem__svg) {
		width: $icon-size;
		height: $icon-size;
	}
</style>
