<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
</script>

<h1>Still-Learn</h1>

{#if $currentUser}
	<a href="dashboard">dashboard</a>
{:else}
	<a href="login">login</a> <a href="signup">sign up</a>
{/if}
