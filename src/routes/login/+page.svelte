<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	// Redirect is already logged in
	if ($currentUser) goto('/');

	// Form fields
	/** @type {string} */
	let identity;
	/** @type {string} */
	let password;

	/** @type {Error | undefined} */
	let formError;

	async function login() {
		try {
			const user = await pb.collection('users').authWithPassword(identity, password);
			goto('/');
		} catch (e) {
			if (e instanceof Error) formError = e;
			console.error(e);
		}
	}
</script>

<form on:submit|preventDefault>
	<h2>Login</h2>
	<input placeholder="Username or email" type="text" bind:value={identity} />
	<input placeholder="Password" type="password" bind:value={password} />
	<button on:click={login}>Login</button>
	{#if formError}
		<span style="color:red">{formError.message}</span>
	{/if}
</form>
