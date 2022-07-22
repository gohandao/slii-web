//const base = require('airtable').base('appDF2UQxmr5KBu4T')
const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
});
export const base = Airtable.base("appFYknMhbtkUTFgt");
