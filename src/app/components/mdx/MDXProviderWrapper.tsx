// MDXProviderWrapper.tsx
import React, { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';

interface MDXProviderWrapperProps {
  children: ReactNode;
}

const MDXProviderWrapper: React.FC<MDXProviderWrapperProps> = ({ children }) => {
  return <MDXProvider>{children}</MDXProvider>;
};

export default MDXProviderWrapper;
