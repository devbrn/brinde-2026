import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brinde | ConstruLead para Marmorarias" },
      {
        name: "description",
        content:
          "Landing page da Agência Brinde para atrair marmorarias por meio de um sistema de geração de novos orçamentos qualificados.",
      },
      { property: "og:title", content: "Brinde | ConstruLead para Marmorarias" },
      {
        property: "og:description",
        content:
          "Landing page da Agência Brinde para atrair marmorarias por meio de um sistema de geração de novos orçamentos qualificados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      className="block h-dvh w-full border-0"
      src="/construlead-canonical.html"
      title="Brinde | ConstruLead para Marmorarias"
    />
  );
}
