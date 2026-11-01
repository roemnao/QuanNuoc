"use client";
import { useEffect, useRef } from "react";
import { usePoll } from "@/lib/use-poll";

export default function ScreenPage() {
  const { data } = usePoll<{ ready: string[]; brewing: string[] }>("/api/screen", 1500);
  const seen = useRef<Set<string> | null>(null);

  // Phát tiếng gọi số khi có số mới chuyển sang "Xong" (lần tải đầu chỉ ghi nhận, không đọc).
  useEffect(() => {
    if (!data) return;
    if (seen.current === null) {
      seen.current = new Set(data.ready);
      return;
    }
    const fresh = data.ready.filter((c) => !seen.current!.has(c));
    fresh.forEach((c) => seen.current!.add(c));
    if (fresh.length && "speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(`Mời số ${fresh.join(", ")} nhận đồ uống`);
      u.lang = "vi-VN";
      speechSynthesis.speak(u);
    }
  }, [data]);

  return (
    <div className="grid min-h-screen grid-cols-3 gap-6 bg-espresso p-8 text-cream">
      <section className="col-span-2">
        <h1 className="mb-4 text-3xl font-bold text-green-soft">XONG – MỜI LẤY LY</h1>
        <div className="flex flex-wrap gap-6">
          {data?.ready.map((c) => <span key={c} className="rounded-lg bg-green px-8 py-4 text-8xl font-extrabold">{c}</span>)}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-3xl font-bold text-caramel-soft">ĐANG PHA</h2>
        <div className="flex flex-wrap gap-3">
          {data?.brewing.map((c) => <span key={c} className="rounded-md bg-ink-2 px-4 py-2 text-4xl font-bold">{c}</span>)}
        </div>
      </section>
    </div>
  );
}
