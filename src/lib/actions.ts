import { PutObjectCommand } from "@aws-sdk/client-s3";
import { action, revalidate } from "@solidjs/router";
import { nanoid } from "nanoid";
import { Resource } from "sst";
import { s3Client } from "~/lib/s3";
import { fetchFiles } from "./fetchers";

export const uploadFiles = action(async (formData: FormData) => {
	"use server";
	const files = formData.getAll("files[]");
	if (files.some((f) => !(f instanceof File))) {
		return new Error("Invalid file?");
	}

	const tasks = files.map(async (elem) => {
		const $elem = elem as File;

		return s3Client.send(
			new PutObjectCommand({
				Bucket: Resource.Bucket.name,
				Key: `${nanoid(6)}.${$elem.name.split(".").at(-1)}`,
				ContentType: $elem.type,
				Body: Buffer.from(await $elem.arrayBuffer()),
			}),
		);
	});

	await Promise.all(tasks);
	await revalidate([fetchFiles.key]);

	return null;
}, "upload-files");
