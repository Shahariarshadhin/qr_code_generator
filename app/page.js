import QRForm from "@/components/QRForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper bg-kraft px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Social QR Hub
          </p>
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
            One scan. All your links.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-ink/70">
            A QR code can only point to one place — so this generates a code
            that opens a clean landing page listing your Facebook, Instagram,
            website, YouTube, and WhatsApp. Perfect for a shopping bag.
          </p>
        </div>
        <QRForm />
      </div>
    </main>
  );
}
