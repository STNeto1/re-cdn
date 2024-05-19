import { type RouteDefinition, useSubmission } from "@solidjs/router";
import { For, Suspense, createEffect, createResource } from "solid-js";
import { IconLoading } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Grid } from "~/components/ui/grid";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { uploadFiles } from "~/lib/actions";
import { fetchFiles } from "~/lib/fetchers";

export const route = {
	async load() {},
} satisfies RouteDefinition;

export default function HomePage() {
	const [files, { refetch }] = createResource(() => fetchFiles(undefined));
	const $uploading = useSubmission(uploadFiles);

	createEffect(() => {
		if (!!$uploading.input && $uploading.pending) {
			return;
		}

		refetch();
	});

	return (
		<div class="grid gap-6 container">
			<form action={uploadFiles} method="post">
				<Grid class="gap-4">
					<Grid class="gap-1">
						<Label class="sr-only" for="file">
							Files
						</Label>
						<Input name="files[]" type="file" multiple />
					</Grid>

					<Button disabled={$uploading.pending}>
						{$uploading.pending && (
							<IconLoading class="mr-2 size-4 animate-spin" />
						)}
						Upload
					</Button>
				</Grid>

				<Suspense fallback={"Loading files..."}>
					<ul>
						<For each={files()?.files ?? []}>
							{(file) => <li>{file.Key ?? "no key?"}</li>}
						</For>
					</ul>
				</Suspense>
			</form>
		</div>
	);
}
