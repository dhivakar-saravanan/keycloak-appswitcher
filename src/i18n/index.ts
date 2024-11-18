import { IntlShape, createIntlCache, createIntl } from '@eo-locale/react';

// Update the type declaration file to include these imports
declare module '@eo-locale/react' {
  export function createIntl(config: {
    locale: string;
    messages: Record<string, string>;
  }, cache?: IntlCache): IntlShape;
  
  export function createIntlCache(): IntlCache;
  
  export interface IntlCache {
    [key: string]: any;
  }
  
  export interface IntlShape {
    formatMessage: (descriptor: { id: string; defaultMessage?: string }, values?: Record<string, string | number>) => string;
    // Add other IntlShape methods as needed
  }
}

// Define the supported locales
const locales = ['en', 'fr', 'es'] as const;
type Locale = typeof locales[number];

// Create an Intl cache
const cache = createIntlCache();

// Create an Intl instance for each locale
const intlInstances = locales.reduce<Record<Locale, IntlShape>>((instances, locale) => {
  // Use dynamic import instead of require
  const messages = require(`./locales/${locale}.json`);
  const intl = createIntl({ locale, messages }, cache);
  return { ...instances, [locale]: intl };
}, {} as Record<Locale, IntlShape>);

// Export the Intl instances
export const { en, fr, es } = intlInstances;

// Export type for use in other files
export type SupportedLocales = typeof locales[number];