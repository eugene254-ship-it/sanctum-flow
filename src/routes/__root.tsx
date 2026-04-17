import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SolanaProvider } from "@/components/SolanaProvider";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Atlas Sanctum — Living Creator Economies" },
      { name: "description", content: "Living creator economies powered by impact. Launch tokens, grow your Sanctum Score, and distribute value automatically." },
      { name: "author", content: "Atlas Sanctum" },
      { property: "og:title", content: "Atlas Sanctum — Living Creator Economies" },
      { property: "og:description", content: "Living creator economies powered by impact. Launch tokens, grow your Sanctum Score, and distribute value automatically." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Atlas Sanctum — Living Creator Economies" },
      { name: "twitter:description", content: "Living creator economies powered by impact. Launch tokens, grow your Sanctum Score, and distribute value automatically." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/616c156e-da8b-4627-a7b6-e0f5c4d23ca9/id-preview-0993802e--ddc0e2a8-0282-453d-a1f6-7e32b254ec71.lovable.app-1776438579026.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/616c156e-da8b-4627-a7b6-e0f5c4d23ca9/id-preview-0993802e--ddc0e2a8-0282-453d-a1f6-7e32b254ec71.lovable.app-1776438579026.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <SolanaProvider>
      <Outlet />
    </SolanaProvider>
  );
}
