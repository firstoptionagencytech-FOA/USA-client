import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "JIT Helpdesk — Your Brand. Your Customers. One Connected Support Experience.",
  description: "Give your IT business its own branded mobile app and customer web portal—so clients can request help, approve quotes, make payments, and track progress, all under your business name.",
  keywords: ["IT Helpdesk", "MSP software", "branded customer portal", "computer repair software", "IT ticketing app"],
  openGraph: {
    title: "JIT Helpdesk — Branded Mobile App & Customer Web Portal for IT Support & MSPs",
    description: "Stop chasing clients for IT support updates. Deliver a branded mobile app, client web portal, and owner dashboard under your own company name.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Meta Pixel Code Placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              if(window.location.search.includes('pixel_init=true')) {
                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID || '0000000000000000'}');
                fbq('track', 'PageView');
              }
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen selection:bg-brand-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}
