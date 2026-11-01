import { TabBar } from "@/components/ui";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TabBar />
      <main className="mx-auto max-w-[1200px] px-4 pb-24 pt-4 md:px-6 md:pb-12">{children}</main>
    </>
  );
}
