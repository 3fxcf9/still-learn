<script setup lang="ts">
	import DashboardMenu from '$lib/components/dashboard/DashboardMenu.svelte';
	import HamburgerIcon from '$lib/components/dashboard/HamburgerIcon.svelte';
	import ProfilePicture from '$lib/components/dashboard/ProfilePicture.svelte';
	import MediaQuery from '$lib/MediaQuery.svelte';

	// Redirect user if logged out
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	import { currentUser } from '$lib/pocketbase';
	if (!$currentUser) goto(base + '/login');

	// Left menu
	let menu_opened = false;

	// Close menu on route change
	import { navigating } from '$app/stores';
	$: if ($navigating) menu_opened = false;
</script>

<div id="dashboard">
	<!-- Grid-->
	<div class="logo">Still-Learn</div>

	<div class="menu" class:opened={menu_opened}>
		<DashboardMenu />
	</div>

	<div class="navbar">
		<MediaQuery let:matches>
			{#if !matches.desktop}
				<HamburgerIcon bind:state={menu_opened} />
			{/if}
		</MediaQuery>
		<div class="nav-content">
			<!-- <span class="location">ROUTE TITLE</span> -->
			<input type="search" placeholder="Rechercher..." name="q" id="input_search" />
			<ProfilePicture />
		</div>
	</div>

	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	@import '$lib/components/dashboard/DashboardConfig.scss';
	@import '$lib/mq.scss';
	$main-padding: 0.5rem;

	#dashboard {
		position: relative; // Menu in desktop mode

		width: 100%;

		display: grid;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: $navbar-height 1fr;
		grid-template-areas:
			'navbar'
			'main';
	}

	.logo {
		display: none;
	}

	.navbar {
		grid-area: navbar;

		display: flex;
		align-items: center;
		justify-content: flex-start;

		border-bottom: var(--border-width) solid var(--border-color);
	}

	.navbar .nav-content {
		flex: 1;

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: $navbar-padding;

		margin: $navbar-padding;
	}

	#input_search {
		width: min(100%, 20rem);
		height: calc($navbar-height - 2 * $navbar-padding);

		border: none;
		padding: 0 1rem 0;
		border-radius: calc($navbar-height/8);

		color: var(--c-on-bg-dimmed-1);
		background-color: var(--c-bg-contrast-1);

		&:focus {
			outline: 2px solid var(--c-bg-contrast-2);
		}
	}

	.menu {
		position: fixed;
		top: $navbar-height;
		left: 0;

		width: 100%;
		height: calc(100% - $navbar-height);

		background-color: var(--c-bg);

		z-index: 100;
		transform: translateX(-100%);
		opacity: 0;

		transition:
			transform 0.3s ease-in-out,
			opacity 0.2s ease-in-out;

		&.opened {
			transform: translateX(0);
			opacity: 1;
		}
	}

	main {
		grid-area: main;
		min-width: 0px;

		padding: $main-padding;
	}

	// Desktop
	@media screen and (min-width: $mq-med-large) {
		#dashboard {
			height: 100vh;

			grid-template-columns: max-content 1fr;
			grid-template-areas:
				'logo navbar'
				'menu main';
		}

		.logo {
			grid-area: logo;

			display: flex;
			align-items: end;

			padding-left: $navbar-padding;

			font-size: 1.5rem;
			font-family: 'Unbounded';
		}

		.menu {
			grid-area: menu;
			position: initial;

			width: initial;
			height: initial;

			transform: translateX(0);
			opacity: 1;
		}

		.navbar {
			border-left: var(--border-width) solid var(--border-color);
		}

		main {
			border-left: var(--border-width) solid var(--border-color);
			overflow: auto;
		}
	}
</style>
