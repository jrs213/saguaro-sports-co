"use client";

import { CardItem } from "@/lib/contentful";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useMemo, useState } from "react";


type Props = {
    cards: CardItem[];
};

export default function CollectionClient({ cards }: Props) {

    const [sportFilter, setSportFilter] = useState<string>("All");
    const [brandFilter, setBrandFilter] = useState<string>("All");
    const [seriesFilter, setSeriesFilter] = useState<string>("All");
    const [yearFilter, setYearFilter] = useState<string>("All");

    const sports = ["All", ...new Set(cards.map(card => card.sport).filter(Boolean))];
    const brands = ["All", ...new Set(cards.map(card => card.brand).filter(Boolean))];
    const series = ["All", ...new Set(cards.map(card => card.series).filter(Boolean))];
    const years = ["All", ...new Set(cards.map(card => card.year?.toString()).filter(Boolean))];

    const filteredCards = useMemo(() => {
        return cards.filter((card) => {
            const matchesSport = sportFilter === "All" || card.sport === sportFilter;
            const matchesBrand = brandFilter === "All" || card.brand === brandFilter;
            const matchesSeries = seriesFilter === "All" || card.series === seriesFilter;
            const matchesYear = yearFilter === "All" || card.year?.toString() === yearFilter;

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

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Collection</h1>
            <div className="flex flex-wrap gap-4 mb-6">
                {/* Sport Filter */}
                <select
                    value={sportFilter}
                    onChange={(e) => setSportFilter(e.target.value)}
                    className="border rounded px-3 py-2"
                    >
                        {sports.map((sport) => (
                            <option key={sport} value={sport}>{sport}</option>
                        ))}
                    </select>
                {/* Brand Filter */}
                <select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    className="border rounded px-3 py-2"
                    >
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                {/* Series Filter */}
                <select
                    value={seriesFilter}
                    onChange={(e) => setSeriesFilter(e.target.value)}
                    className="border rounded px-3 py-2"
                    >
                        {series.map((series) => (
                            <option key={series} value={series}>{series}</option>
                        ))}
                    </select>
                {/* Year Filter */}
                <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="border rounded px-3 py-2"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredCards.map((card) => (
                    <Card key={card.id} className="overflow-hidden">
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
                        <CardContent className="p-4 space-y-1">
                            <h3 className="font-medium">{card.title}</h3>
                            <p className="text-sm text-muted-foreground">{card.player}</p>
                            <p className="font-semibold text-[#3f6b4b]">{card.price}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}