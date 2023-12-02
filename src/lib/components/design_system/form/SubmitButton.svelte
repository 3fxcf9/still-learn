<script setup lang="ts">
	export let text: string = 'Valider';
</script>

<input type="submit" value={text} />

<style lang="scss">
	input {
		width: 100%;
		border: none;
		color: var(--c-on-primary);
		background-color: var(--c-primary);
		border-radius: var(--form-input-radius);
		padding: 20px 25px;
		text-transform: uppercase;

		cursor: pointer;

		&:focus {
			outline: none;
			text-decoration: underline;
		}
	}
</style>
