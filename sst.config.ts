/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "re-cdn",
			removal: input?.stage === "production" ? "retain" : "remove",
			home: "aws",
		};
	},
	async run() {
		const bucket = new sst.aws.Bucket("Bucket");

		const web = new sst.aws.SolidStart("Web", {
			link: [bucket],
		});

		return {
			web: web.url,
		};
	},
});
