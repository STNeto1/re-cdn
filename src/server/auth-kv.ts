import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(
	new DynamoDBClient({ region: "us-east-1" }),
);

const AUTH_KV_KEY = "$auth" as const;

export async function hasAuthKvSetup() {
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
}
