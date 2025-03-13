import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "48");
    const edition = searchParams.get("edition");
    const minStrength = searchParams.get("minStrength");
    const maxStrength = searchParams.get("maxStrength");
    const minVitality = searchParams.get("minVitality");
    const maxVitality = searchParams.get("maxVitality");
    const minTwilight = searchParams.get("minTwilight");
    const maxTwilight = searchParams.get("maxTwilight");
    const kind = searchParams.get("kind");
    const type = searchParams.get("type");
    const culture = searchParams.get("culture");

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from("lotr_cards").select("*", { count: "exact" });

    if (edition) {
      query = query.eq("set_id", edition);
    }

    if (minStrength) {
      query = query.gte("strength", minStrength);
    }

    if (maxStrength) {
      query = query.lte("strength", maxStrength);
    }

    if (minVitality) {
      query = query.gte("vitality", minVitality);
    }

    if (maxVitality) {
      query = query.lte("vitality", maxVitality);
    }

    if (minTwilight) {
      query = query.gte("twilight", minTwilight);
    }

    if (maxTwilight) {
      query = query.lte("twilight", maxTwilight);
    }

    if (kind) {
      query = query.eq("kind", kind);
    }

    if (type) {
      query = query.eq("type", type);
    }

    if (culture) {
      query = query.eq("culture", culture);
    }

    const { data, error, count } = await query
      .range(from, to)
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({
      data,
      meta: {
        totalItems: count,
        itemsPerPage: limit,
        currentPage: page,
        totalPages,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
