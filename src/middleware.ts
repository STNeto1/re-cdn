import { createMiddleware } from "@solidjs/start/middleware";
import { sendRedirect } from "vinxi/http";
import { useHasAuthKV, useIsAuthenticated } from "~/lib/auth-kv";

const PUBLIC_PATHNAMES = ["/sign-in", "/sign-up"];

export default createMiddleware({
	onRequest: [
		async (event) => {
			const url = new URL(event.request.url);

			if (!PUBLIC_PATHNAMES.includes(url.pathname)) {
				const isAuthenticated = await useIsAuthenticated();

				if (!isAuthenticated) {
					const hasKv = await useHasAuthKV();
					if (!hasKv) {
						return sendRedirect(event.nativeEvent, "/sign-up");
					}

					return sendRedirect(event.nativeEvent, "/sign-in");
				}
			}
		},
	],
});
