<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project architecture

- The landing page at `/` is native React (src/components/landing) styled only by the approved stylesheet public/landing.css; Tailwind (styles.css) is loaded only by the 404/error screens so its base reset never alters the approved design. public/construlead-canonical.html is kept as a backup.
