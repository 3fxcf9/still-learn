<script setup lang="ts">
	export let text: string = 'Valider';
</script>

<input type="submit" value={text} />

<style lang="scss">
	input {
		width: 100%;

		border: none;

		padding: 20px 25px;
		border-radius: var(--roundness);

		color: var(--c-on-primary);
		background-color: var(--c-primary);

		text-transform: uppercase;

		cursor: pointer;

		&:focus {
			outline: none;
			text-decoration: underline;
		}
	}
</style>
