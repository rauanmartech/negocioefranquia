'use client';

/**
 * AdBanner — Componente centralizado de publicidade (Space / 00px.net)
 *
 * IMPORTANTE: O script Space usa `document.write()` internamente ao chamar
 * `fire()`. Se invocado após o carregamento da página, `document.write`
 * sobrescreve TODO o documento. Por isso, cada instância roda dentro de um
 * <iframe> isolado, onde o `document.write` é confinado sem afetar a página.
 *
 * Vantagens desta abordagem:
 *  ✓ Múltiplas instâncias sem conflito
 *  ✓ Nenhum risco de sobrescrever o documento principal
 *  ✓ Compatível com React Strict Mode (guard via useRef)
 *  ✓ Não depende de next/script (evita race conditions de estratégia de carga)
 *
 * Uso:
 *   <AdBanner />                         → 970×250 (billboard padrão)
 *   <AdBanner width={300} height={250} /> → medium rectangle
 *   <AdBanner width={300} height={600} /> → half page
 */

import { useEffect, useId, useRef } from 'react';

// ─── Constantes do anúncio ───────────────────────────────────────────────────

const SPACE_SRC = 'https://cdn.00px.net/static/space.didnfhd.min.js';

// Token base-64 do criativo (Ad Id 160622 / Campanha 009020261711 - Humaniza Minas)
const AD_TOKEN = 'eyJjciI6MjI5NTIyLCJjYSI6NzE2MiwicGwiOjE2MDYyMn0=';

// ─── Props ───────────────────────────────────────────────────────────────────

interface AdBannerProps {
  /** Largura do criativo em pixels (padrão: 970) */
  width?: number;
  /** Altura do criativo em pixels (padrão: 250) */
  height?: number;
}

// ─── Componente ──────────────────────────────────────────────────────────────

export default function AdBanner({ width = 970, height = 250 }: AdBannerProps) {
  const instanceId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Guard para React Strict Mode (dupla montagem em desenvolvimento)
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    initialized.current = true;

    const iframeDoc =
      iframe.contentDocument ?? iframe.contentWindow?.document;
    if (!iframeDoc) return;

    // HTML limpo: sem CSS agressivo que possa quebrar o anúncio internamente.
    // O body tem exatamente o tamanho do anúncio.
    const adHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        width: ${width}px; 
        height: ${height}px; 
        overflow: hidden; 
        background: transparent; 
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      var space = space || {};
      space.runs = space.runs || [];
      space.runs.push(function () {
        space.ad('${AD_TOKEN}').setSize(${width}, ${height}).setMacro('').fire();
      });
    </script>
    <script src="${SPACE_SRC}" type="text/javascript"></script>
  </body>
</html>`;

    iframeDoc.open();
    iframeDoc.write(adHtml);
    iframeDoc.close();

    return () => {
      initialized.current = false;
    };
  }, [width, height]);

  // ResizeObserver para escalar o iframe no mobile perfeitamente
  useEffect(() => {
    const container = containerRef.current;
    const iframe = iframeRef.current;
    if (!container || !iframe) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        if (containerWidth > 0 && containerWidth < width) {
          // Calcula a proporção para caber exatamente no container
          const scale = containerWidth / width;
          iframe.style.transform = `scale(${scale})`;
          iframe.style.transformOrigin = '0 0'; // Top Left
          // Ajusta a altura do container para o tamanho escalado
          container.style.height = `${height * scale}px`;
        } else {
          // Sem escala no desktop
          iframe.style.transform = 'none';
          container.style.height = `${height}px`;
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [width, height]);

  return (
    <div
      ref={containerRef}
      aria-label="Espaço publicitário"
      style={{
        width: '100%',
        maxWidth: `${width}px`,
        height: `${height}px`,
        margin: '0 auto',
        overflow: 'hidden',
        display: 'block', // Block com margin: 0 auto garante alinhamento à esquerda para o scale funcionar
        background: 'transparent',
      }}
      className="ad-banner-container"
    >
      <iframe
        ref={iframeRef}
        id={`ad-iframe-${instanceId.replace(/:/g, '')}`}
        title="Publicidade"
        aria-label="Anúncio publicitário"
        scrolling="no"
        className="ad-iframe-responsive"
        style={{
          width: `${width}px`, 
          height: `${height}px`, 
          border: 'none',
          display: 'block',
        }}
      />
    </div>
  );
}
