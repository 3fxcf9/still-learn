<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { processError, type ProcessedError } from '$lib/pb_error_process';

	// Redirect is already logged in
	if ($currentUser) goto('/dashboard');

	// Form fields
	let identity: string;
	let password: string;

	let formError: ProcessedError | undefined;

	// Error messages
	const formErrorMessages = {
		status: {
			400: "Nom d'utilisateur ou mot de passe incorrect."
		},
		identity: {
			validation_required: "Veuillez saisir un nom d'utilisateur/email"
		},
		password: {
			validation_required: 'Veuillez saisir un mot de passe'
		}
	};

	async function login() {
		try {
			const user = await pb.collection('users').authWithPassword(identity, password);
			goto('/dashboard');
		} catch (e: any) {
			formError = processError(e, formErrorMessages);
		}
	}
</script>

<h2>Se connecter</h2>

<form on:submit|preventDefault>
	<input placeholder="Nom d'utilisateur ou e-mail" type="text" bind:value={identity} />
	{#if formError?.fieldsError?.identity}<span class="error">{formError.fieldsError.identity}</span>{/if}
	<br />

	<input placeholder="Mot de passe" type="password" bind:value={password} />
	{#if formError?.fieldsError?.password}<span class="error">{formError.fieldsError.password}</span>{/if}
	<br />

	<button on:click={login}>Se connecter</button><br />
	{#if formError?.message}<p class="error">{formError.message}</p>{/if}
</form>
Pas encore inscrit ?<a href="/signup">creer un compte</a>
