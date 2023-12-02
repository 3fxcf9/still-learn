<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
	import { base } from '$app/paths';
</script>

<h1>Still-Learn</h1>

{#if $currentUser}
	<a href="{base}/dashboard">dashboard</a>
{:else}
	<a href="{base}/login">login</a> <a href="{base}/signup">sign up</a>
{/if}
