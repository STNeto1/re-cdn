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
		const adminUser = new sst.Secret("AdminUser", "admin");
		const adminPassword = new sst.Secret("AdminPassword", "admin");

		const bucket = new sst.aws.Bucket("Bucket", {
			public: false,
		});
		const web = new sst.aws.SolidStart("SolidWeb", {
			link: [bucket, sessionKey, adminUser, adminPassword],
		});

		return {
			web: web.url,
		};
	},
});
