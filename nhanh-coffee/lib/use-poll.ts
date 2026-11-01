"use client";
import { useEffect, useState } from "react";

/** Làm mới dữ liệu mỗi `ms` mili-giây (thay cho Realtime khi chưa nối Supabase). */
export function usePoll<T>(url: string | null, ms = 2000, headers?: Record<string, string>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<number | null>(null);
  const key = JSON.stringify(headers ?? {});
  useEffect(() => {
    if (!url) return;
    let stop = false;
    const tick = async () => {
      try {
        const r = await fetch(url, { headers, cache: "no-store" });
        if (stop) return;
        if (r.ok) { setData(await r.json()); setError(null); } else setError(r.status);
      } catch {}
    };
    tick();
    const id = setInterval(tick, ms);
    return () => { stop = true; clearInterval(id); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ms, key]);
  return { data, error };
}
