/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
	app(input) {
		return {
			name: "re-cdn",
			removal: input?.stage === "production" ? "retain" : "remove",
			home: "aws",
			providers: {},
		};
	},
	async run() {
		const sessionKey = new sst.Secret(
			"SessionKey",
			"UUcLQx0U3GcWFqnMr00AUXpdTWC5t3o5",
		);

		// it's the fifth or sixth attempt of a correct key
		const table = new sst.aws.Dynamo("Dynamo", {
			fields: {
				kvKey: "string",
			},
			primaryIndex: { hashKey: "kvKey" },
		});

		const bucket = new sst.aws.Bucket("Bucket", {
			public: false,
		});
		const web = new sst.aws.SolidStart("SolidWeb", {
			link: [table, bucket, sessionKey],
		});

		return {
			web: web.url,
		};
	},
});
