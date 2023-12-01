<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { currentUser, pb } from '$lib/pocketbase';

	function logout() {
		pb.authStore.clear();
		goto('/login');
	}
</script>

<h1>Dashboard</h1>
<a href="{base}/">home</a>
{#if $currentUser}
	<p>
		Signed in as {$currentUser.username}
	</p>
	<button on:click={logout}>Logout</button>
{:else}
	Logged out. <a href="{base}/login">login</a> <a href="{base}/signup">sign up</a>
{/if}
