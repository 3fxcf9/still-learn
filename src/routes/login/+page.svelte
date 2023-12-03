<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { processError, type ProcessedError } from '$lib/pb_error_process';

	import TextInput from '$lib/components/design_system/form/TextInput.svelte';
	import SubmitButton from '$lib/components/design_system/form/SubmitButton.svelte';

	// Redirect is already logged in
	if ($currentUser) goto('dashboard');

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

	function checkEmptyFields() {
		let errors = false;
		const fieldsError: { [key: string]: string } = {};
		if (!identity) {
			errors = true;
			fieldsError.identity = formErrorMessages.identity.validation_required;
		}
		if (!password) {
			errors = true;
			fieldsError.password = formErrorMessages.password.validation_required;
		}
		if (errors) formError = { message: formErrorMessages.status[400], status: 400, fieldsError };
		return errors;
	}

	let loading = false;
	async function login() {
		if (checkEmptyFields()) return;

		try {
			loading = true;
			const user = await pb.collection('users').authWithPassword(identity, password);
			goto(base + '/dashboard');
		} catch (e: any) {
			formError = processError(e, formErrorMessages);
		} finally {
			loading = false;
		}
	}

	// Juicy background
	function lerp(start: number, end: number, amt: number): number {
		return (1 - amt) * start + amt * end;
	}

	let innerWidth = 0;
	let innerHeight = 0;

	$: hw = innerWidth / 2;
	$: hh = innerHeight / 2;

	let bg_current_x = 0;
	let bg_current_y = 0;

	let bg_target_x = 0;
	let bg_target_y = 0;

	let bg_computed_x_percent = 50;
	let bg_computed_y_percent = 50;

	const updateCursorPosition = (e: MouseEvent) => {
		bg_target_x = e.clientX - hw;
		bg_target_y = e.clientY - hh;
	};

	// Update
	setInterval(() => {
		// Organic mvt effect, 5% of the x and y distance each frame
		// The move ratio is controlled by the background-size in CSS (pos 0% = left side aligned and pos 100% = right side aligned)
		bg_current_x = lerp(bg_current_x, bg_target_x, 0.05);
		bg_current_y = lerp(bg_current_y, bg_target_y, 0.05);

		// Percentage of mouse move on half x axis = ratio * 100 / 2 = ratio * 50 = (mouse/maxmouse) * 50
		// The added 50 is to make the result fit between 0 and 100 and not between -50 and 50
		bg_computed_x_percent = (bg_current_x / hw) * 50 + 50;
		bg_computed_y_percent = (bg_current_y / hh) * 50 + 50;
	}, 10);

	// Random title every time
	const titles = ['Heureux de te revoir !'];
	const title = titles[Math.floor(Math.random() * titles.length)];
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div
	id="login"
	on:mousemove={updateCursorPosition}
	role="img"
	style="
    background-position-x: {bg_computed_x_percent}%;
    background-position-y: {bg_computed_y_percent}%;
  "
>
	<div class="login-container">
		<h2>{title}</h2>
		<form on:submit|preventDefault={login}>
			<TextInput label="Nom d'utilisateur ou adresse mail" bind:value={identity} error_message={formError?.fieldsError?.identity} id="login_identity_input" />
			<TextInput label="Mot de passe" bind:value={password} password={true} error_message={formError?.fieldsError?.password} id="login_password_input" />

			<div>
				{#if formError?.message && !Object.keys(formError?.fieldsError ?? {}).length}<p class="error">{formError.message}</p>{/if}
				<SubmitButton text={loading ? '• • •' : 'Se connecter'} />
			</div>
		</form>
		<p>
			Pas encore inscrit ?&nbsp;&nbsp;<a href="{base}/signup">créer un compte</a>.
		</p>
	</div>
</div>

<style lang="scss">
	@import '$lib/mq.scss';

	$spacing: 2rem;

	.login-container {
		padding: $spacing;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: $spacing;

		margin-top: $spacing;
	}

	h2 {
		font-family: 'Unbounded';
		font-size: 2rem;
	}

	form ~ p {
		margin-top: calc($spacing / 2);
	}

	@media screen and (min-width: $mq-small-med) and (max-width: $mq-med-large) {
		.login-container {
			padding-left: 20vw;
			padding-right: 20vw;
		}

		h2 {
			margin-top: calc($spacing / 2);
			font-size: 2.5rem;
		}

		form {
			margin-top: $spacing;
		}
	}

	@media screen and (min-width: $mq-med-large) {
		h2 {
			font-size: 2.5rem;
		}

		#login {
			height: 100vh;

			display: flex;
			align-items: center;
			justify-content: center;

			background-image: url('/images/login_bg.jpeg');
			background-size: 105% 105%;
		}

		.login-container {
			width: 50%;
			max-height: 100vh;

			padding: $spacing;
			border-radius: var(--roundness);

			background-color: var(--c-bg);

			overflow-y: scroll;
		}

		form {
			margin-top: $spacing;
		}
	}
</style>
