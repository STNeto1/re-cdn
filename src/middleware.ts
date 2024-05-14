import { createMiddleware } from "@solidjs/start/middleware";
import { hasAuthKvSetup } from "./server/auth-kv";

export default createMiddleware({
	onRequest: [
		async (event) => {
			console.log("GLOBAL", event.request.url);
			console.log(`Has Auth Setup: ${await hasAuthKvSetup()}`);
		},
	],
});
