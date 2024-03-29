<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { processError, type ProcessedError } from '$lib/pb_error_process';

	import TextInput from '$lib/components/design_system/inputs/TextInput.svelte';
	import SubmitButton from '$lib/components/design_system/buttons/SubmitButton.svelte';

	// Redirect is already logged in
	if ($currentUser) goto(base + '/dashboard');

	// Form fields
	let first_name: string;
	let last_name: string;
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
		first_name: {
			validation_required: 'Veuillez entrer votre prénom',
			validation_min_text_constraint: 'Le prénom doit faire plus de 2 caractères',
			validation_max_text_constraint: 'Le prénom doit faire moins de 50 caractères'
		},
		last_name: {
			validation_required: 'Veuillez entrer votre nom',
			validation_min_text_constraint: 'Le nom doit faire plus de 2 caractères',
			validation_max_text_constraint: 'Le nom doit faire moins de 50 caractères'
		},
		email: {
			validation_required: 'Veuillez entrer une adresse mail',
			validation_is_email: 'Veuillez entrer une adresse mail valide',
			validation_invalid_email: 'Adresse mail invalide ou déjà utilisée'
		},
		username: {
			validation_invalid_username: "Nom d'utilisateur invalide ou déjà utilisé",
			validation_length_out_of_range: "Le nom d'utilisateur doit faire au moins 3 caractères de long",
			validation_match_invalid: "Le nom d'utilisateur doit contenir uniquement des lettres et des chiffres"
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

	function checkEmptyFields() {
		let errors = false;
		const fieldsError: { [key: string]: string } = {};
		if (!first_name) {
			errors = true;
			fieldsError.first_name = formErrorMessages.first_name.validation_required;
		}
		if (!last_name) {
			errors = true;
			fieldsError.last_name = formErrorMessages.last_name.validation_required;
		}
		if (!email) {
			errors = true;
			fieldsError.email = formErrorMessages.email.validation_required;
		}
		if (!password) {
			errors = true;
			fieldsError.password = formErrorMessages.password.validation_required;
		}
		if (!passwordConfirm) {
			errors = true;
			fieldsError.passwordConfirm = formErrorMessages.passwordConfirm.validation_required;
		}
		if (errors) formError = { message: formErrorMessages.status[400], status: 400, fieldsError };
		return errors;
	}

	let loading = false;
	async function signup() {
		if (checkEmptyFields()) return;

		try {
			loading = true;
			const data = {
				first_name,
				last_name,
				username,
				email,
				password,
				passwordConfirm
			};
			await pb.collection('users').create(data);
			await pb.collection('users').authWithPassword(email, password);
			goto(base + '/dashboard');
		} catch (e: any) {
			formError = processError(e, formErrorMessages);
		} finally {
			loading = false;
		}
	}

	// Random title every time
	const titles = ['Bienvenue !', 'Bienvenue sur Still-Learn !', 'Prêt à découvrir Still-Learn ?', 'Le meilleur moyen de réviser !', 'Gagne du temps et amuse-toi en révisant !'];
	let title = titles[Math.floor(Math.random() * titles.length)];
</script>

<div id="login">
	<div class="signup-container">
		<h2>{title}</h2>
		<form on:submit|preventDefault={signup}>
			<div class="form__horizontal-layout">
				<TextInput label="Prénom" bind:value={first_name} error_message={formError?.fieldsError?.first_name} id="signup_first-name_input" />
				<TextInput label="Nom" bind:value={last_name} error_message={formError?.fieldsError?.last_name} id="signup_last-name_input" />
			</div>
			<TextInput label="Nom d'utilisateur (Auto-généré si laissé vide)" bind:value={username} error_message={formError?.fieldsError?.username} id="signup_username_input" />
			<TextInput label="Adresse mail" bind:value={email} error_message={formError?.fieldsError?.email} id="signup_email_input" />
			<TextInput label="Mot de passe" bind:value={password} password={true} error_message={formError?.fieldsError?.password} id="signup_password_input" />
			<TextInput label="Confirmation du mot de passe" bind:value={passwordConfirm} password={true} error_message={formError?.fieldsError?.passwordConfirm} id="signup_password-confirm_input" />

			<div>
				{#if formError?.message && !Object.keys(formError?.fieldsError ?? {}).length}<p class="error">{formError.message}</p>{/if}
				<SubmitButton text={loading ? '• • •' : 'Valider'} />
			</div>
		</form>
		<p>
			Déjà inscrit ?&nbsp;&nbsp;<a href="{base}/login">se connecter</a>.
		</p>
	</div>
	<div class="right"></div>
</div>

<style lang="scss">
	@import '$lib/mq.scss';
	$spacing: 2rem;

	.signup-container {
		padding: $spacing;
	}

	.right {
		display: none;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: $spacing;

		margin-top: $spacing;
	}

	.form__horizontal-layout {
		display: flex;
		gap: $spacing;

		:global(.form-field) {
			flex: 1;
		}
	}

	h2 {
		font-family: 'Unbounded';
		font-size: 2rem;
	}

	@media screen and (min-width: $mq-small-med) {
		.signup-container {
			padding-left: 20vw;
			padding-right: 20vw;
		}

		h2 {
			font-size: 2.5rem;
		}

		form {
			margin-top: calc($spacing * 1.5);
		}
	}

	@media screen and (min-width: $mq-med-large) {
		#login {
			height: 100vh;

			display: grid;
			grid-template-columns: 1fr 1fr;
		}

		.signup-container {
			padding: calc($spacing * 2.5);
			overflow-y: scroll;
		}

		form {
			margin-top: calc($spacing * 2);
		}

		.right {
			display: block;

			background-image: url('/images/register_bg.jpeg');
			background-size: cover;
			background-position: right center;
		}
	}

	form ~ p {
		margin-top: calc($spacing / 2);
	}
</style>
