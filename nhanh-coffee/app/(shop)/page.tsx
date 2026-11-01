import Link from "next/link";
import { Clock, MapPin, Smartphone, Zap } from "lucide-react";
import { FeatureTile } from "@/components/static";
import { MENU, vnd } from "@/lib/menu";

export default function Home() {
  const featured = MENU.slice(0, 3);
  return (
    <div className="space-y-8">
      <section className="rounded-lg bg-espresso p-6 text-cream md:p-12">
        <p className="mb-2 text-sm font-semibold text-caramel-soft">Cà phê mang đi · Tự phục vụ</p>
        <h1 className="text-display-l md:text-display-xl">Đặt trong 3 chạm.<br />Lấy ly không phải chờ.</h1>
        <Link href="/menu" className="mt-6 inline-flex min-h-11 items-center rounded-md bg-caramel px-6 font-semibold text-white">Đặt món ngay</Link>
      </section>

      <section className="flex items-center justify-between rounded-lg bg-caramel-soft p-4">
        <div>
          <div className="font-bold">Giờ vàng 7:00–9:00</div>
          <div className="text-sm text-ink-2">Giảm 20% mọi món cà phê khi đặt online</div>
        </div>
        <Clock className="text-caramel" />
      </section>

      <section>
        <h2 className="text-h2 mb-3">Món bán chạy</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {featured.map((i) => (
            <Link key={i.id} href="/menu" className="rounded-lg border border-line bg-white p-4">
              <div className="font-semibold">{i.name}</div>
              <div className="font-bold text-caramel">{vnd(i.price)}</div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-h2 mb-3">Cách đặt</h2>
        <div className="grid gap-3 md:grid-cols-4">
          <FeatureTile icon={Smartphone} title="1. Chọn món" desc="Bấm + trên thực đơn" />
          <FeatureTile icon={Zap} title="2. Xác nhận" desc="Thanh toán QR hoặc tiền mặt" />
          <FeatureTile icon={Clock} title="3. Theo dõi" desc="Nhận số thứ tự, xem trạng thái" />
          <FeatureTile icon={MapPin} title="4. Lấy ly" desc="Tới quầy khi số hiện “Xong”" />
        </div>
      </section>
    </div>
  );
}
