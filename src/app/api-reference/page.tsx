'use client';

import Script from 'next/script';

type ScalarBrowserApi = {
  createApiReference: (
    selector: string,
    configuration: {
      url: string;
      theme?: string;
      layout?: 'modern' | 'classic';
    },
  ) => void;
};

declare global {
  interface Window {
    Scalar?: ScalarBrowserApi;
  }
}

const openApiUrl = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/openapi/v0/openapi.yaml`;

export default function ApiReferencePage() {
  const initialize = () => {
    globalThis.Scalar?.createApiReference('#scalar-api-reference', {
      url: openApiUrl,
      theme: 'default',
      layout: 'modern',
    });
  };

  return (
    <>
      <main id='scalar-api-reference' className='min-h-screen' />
      <Script
        src='https://cdn.jsdelivr.net/npm/@scalar/api-reference'
        strategy='afterInteractive'
        onLoad={initialize}
      />
    </>
  );
}
