import { createMiddleware } from "@solidjs/start/middleware";
import { sendRedirect } from "vinxi/http";
import { useIsAuthenticated } from "~/lib/auth-kv";

const PUBLIC_PATHNAMES = ["/sign-in", "/_server"];

export default createMiddleware({
	onRequest: [
		async (event) => {
			const url = new URL(event.request.url);

			if (!PUBLIC_PATHNAMES.includes(url.pathname)) {
				const isAuthenticated = await useIsAuthenticated(event);

				if (!isAuthenticated) {
					return sendRedirect(event.nativeEvent, "/sign-in");
				}
			}
		},
	],
});
