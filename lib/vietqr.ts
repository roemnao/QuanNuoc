/** Ảnh VietQR theo số tiền + nội dung = mã đơn. Trả null nếu chưa cấu hình ngân hàng. */
export function vietQrUrl(amount: number, code: string): string | null {
  const bank = process.env.VIETQR_BANK;
  const account = process.env.VIETQR_ACCOUNT;
  if (!bank || !account) return null;
  const p = new URLSearchParams({ amount: String(amount), addInfo: `NHANH ${code}` });
  if (process.env.VIETQR_NAME) p.set("accountName", process.env.VIETQR_NAME);
  return `https://img.vietqr.io/image/${bank}-${account}-compact2.png?${p}`;
}
