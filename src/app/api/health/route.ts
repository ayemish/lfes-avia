import { NextResponse } from "next/server";

/**
 * Health check endpoint. Reports whether core integrations are configured.
 * Used for uptime checks and to confirm env wiring on a fresh deploy.
 * Future API routes (e.g. /api/telegram/webhook, /api/concierge) land in M3.
 */
export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "lfes-avia",
    integrations: {
      supabase: Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ),
      openai: Boolean(process.env.OPENAI_API_KEY),
      telegram: Boolean(process.env.TELEGRAM_BOT_TOKEN),
    },
    timestamp: new Date().toISOString(),
  });
}
