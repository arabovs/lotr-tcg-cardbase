"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import CardItem from "./card-item";
import Pagination from "./pagination";
import { Loader2 } from "lucide-react";

// Define the card type based on the database schema
type LotrCard = {
  id: number;
  card_id: string;
  card_name: string;
  card_image: string | null;
  set_name: string | null;
  set_id: string | null;
  rarity: string;
  card_number: string | null;
  card_type: string | null;
  type: string | null;
  subtype: string | null;
  game_text: string | null;
  flavor_text: string | null;
  twilight: number | null;
  strength: number | null;
  vitality: number | null;
  kind: string | null;
  resistance: number | null;
  culture: string | null;
  home_site: string | null;
  created_at: string;
};

export default function CardGrid() {
  const searchParams = useSearchParams();
  const [cards, setCards] = useState<LotrCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCards, setTotalCards] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  // Get filter values from URL params
  const edition = searchParams.get("edition") || "";
  const minStrength = searchParams.get("minStrength") || "";
  const maxStrength = searchParams.get("maxStrength") || "";
  const minVitality = searchParams.get("minVitality") || "";
  const maxVitality = searchParams.get("maxVitality") || "";
  const minTwilight = searchParams.get("minTwilight") || "";
  const maxTwilight = searchParams.get("maxTwilight") || "";
  const kind = searchParams.get("kind") || "";
  const type = searchParams.get("type") || "";
  const culture = searchParams.get("culture") || "";
  const page = Number.parseInt(searchParams.get("page") || "1");
  const name = searchParams.get("name") || "";

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  useEffect(() => {
    async function fetchCards() {
      setLoading(true);

      // Initialize Supabase client
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Start building the query
      let query = supabase.from("lotr_cards").select("*", { count: "exact" });

      // Apply filters
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

      if (culture) {
        query = query.eq("culture", culture);
      }

      if (type) {
        query = query.eq("type", type);
      }

      if (name) {
        query = query.ilike("card_name", `%${name.toLowerCase()}%`);
      }

      const from = (currentPage - 1) * cardsPerPage;
      const to = from + cardsPerPage - 1;

      // Execute the query
      const { data, error, count } = await query
        .range(from, to)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching cards:", error);
      } else {
        setCards(data as LotrCard[]);
        setTotalCards(count || 0);
      }

      setLoading(false);
    }

    fetchCards();
  }, [
    currentPage,
    edition,
    minStrength,
    maxStrength,
    minVitality,
    maxVitality,
    minTwilight,
    maxTwilight,
    kind,
    type,
    culture,
    name,
  ]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : cards.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground">
            No cards found matching your filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalItems={totalCards}
              itemsPerPage={cardsPerPage}
            />
          </div>
        </>
      )}

      {/* Mobile-only "Back to top" button */}
      <button
        className="fixed bottom-5 right-5 z-50 p-2 bg-gray-800 text-white rounded-full shadow-lg md:hidden"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        Go to the top
      </button>
    </div>
  );
}
