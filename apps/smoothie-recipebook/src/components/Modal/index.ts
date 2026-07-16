import type { ComponentProps } from "react";

import type { Modal } from "./Modal";

export { CloseButton } from "./CloseButton";
export { Modal } from "./Modal";
export type ModalProps = ComponentProps<typeof Modal>;
export { Title as ModalTitle } from "./Title";
