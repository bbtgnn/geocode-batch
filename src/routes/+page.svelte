<script lang="ts">
	import _ from 'lodash';

	import type { LatLng } from '$lib/types';
	import {
		splitNewlines,
		fetchLines,
		responseToCoordinates,
		formatLocations,
		formatCoordinates
	} from '$lib/utils';

	import { MQkey } from '$lib/stores';

	//

	let input = '';
	let inputCount = 0;

	let output: Array<Array<LatLng>> = [];

	let promise: Promise<any>;

	//

	$: inputCount = splitNewlines(input).length;

	async function fetchData() {
		if (input && $MQkey) {
			output = [];

			// Getting all the lines & grouping
			const lines = splitNewlines(input);
			const chunks = _.chunk(lines, 100);

			// Fetching data and grouping
			const coords: Array<Array<LatLng>> = [];
			for (let chunk of chunks) {
				const res = await fetchLines($MQkey, chunk);
				coords.push(...responseToCoordinates(res));
			}

			// Formatting response
			output = [...coords];
		}
	}

	function click() {
		promise = fetchData();
	}

	async function copyResult() {
		const text = formatCoordinates(output);
		await navigator.clipboard.writeText(text.toString());
		alert('Text copied!');
	}
</script>

<!--  -->

<main
	class="
	flex flex-col flex-nowrap items-stretch bg-gray-50
	w-screen h-screen overflow-hidden
"
>
	<!-- Topbar -->
	<div class="flex flex-row items-center p-3 space-x-4 bg-blue-100">
		<label for="key">Mapquest Key</label>
		<input type="text" name="key" id="key" class="grow" bind:value={$MQkey} />
	</div>

	<!-- Content -->
	<div
		class="
		grow overflow-hidden
		flex flex-row flex-nowrap items-stretch
	"
	>
		<!-- Col 1 -->
		<div
			class="grow shrink-0 basis-1 p-3
			flex flex-col flex-nowrap items-stretch justify-start
		"
		>
			<div class="h-10 flex flex-row items-center">
				<label for="input" class="text-gray-500">Input ({inputCount})</label>
			</div>
			<textarea
				name="input"
				id="input"
				class="grow mt-3 overflow-auto whitespace-nowrap border-2 border-gray-400 p-3"
				bind:value={input}
			/>
		</div>

		<!-- Col 2 -->
		<div class="p-3 flex flex-col justify-center">
			<button class="p-4 bg-yellow-400 hover:bg-yellow-500" on:click={click}>GO</button>
		</div>

		<!-- Col 3 -->
		<div
			class="grow shrink-0 basis-1 p-3 overflow-hidden
			flex flex-col flex-nowrap justify-start	
		"
		>
			<!-- Topbar -->
			<div class="flex flex-row flex-nowrap items-center justify-between mb-3">
				<label for="output">Output</label>
				<button class="p-2 bg-gray-200 hover:bg-gray-300" on:click={copyResult}>Copia</button>
			</div>

			<div class="grow block overflow-auto bg-gray-100 p-3">
				{#await promise}
					loading...
				{:then res}
					{#if output}
						{#each output as locations}
							<p class="whitespace-nowrap">{formatLocations(locations)}</p>
						{/each}
					{/if}
				{/await}
			</div>
		</div>
	</div>
</main>

<!--  -->
<style lang="postcss">
</style>
