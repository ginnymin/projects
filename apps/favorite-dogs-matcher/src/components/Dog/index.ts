import type { ComponentProps } from "react";

import type { Dog } from "./Dog";

export { Dog } from "./Dog";
export type DogProps = ComponentProps<typeof Dog>;
