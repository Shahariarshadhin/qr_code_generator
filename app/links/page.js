import { Facebook, Instagram, Globe, Youtube, MessageCircle } from "lucide-react";

function waLink(number) {
  const digits = (number || "").replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

export default function LinksPage({ searchParams }) {
  const name = searchParams?.name || "Our Business";
  const links = [
    { key: "fb", href: searchParams?.fb, label: "Facebook", Icon: Facebook },
    { key: "ig", href: searchParams?.ig, label: "Instagram", Icon: Instagram },
    { key: "web", href: searchParams?.web, label: "Website", Icon: Globe },
    { key: "yt", href: searchParams?.yt, label: "YouTube", Icon: Youtube },
    { key: "wa", href: waLink(searchParams?.wa), label: "WhatsApp", Icon: MessageCircle },
  ].filter((l) => l.href);

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper bg-kraft px-6 py-16">
      <div className="deckle-edge relative w-full max-w-md bg-cream/95 p-8 shadow-xl">
        {/* tag hole, echoing a real shopping-bag tag */}
        <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-paper-deep bg-paper" />

        <div className="mt-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Find us online
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink">{name}</h1>
        </div>

        <div className="mt-8 grid gap-3">
          {links.length === 0 && (
            <p className="text-center text-sm text-ink/50">
              No links configured yet.
            </p>
          )}
          {links.map(({ key, href, label, Icon }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md border border-ink/10 bg-white/70 px-4 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:bg-accent hover:text-cream"
            >
              <Icon size={18} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
