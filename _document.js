import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Akıllı Senaryo Akademi - Lise öğrencileri için yapay zeka destekli sınav hazırlık platformu" />
        <meta name="keywords" content="lise, biyoloji, fizik, kimya, matematik, sınav hazırlık, yapay zeka, MEB" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
