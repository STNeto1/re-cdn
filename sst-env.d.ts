/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    Bucket: {
      name: string
      type: "sst.aws.Bucket"
    }
  }
}
export {}