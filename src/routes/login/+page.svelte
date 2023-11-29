<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	// Redirect is already logged in
	if ($currentUser) goto('/dashboard');

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
			goto('/dashboard');
		} catch (e) {
			if (e instanceof Error) formError = e;
			console.error(e);
		}
	}
</script>

<form on:submit|preventDefault>
	<h2>Login</h2>
	<input placeholder="Username or email" type="text" bind:value={identity} /><br />
	<input placeholder="Password" type="password" bind:value={password} /><br />
	<button on:click={login}>Login</button><br />
	{#if formError}
		<span style="color:red">{formError.message}</span><br />
	{/if}
	No account ? <a href="/signup">sign up</a>
</form>
