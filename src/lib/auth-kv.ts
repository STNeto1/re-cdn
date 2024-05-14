import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	QueryCommand,
	PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { useSession } from "vinxi/http";
import { action } from "@solidjs/router";

const client = DynamoDBDocumentClient.from(
	new DynamoDBClient({ region: "us-east-1" }),
);

const AUTH_KV_KEY = "$auth" as const;

export const useHasAuthKV = async () => {
	const result = await client.send(
		new QueryCommand({
			TableName: Resource.Dynamo.name,
			KeyConditionExpression: "kvKey = :key",
			ExpressionAttributeValues: {
				":key": AUTH_KV_KEY,
			},
			Limit: 1,
		}),
	);

	return result.Count !== 0;
};

export const useSetupAuthKV = action(
	async (input: {
		name: string;
		username: string;
		password: string;
	}) => {
		"use server";
		await client.send(
			new PutCommand({
				TableName: Resource.Dynamo.name,
				Item: {
					kvKey: { S: AUTH_KV_KEY },
					data: { S: JSON.stringify(input) },
				},
			}),
		);
	},
	"setup-auth-kv",
);

export const useIsAuthenticated = async () => {
	const session = await useSession<{ timestamp: string | null }>({
		password: Resource.SessionKey.value,
	});

	return !!session.data.timestamp;
};

export const useUpdateSessionTimestamp = action(async () => {
	"use server";
	const session = await useSession<{ timestamp: string | null }>({
		password: Resource.SessionKey.value,
	});

	await session.update({
		timestamp: new Date().toISOString(),
	});
}, "update-session-timestamp");
