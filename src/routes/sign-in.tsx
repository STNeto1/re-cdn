import { useSubmission } from "@solidjs/router";
import { Show } from "solid-js";
import { Button } from "~/components/ui/button";
import { useUpdateSessionTimestamp } from "~/lib/auth-kv";

export default function SignInPage() {
	const signIn = useSubmission(useUpdateSessionTimestamp);

	return (
		<main class="text-center mx-auto text-gray-700 p-4">
			<h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
				Sign In
			</h1>

			<Show when={signIn.result}>
				<p>{signIn.result?.message ?? "Error but no msg"}</p>
			</Show>

			<form action={useUpdateSessionTimestamp} method="post">
				<input name="user" type="text" />
				<input name="password" type="password" />

				<Button type="submit">Submit</Button>
			</form>
		</main>
	);
}
