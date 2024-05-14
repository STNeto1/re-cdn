/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    AdminPassword: {
      type: "sst.sst.Secret"
      value: string
    }
    AdminUser: {
      type: "sst.sst.Secret"
      value: string
    }
    Bucket: {
      name: string
      type: "sst.aws.Bucket"
    }
    SessionKey: {
      type: "sst.sst.Secret"
      value: string
    }
  }
}
export {}