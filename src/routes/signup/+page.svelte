<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { processError, type ProcessedError } from '$lib/pb_error_process';

	// Redirect is already logged in
	if ($currentUser) goto('/dashboard');

	// Form fields
	let name: string;
	let username: string;
	let email: string;
	let password: string;
	let passwordConfirm: string;

	let formError: ProcessedError | undefined;

	// Error messages
	const formErrorMessages = {
		status: {
			400: 'Veuillez vérifier les informations saisies.'
		},
		name: {
			validation_required: 'Veuillez entrer votre nom',
			validation_min_text_constraint: 'Le nom ne peut pas faire moins de 4 caractères',
			validation_max_text_constraint: 'Le nom ne peut pas faire plus de 50 caractères'
		},
		email: {
			validation_required: 'Veuillez entrer une adresse mail',
			validation_is_email: 'Veuillez entrer une adresse mail valide',
			validation_invalid_email: 'Adresse mail invalide ou déjà utilisée'
		},
		username: {
			validation_invalid_username: "Nom d'utilisateur invalide ou déjà utilisé",
			validation_length_out_of_range: "Le nom d'utilisateur doit faire au moins 3 caractères de long"
		},
		password: {
			validation_required: 'Veuillez saisir un mot de passe',
			validation_length_out_of_range: 'Le mot de passe doit contenir au moins 8 caractères.'
		},
		passwordConfirm: {
			validation_required: 'Veuillez confirmer votre mot de passe',
			validation_values_mismatch: 'Les mots de passe ne correspondent pas.'
		}
	};

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
		} catch (e: any) {
			formError = processError(e, formErrorMessages);
		}
	}
</script>

<h2>Creer un compte</h2>

<form on:submit|preventDefault>
	<input placeholder="Nom et prénom" type="text" bind:value={name} />
	{#if formError?.fieldsError?.name}<span class="error">{formError.fieldsError.name}</span>{/if}
	<br />

	<input placeholder="Nom d'utilisateur (auto-généré si laissé vide)" type="text" bind:value={username} />
	{#if formError?.fieldsError?.username}<span class="error">{formError.fieldsError.username}</span>{/if}
	<br />

	<input placeholder="Adresse mail" type="text" bind:value={email} />
	{#if formError?.fieldsError?.email}<span class="error">{formError.fieldsError.email}</span>{/if}
	<br />

	<input placeholder="Mot de passe" type="password" bind:value={password} />
	{#if formError?.fieldsError?.password}<span class="error">{formError.fieldsError.password}</span>{/if}
	<br />

	<input placeholder="Conformation du mot de passe" type="password" bind:value={passwordConfirm} />
	{#if formError?.fieldsError?.passwordConfirm}<span class="error">{formError.fieldsError.passwordConfirm}</span>{/if}
	<br />

	<button on:click={signup}>Créer un compte</button><br />
	{#if formError?.message}<p class="error">{formError.message}</p>{/if}
</form>
Déjà inscrit ?<a href="/login">se connecter</a>

<style>
	.error {
		color: red;
	}
</style>
