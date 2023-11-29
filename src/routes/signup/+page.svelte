<script>
	import { pb, currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	// Redirect is already logged in
	if ($currentUser) goto('/');

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
			goto('/');
		} catch (e) {
			if (e instanceof Error) formError = e;
			console.error(e);
		}
	}
</script>

<form on:submit|preventDefault>
	<h2>Sign up</h2>
	<input placeholder="Name" type="text" bind:value={name} />
	<input placeholder="Username" type="text" bind:value={username} />
	<input placeholder="Email" type="text" bind:value={email} />
	<input placeholder="Password" type="password" bind:value={password} />
	<input placeholder="Confirm password" type="password" bind:value={passwordConfirm} />
	<button on:click={signup}>Sign up</button>
	{#if formError}
		<span style="color:red">{formError.message}</span>
	{/if}
</form>
