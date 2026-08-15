export default function ApiReferencePage() {
  return (
    <>
      <main id='scalar-api-reference' className='min-h-screen' />
      <script src='https://cdn.jsdelivr.net/npm/@scalar/api-reference'></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const basePath = window.location.pathname.replace(/\\/api-reference\\/?$/, '');

            Scalar.createApiReference('#scalar-api-reference', {
              url: \`${'${basePath}'}/openapi/v0/openapi.yaml\`,
              theme: 'default',
              layout: 'modern',
            });
          `,
        }}
      />
    </>
  );
}
