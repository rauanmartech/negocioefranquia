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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Guard para React Strict Mode (dupla montagem em desenvolvimento)
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    // Marca como inicializado somente após confirmar que o iframe existe.
    // O cleanup reseta o flag na desmontagem, garantindo que ao retornar
    // para a Home o anúncio seja recriado corretamente.
    initialized.current = true;

    // Acessa o documento interno do iframe
    const iframeDoc =
      iframe.contentDocument ?? iframe.contentWindow?.document;
    if (!iframeDoc) return;

    // HTML completo do anúncio isolado dentro do iframe.
    // O document.write do Space fica confinado aqui — não afeta a página principal.
    const adHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { overflow: hidden; background: transparent; }
    </style>
  </head>
  <body>
    <!-- Enfileira o anúncio ANTES de carregar o script externo -->
    <script type="text/javascript">
      var space = space || {};
      space.runs = space.runs || [];
      space.runs.push(function () {
        space.ad('${AD_TOKEN}').setSize(${width}, ${height}).setMacro('').fire();
      });
    </script>
    <!-- Script externo Space — carregado aqui, isolado no iframe -->
    <script src="${SPACE_SRC}" type="text/javascript"></script>
  </body>
</html>`;

    iframeDoc.open();
    iframeDoc.write(adHtml);
    iframeDoc.close();

    // Cleanup: reseta o guard ao desmontar (ex: ao sair da Home).
    // Garante que ao retornar para a Home o anúncio seja recriado corretamente,
    // sem duplicatas e sem estado residual entre navegações.
    return () => {
      initialized.current = false;
    };
  }, [width, height]);

  return (
    <div
      aria-label="Espaço publicitário"
      style={{
        width: '100%',
        maxWidth: `${width}px`,
        height: `${height}px`,
        margin: '0 auto',
        overflow: 'hidden',
        // Reserva o espaço visual antes do ad carregar
        background: 'transparent',
      }}
    >
      <iframe
        ref={iframeRef}
        id={`ad-iframe-${instanceId.replace(/:/g, '')}`}
        title="Publicidade"
        aria-label="Anúncio publicitário"
        scrolling="no"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          border: 'none',
          display: 'block',
          // Mantém o iframe dentro do container sem vazar
          maxWidth: '100%',
        }}
      />
    </div>
  );
}
