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
			link: [table, bucket],
		});

		return {
			web: web.url,
		};
	},
});
