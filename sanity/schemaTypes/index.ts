import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { tableType } from "./tableType";

import { seoType } from "./seoType";
import { pageType } from "./pageType";
import { settingsType } from "./settingsType";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    tableType,
    seoType,
    pageType,
    settingsType,
  ],
};
