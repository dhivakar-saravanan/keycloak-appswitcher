declare module '@eo-locale/react' {
    import { ReactNode } from 'react';
  
    export interface TranslationMessages {
      [key: string]: string | TranslationMessages;
    }
  
    export interface TranslationParams {
      [key: string]: string | number | boolean | null | undefined;
    }
  
    export interface LocaleProviderProps {
      children?: ReactNode;
      language?: string;
      messages?: TranslationMessages;
      fallback?: string;
    }
  
    export function LocaleProvider(props: LocaleProviderProps): JSX.Element;
    
    export function useLocale(): {
      language: string;
      setLanguage: (language: string) => void;
      t: (key: string, params?: TranslationParams) => string;
    };
  
    export function withLocale<P extends object>(
      Component: React.ComponentType<P>
    ): React.ComponentType<P>;
  }
  
  declare module 'eo-locale' {
    export * from '@eo-locale/react';
  }