import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type CardItem = {
        id: string;
        title: string;
        player: string;
        price: string;
        ebayUrl: string;
        imageUrl?: string,
};

type Props = {
    cards: CardItem[];
};
        

export default function FeaturedCards({ cards }: Props) {
    console.log(cards);
    return (
        <section className="py-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                    Featured Cards
                </h2>
                <Button variant="ghost" size="sm">
                    View All
                </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cards.map((card) => (

                <Card key={card.id} className="overflow-hidden">
                    <div className="relative w-full h-48 bg-gray-100">
                        {card.imageUrl ? (
                        <Image
                            src={`https:${card.imageUrl}`}
                            alt={card.title}
                            fill
                            className="object-cover"
                        />
                        ) : (
                            <div className="flex items-center justify-center h-full txt-sm text-muted-foreground">
                                No Image Available
                            </div>
                        )}
                    </div>
                    <div className="p-4 space-y-2">
                        <h3 className="font-medium">
                            {/* Maybe add brand and set for card title */}
                            {card.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {card.player}
                        </p>
                        <p className="font-sembold text-[#3f6b4b]">
                            {card.price}
                        </p>
                        <Button className="w-full bg-[#e53935] hover:bg-[#c62828]" asChild>
                            <a href={card.ebayUrl} target="_blank" rel="noopener noreferrer">
                                View on eBay
                            </a>
                        </Button>
                    </div>
                </Card>
))}
            </div>
        </section>
    );
}