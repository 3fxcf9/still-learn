<script>
	import { currentUser, pb } from '$lib/pocketbase';

	function logout() {
		pb.authStore.clear();
	}
	console.log($currentUser);
</script>

<h1>Still-Learn</h1>

{#if $currentUser}
	<p>
		Signed in as {$currentUser.username}
	</p>
	<button on:click={logout}>Logout</button>
{:else}
	Logged out. <a href="login">login</a> <a href="signup">sign up</a>
{/if}
