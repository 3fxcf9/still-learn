<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	const query = {
		mobile: '(max-width: 500px)',
		tablet: '(min-width: 500px) and (max-width: 850px)',
		desktop: '(min-width: 850px)'
	};

	type BreakpointKeys = keyof typeof query;

	let matches: { [K in BreakpointKeys]: boolean } = {
		mobile: false,
		tablet: false,
		desktop: false
	};

	const updateMatches = () => {
		for (const breakpt in query) {
			matches[breakpt as BreakpointKeys] = window.matchMedia(query[breakpt as BreakpointKeys]).matches;
		}
	};

	onMount(() => {
		updateMatches();
		window.addEventListener('resize', updateMatches);
		return () => window.removeEventListener('resize', updateMatches);
	});

	onDestroy(() => {
		window.removeEventListener('resize', updateMatches);
	});
</script>

<slot {matches} />
