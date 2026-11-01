import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function FeatureTile({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <div className="rounded-lg bg-latte p-4">
      <Icon className="mb-2 text-caramel" />
      <div className="font-bold">{title}</div>
      <div className="text-sm text-ink-2">{desc}</div>
    </div>
  );
}

export function InfoRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: ReactNode }) {
  return (
    <div className="flex items-start gap-3 border-b border-line py-3">
      <Icon size={20} className="mt-0.5 text-caramel" />
      <div>
        <div className="text-caption">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}

