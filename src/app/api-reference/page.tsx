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

export default function ApiReferencePage() {
  const initialize = () => {
    if (!window.Scalar) return;

    const basePath = window.location.pathname.replace(/\/api-reference\/?$/, '');

    window.Scalar.createApiReference('#scalar-api-reference', {
      url: `${basePath}/openapi/v0/openapi.yaml`,
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
