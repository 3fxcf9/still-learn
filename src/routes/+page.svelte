<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
	import { base } from '$app/paths';
</script>

<h1>Still-Learn</h1>

{#if $currentUser}
	<a href="{base}/dashboard">dashboard</a>
{:else}
	<a href="login">login</a> <a href="signup">sign up</a>
{/if}
