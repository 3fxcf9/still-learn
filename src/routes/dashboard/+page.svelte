<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase';

	function logout() {
		pb.authStore.clear();
		goto('/login');
	}
</script>

<h1>Dashboard</h1>
<a href="/">home</a>
{#if $currentUser}
	<p>
		Signed in as {$currentUser.username}
	</p>
	<button on:click={logout}>Logout</button>
{:else}
	Logged out. <a href="login">login</a> <a href="signup">sign up</a>
{/if}
