import type { ComponentProps } from "react";

import type { MultiFilterInput } from "./MultiFilterInput";

export type { Filter, Key, OperatorDefinition } from "@lib/types";
export { MultiFilterInput } from "./MultiFilterInput";
export type MultiFilterInputProps = ComponentProps<typeof MultiFilterInput>;
