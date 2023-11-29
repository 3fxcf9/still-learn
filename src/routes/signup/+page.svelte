<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	// Redirect is already logged in
	if ($currentUser) goto('/dashboard');

	// Form fields
	/** @type {string} */
	let name;
	/** @type {string} */
	let username;
	/** @type {string} */
	let email;
	/** @type {string} */
	let password;
	/** @type {string} */
	let passwordConfirm;

	/** @type {Error | undefined} */
	let formError;

	async function signup() {
		try {
			const data = {
				name,
				username,
				email,
				password,
				passwordConfirm
			};
			await pb.collection('users').create(data);
			await pb.collection('users').authWithPassword(email, password);
			goto('/dashboard');
		} catch (e) {
			if (e instanceof Error) formError = e;
			console.error(e);
		}
	}
</script>

<form on:submit|preventDefault>
	<h2>Sign up</h2>
	<input placeholder="Name" type="text" bind:value={name} /><br />
	<input placeholder="Username" type="text" bind:value={username} /><br />
	<input placeholder="Email" type="text" bind:value={email} /><br />
	<input placeholder="Password" type="password" bind:value={password} /><br />
	<input placeholder="Confirm password" type="password" bind:value={passwordConfirm} /><br />
	<button on:click={signup}>Sign up</button><br />
	{#if formError}
		<span style="color:red">{formError.message}</span><br />
	{/if}
	Already have an account ? <a href="/login">login instead</a>
</form>
