# Layout patterns

## Auth split (register / login)

```tsx
<main className="flex min-h-screen w-full bg-[#07070D] text-white [color-scheme:dark] min-[1420px]:h-screen min-[1420px]:overflow-hidden">
  <div className="flex min-h-screen w-full min-w-0 flex-1 min-[1420px]:h-screen min-[1420px]:w-[50vw] min-[1420px]:flex-none min-[1420px]:overflow-y-auto">
    <section aria-labelledby="register-heading" className="m-auto flex w-full justify-center px-6 py-14 sm:px-10">
      <div className="mx-auto flex w-full max-w-[29.625rem] flex-col items-center justify-center gap-12">
        {/* logo 45x44, h1 36px extrabold tracking -1.08px, form, footer */}
      </div>
    </section>
  </div>
  <aside aria-hidden="true" className="fixed right-0 top-0 hidden h-screen w-[50vw] flex-none items-center justify-center overflow-hidden bg-[#1A1922] min-[1420px]:flex">
    <img src="/figma/group-20.svg" alt="" width={710} height={850} className="h-full w-full object-cover" />
  </aside>
</main>
```

Left scrolls alone; right is fixed 50vw and never moves.

## Sidebar page (cookies-policy)

```tsx
<main className="flex min-h-screen w-full bg-[#07070D] px-[3rem] text-white [color-scheme:dark]">
  <div className="sticky top-0 h-screen flex-none">
    <AppSidebar />
  </div>
  <div className="flex min-w-0 flex-1 flex-col">{/* navbar + article stub */}</div>
</main>
```

- `px-[3rem]` gives the 48px sides.
- Shared `components/app-sidebar.tsx` reuses `public/figma/sidebar-*.svg`.
- Pro card: 24px radius + exact Figma image-transform transcription (not plain `object-cover`).
- Footer: member 16.2px SemiBold `#F0F0F7`, trial 12.6px Medium `#B3B3BD`, dots pill `#25252C` with left inset.
- Nav: 18px Inter, Home Bold `#F0F0F7`, others Medium `#C9C9D1`, letterSpacing -0.36, active row bg `#1A1A23`.
