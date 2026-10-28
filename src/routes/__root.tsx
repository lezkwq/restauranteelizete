import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { btnClass } from "@/components/site/Buttons";

function NotFoundComponent() {
  return (
    <section className="container-editorial grid min-h-[70vh] items-center py-20">
      <div className="max-w-2xl">
        <p className="eyebrow text-primary">Erro 404</p>
        <h1 className="display-lg mt-6 text-ocean">Esta página foi levada pela maré.</h1>
        <p className="mt-6 max-w-md text-lg text-muted-foreground">
          O endereço que você procurou não existe ou mudou de lugar.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/" className={btnClass({})}>Voltar ao início</Link>
          <Link to="/cardapio" className={btnClass({ variant: "outline" })}>Ver cardápio</Link>
        </div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl text-ocean">Esta página não carregou</h1>
        <p className="mt-3 text-sm text-muted-foreground">Algo deu errado. Tente novamente ou volte ao início.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className={btnClass({})}>Tentar novamente</button>
          <a href="/" className={btnClass({ variant: "outline" })}>Início</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Restaurante Elizete" },
      { name: "description", content: "Frutos do mar na Praia do Estaleiro, Balneário Camboriú." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#2328C4" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const shareImage = new URL("/images/lagosta-ilustracao.png", useRouter().origin).href;
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1774" />
        <meta property="og:image:height" content="887" />
        <meta property="og:image:alt" content="Ilustração de lagosta do Restaurante Elizete sobre fundo azul" />
        <meta name="twitter:image" content={shareImage} />
        <meta name="twitter:image:alt" content="Ilustração de lagosta do Restaurante Elizete sobre fundo azul" />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
