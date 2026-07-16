import type { ComponentProps } from "react";

import type { CountryProvider } from "./CountryProvider";

export { CountryContext, CountryProvider } from "./CountryProvider";
export type CountryProviderProps = ComponentProps<typeof CountryProvider>;
