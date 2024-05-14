import { Resource } from "sst";
import { useSession } from "vinxi/http";
import { action, redirect } from "@solidjs/router";
import { FetchEvent } from "@solidjs/start/server";

export const useIsAuthenticated = async (event: FetchEvent) => {
	const session = await useSession<{ timestamp: string | null }>(
		event.nativeEvent,
		{
			password: Resource.SessionKey.value,
		},
	);

	return !!session.data.timestamp;
};

export const useUpdateSessionTimestamp = action(async (formData: FormData) => {
	"use server";

	if (
		formData.get("user") !== Resource.AdminUser.value ||
		formData.get("password") !== Resource.AdminPassword.value
	) {
		return new Error("Invalid credentials");
	}

	const session = await useSession<{ timestamp: string | null }>({
		password: Resource.SessionKey.value,
	});

	await session.update({
		timestamp: new Date().toISOString(),
	});

	throw redirect("/");
}, "update-session-timestamp");
