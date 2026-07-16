import type { ComponentProps } from "react";

import type { BoardHand } from "./BoardHand";
import type { ResultHand } from "./ResultHand";

export { BoardHand } from "./BoardHand";
export type BoardHandProps = ComponentProps<typeof BoardHand>;

export { ResultHand } from "./ResultHand";
export type ResultHandProps = ComponentProps<typeof ResultHand>;
