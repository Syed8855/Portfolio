import { NextResponse } from "next/server";
export const revalidate = 3600;
const query = `query { matchedUser(username: "iamhasnain04") { userCalendar { submissionCalendar } } }`;
export async function GET() {
  try {
    const response = await fetch("https://leetcode.com/graphql/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query }), next: { revalidate: 3600 } });
    const json = await response.json();
    return NextResponse.json({ calendar: JSON.parse(json?.data?.matchedUser?.userCalendar?.submissionCalendar ?? "{}") });
  } catch { return NextResponse.json({ calendar: {} }); }
}
