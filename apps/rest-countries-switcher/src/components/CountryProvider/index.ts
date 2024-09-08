import { ComponentProps } from 'react';

import { CountryProvider } from './CountryProvider';

export { CountryContext, CountryProvider } from './CountryProvider';
export type CountryProviderProps = ComponentProps<typeof CountryProvider>;
