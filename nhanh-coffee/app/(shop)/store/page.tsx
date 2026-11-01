import { Clock, MapPin, Phone } from "lucide-react";
import { InfoRow } from "@/components/static";

// TODO: thay bằng địa chỉ, hotline, giờ mở cửa thật của quán.
export default function StorePage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-display-l mb-4">Cửa hàng</h1>
      <InfoRow icon={MapPin} label="Địa chỉ" value="(Chưa cập nhật)" />
      <InfoRow icon={Clock} label="Giờ mở cửa" value="(Chưa cập nhật)" />
      <InfoRow icon={Phone} label="Hotline" value="(Chưa cập nhật)" />
    </div>
  );
}
