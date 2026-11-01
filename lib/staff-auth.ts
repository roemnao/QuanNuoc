export function isStaff(req: Request): boolean {
  const pin = process.env.STAFF_PIN ?? "1234";
  return req.headers.get("x-staff-pin") === pin;
}
