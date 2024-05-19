import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { cache } from "@solidjs/router";
import { Resource } from "sst";
import { s3Client } from "~/lib/s3";

export const fetchFiles = cache(async (marker: string | undefined) => {
	"use server";

	const result = await s3Client.send(
		new ListObjectsCommand({
			Bucket: Resource.Bucket.name,
			Marker: marker,
			MaxKeys: 10,
		}),
	);

	return {
		marker: result.Marker,
		files: result.Contents,
	};
}, "fetch-files");
