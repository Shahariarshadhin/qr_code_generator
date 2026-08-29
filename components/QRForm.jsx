"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, Link2, FileImage } from "lucide-react";

const FIELDS = [
  { key: "name", label: "Cozy Yards", placeholder: "Cozy Yards", param: "name", required: true },
  { key: "facebookUrl", label: "Facebook URL", placeholder: "https://facebook.com/yourpage", param: "fb" },
  { key: "instagramUrl", label: "Instagram URL", placeholder: "https://instagram.com/yourpage", param: "ig" },
  { key: "websiteUrl", label: "Website URL", placeholder: "https://yourbrand.com", param: "web" },
  { key: "youtubeUrl", label: "YouTube URL", placeholder: "https://youtube.com/@yourchannel", param: "yt" },
  { key: "whatsappNumber", label: "WhatsApp number (with country code)", placeholder: "+8801XXXXXXXXX", param: "wa" },
];

function buildHubUrl(baseUrl, values) {
  const url = new URL("/links", baseUrl || "https://example.com");
  FIELDS.forEach(({ key, param }) => {
    const v = (values[key] || "").trim();
    if (v) url.searchParams.set(param, v);
  });
  return url;
}

export default function QRForm() {
  const [baseUrl, setBaseUrl] = useState("");
  const [values, setValues] = useState({
    name: "",
    facebookUrl: "",
    instagramUrl: "",
    websiteUrl: "",
    youtubeUrl: "",
    whatsappNumber: "",
  });
  const canvasRef = useRef(null);
  const [hubUrl, setHubUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && !baseUrl) {
      setBaseUrl(window.location.origin);
    }
  }, [baseUrl]);

  const finalUrl = buildHubUrl(baseUrl, values).toString();

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, finalUrl, {
      width: 480,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: "#2A211A", light: "#F5EEE0" },
    }).catch(() => {});
    setHubUrl(finalUrl);
  }, [finalUrl]);

  const handleChange = (key) => (e) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const downloadPng = () => {
    const link = document.createElement("a");
    link.download = `${values.name || "social-qr"}-qr.png`;
    // Re-render at high resolution for crisp printing on a bag
    const printCanvas = document.createElement("canvas");
    QRCode.toCanvas(printCanvas, finalUrl, {
      width: 2000,
      margin: 3,
      errorCorrectionLevel: "H",
      color: { dark: "#2A211A", light: "#F5EEE0" },
    }).then(() => {
      link.href = printCanvas.toDataURL("image/png");
      link.click();
    });
  };

  const downloadSvg = async () => {
    const svgString = await QRCode.toString(finalUrl, {
      type: "svg",
      margin: 3,
      errorCorrectionLevel: "H",
      color: { dark: "#2A211A", light: "#F5EEE0" },
    });
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${values.name || "social-qr"}-qr.svg`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Form */}
      <div className="deckle-edge bg-cream/90 bg-kraft p-8 shadow-lg">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
          Step 1
        </p>
        <h2 className="mb-6 font-display text-2xl font-bold">Fill in your links</h2>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-ink/70">
            Hub domain (where /links will be hosted, e.g. after deploying to Vercel)
          </label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://yourbrand.com"
            className="w-full rounded-md border border-paper-deep/40 bg-white/70 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>

        <div className="grid gap-4">
          {FIELDS.map(({ key, label, placeholder, required }) => (
            <div key={key}>
              <label className="mb-1 block text-sm font-medium text-ink/70">
                {label} {required && <span className="text-accent">*</span>}
              </label>
              <input
                type="text"
                value={values[key]}
                onChange={handleChange(key)}
                placeholder={placeholder}
                className="w-full rounded-md border border-paper-deep/40 bg-white/70 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-ink/50">
          Leave any field blank to skip that button on your links page.
        </p>
      </div>

      {/* QR preview */}
      <div className="deckle-edge flex flex-col items-center bg-cream/90 bg-kraft p-8 text-center shadow-lg">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
          Step 2
        </p>
        <h2 className="mb-6 font-display text-2xl font-bold">Your print-ready QR</h2>

        <div className="rounded-lg border-4 border-ink/10 bg-cream p-4">
          <canvas ref={canvasRef} className="h-60 w-60" />
        </div>

        <div className="mt-5 flex w-full items-center gap-2 rounded-md bg-white/60 px-3 py-2 text-left text-xs text-ink/60">
          <Link2 size={14} className="shrink-0" />
          <span className="truncate">{hubUrl}</span>
        </div>

        <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
          <button
            onClick={downloadSvg}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-cream transition hover:bg-accent-dark"
          >
            <Download size={16} /> Download SVG (best for print)
          </button>
          <button
            onClick={downloadPng}
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-accent px-4 py-3 text-sm font-semibold text-accent transition hover:bg-accent/10"
          >
            <FileImage size={16} /> Download PNG (2000px)
          </button>
        </div>

        <p className="mt-4 text-xs text-ink/50">
          SVG is vector — it stays sharp at any bag size. Use it if your printer
          accepts vector artwork; otherwise the high-res PNG works fine.
        </p>
      </div>
    </div>
  );
}
