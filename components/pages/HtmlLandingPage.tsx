import fs from 'node:fs';
import path from 'node:path';
import Script from 'next/script';

type HtmlLandingPageProps = {
  sourcePath: string;
  scriptId: string;
  assetBasePath?: string;
};

function readLandingFile(sourcePath: string) {
  return fs.readFileSync(path.join(process.cwd(), sourcePath), 'utf8');
}

export function HtmlLandingPage({
  sourcePath,
  scriptId,
  assetBasePath,
}: HtmlLandingPageProps) {
  const source = readLandingFile(sourcePath);
  const styles = [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((match) => match[1])
    .join('\n');
  const script = [...source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1])
    .join('\n');
  let body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  body = body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  if (assetBasePath) {
    body = body.replaceAll('assets/videos/', `${assetBasePath}/`);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: body }}
      />
      {script && (
        <Script
          id={scriptId}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: script }}
        />
      )}
    </>
  );
}
