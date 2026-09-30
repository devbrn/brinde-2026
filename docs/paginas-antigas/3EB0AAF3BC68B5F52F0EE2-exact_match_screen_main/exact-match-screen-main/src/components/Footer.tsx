import brandLogo from "@/assets/brinde-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="shell section-x flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
        <img src={brandLogo.url} alt="Brinde Marketing & Publicidade" className="block h-auto w-[170px] max-w-[70vw] shrink-0 grow-0 self-start object-contain sm:h-12 sm:w-auto sm:max-w-none lg:self-auto" />
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground lg:text-center">
          <strong className="text-foreground">ConstruLead</strong> — estrutura de geração de pedidos de orçamento para
          marmorarias. Valor orçado não representa faturamento realizado.
        </p>
        <nav aria-label="Links institucionais" className="flex gap-6 text-xs text-muted-foreground">
          <a href="#topo" className="transition-colors hover:text-gold">Política de Privacidade</a>
          <a href="#topo" className="transition-colors hover:text-gold">Termos de Uso</a>
        </nav>
      </div>
    </footer>
  );
}
