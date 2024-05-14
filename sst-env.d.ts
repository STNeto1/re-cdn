/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    Bucket: {
      name: string
      type: "sst.aws.Bucket"
    }
    Dynamo: {
      name: string
      type: "sst.aws.Dynamo"
    }
    SessionKey: {
      type: "sst.sst.Secret"
      value: string
    }
  }
}
export {}