import { Creator } from "@/types/creator";
declare module "*/creators.json" {
  const value: Creator[];
  export = value;
  // export default value;
}
declare module "*/collections.json" {
  const value: any[];
  export = value;
}
declare module "*/tags.json" {
  const value: any[];
  export = value;
}
