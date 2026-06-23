"use client";

import { CardItem } from "@/lib/contentful";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  cards: CardItem[];
  initialSport?: string;
};

export default function CollectionClient({ cards, initialSport, }: Props) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const updateURL = (newFilters: {
    sport?: string;
    brand?: string;
    series?: string;
    year?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

      if (newFilters.sport) params.set("sport", newFilters.sport);
      if (newFilters.sport) params.set("sport", newFilters.sport);
      if (newFilters.sport) params.set("sport", newFilters.sport);
      if (newFilters.sport) params.set("sport", newFilters.sport);

      router.push(`/collection?${params.toString()}`);
  };

  // ===============================
  // STATE (filters)
  // ===============================
  const [sportFilter, setSportFilter] = useState<string>(initialSport ?? "All");
  const [brandFilter, setBrandFilter] = useState<string>("All");
  const [seriesFilter, setSeriesFilter] = useState<string>("All");
  const [yearFilter, setYearFilter] = useState<string>("All");



  // ===============================
  // DERIVED FILTER OPTIONS
  // (built dynamically from Contentful data)
  // ===============================
  const sports = [
    "All",
    ...Array.from(
      new Set(
        cards
          .map((card) => card.sport)
          .filter((s): s is string => typeof s === "string")
      )
    ),
  ];

  const brands = [
    "All",
    ...Array.from(
      new Set(
        cards
          .map((card) => card.brand)
          .filter((b): b is string => typeof b === "string")
      )
    ),
  ];

  const series = [
    "All",
    ...Array.from(
      new Set(
        cards
          .map((card) => card.series)
          .filter((s): s is string => typeof s === "string")
      )
    ),
  ];

  const years = [
    "All",
    ...Array.from(
      new Set(
        cards
          .map((card) => card.year)
          .filter((y): y is number => typeof y === "number")
          .map((y) => y.toString())
      )
    ),
  ];

  // ===============================
  // FILTER LOGIC (main dataset)
  // ===============================
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSport =
        sportFilter === "All" || card.sport === sportFilter;

      const matchesBrand =
        brandFilter === "All" || card.brand === brandFilter;

      const matchesSeries =
        seriesFilter === "All" || card.series === seriesFilter;

      const matchesYear =
        yearFilter === "All" ||
        card.year?.toString() === yearFilter;

      return (
        matchesSport &&
        matchesBrand &&
        matchesSeries &&
        matchesYear
      );
    });
  }, [
    cards,
    sportFilter,
    brandFilter,
    seriesFilter,
    yearFilter,
  ]);

  // ===============================
  // CLEAR ALL FILTERS FUNCTION
  // ===============================
  const clearFilters = () => {
    setSportFilter("All");
    setBrandFilter("All");
    setSeriesFilter("All");
    setYearFilter("All");
    
    router.push("/collection");
  };

  return (
    <div>

      {/* ===============================
          PAGE TITLE
      =============================== */}
      <h1 className="text-2xl font-semibold mb-6">
        Collection
      </h1>

      {/* ===============================
          FILTER UI SECTION
          (pill buttons grouped by category)
      =============================== */}
      <div className="space-y-6 mb-6">

        {/* Sport */}
        <div>
          <p className="text-sm font-medium mb-2">Sport</p>
          <div className="flex flex-wrap gap-2">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => {
                  const value = sportFilter === sport ? "All" : sport;

                  setSportFilter(value);
                  updateURL({ sport: value === "All" ? undefined : value})
                }
                }
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  sportFilter === sport
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div>
          <p className="text-sm font-medium mb-2">Brand</p>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => {
                  const value = brandFilter === brand ? "All" : brand;

                  setBrandFilter(value);
                  updateURL({ brand: value === "All" ? undefined : value})
                }
                }
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  brandFilter === brand
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Series */}
        <div>
          <p className="text-sm font-medium mb-2">Series</p>
          <div className="flex flex-wrap gap-2">
            {series.map((seriesName) => (
              <button
                key={seriesName}
                onClick={() => {
                  const value = seriesFilter === seriesName ? "All" : seriesName;

                  setSportFilter(value);
                  updateURL({ series: value === "All" ? undefined : value})
                }
                }
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  seriesFilter === seriesName
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {seriesName}
              </button>
            ))}
          </div>
        </div>

        {/* Year */}
        <div>
          <p className="text-sm font-medium mb-2">Year</p>
          <div className="flex flex-wrap gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => {
                  const value = yearFilter === year ? "All" : year;

                  setSportFilter(value);
                  updateURL({ year: value === "All" ? undefined : value})
                }
                }
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  yearFilter === year
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ===============================
          STEP 2 — ACTIVE FILTER CHIPS
          (shows what is currently applied)
      =============================== */}
      {(sportFilter !== "All" ||
        brandFilter !== "All" ||
        seriesFilter !== "All" ||
        yearFilter !== "All") && (
        <div className="mb-6">

          <div className="flex flex-wrap gap-2 mb-3">

            {sportFilter !== "All" && (
              <button
                onClick={() => setSportFilter("All")}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 border"
              >
                Sport: {sportFilter} ✕
              </button>
            )}

            {brandFilter !== "All" && (
              <button
                onClick={() => setBrandFilter("All")}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 border"
              >
                Brand: {brandFilter} ✕
              </button>
            )}

            {seriesFilter !== "All" && (
              <button
                onClick={() => setSeriesFilter("All")}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 border"
              >
                Series: {seriesFilter} ✕
              </button>
            )}

            {yearFilter !== "All" && (
              <button
                onClick={() => setYearFilter("All")}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 border"
              >
                Year: {yearFilter} ✕
              </button>
            )}

          </div>

          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:underline"
          >
            Clear All Filters
          </button>

        </div>
      )}

      {/* ===============================
          STEP 3 — RESULT COUNT
      =============================== */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredCards.length} card
        {filteredCards.length !== 1 ? "s" : ""}
      </p>

      {/* ===============================
          CARD GRID
      =============================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {filteredCards.map((card) => (
          <Card key={card.id} className="overflow-hidden">

            {/* IMAGE */}
            <div className="relative w-full h-48 bg-gray-100">
              {card.imageUrl ? (
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>

            {/* CONTENT */}
            <CardContent className="p-4 space-y-1">
              <h3 className="font-medium">{card.title}</h3>
              <p className="text-sm text-muted-foreground">
                {card.player}
              </p>
              <p className="font-semibold text-[#3f6b4b]">
                {card.price}
              </p>
            </CardContent>

          </Card>
        ))}

      </div>

    </div>
  );
}