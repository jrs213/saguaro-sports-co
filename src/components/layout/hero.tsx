import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="py-16 md:py-24 text-center">

            {/* Headline */}
            <h1 className="text-3xl md:text-5xl font-bold text-[#3f6b4b]">Sports Cards & Memorabilia Marketplace</h1>

            {/* Subtext */}
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Curated listings from Saguaro Sports Co. Browse modern and vintage cards, all linked directly to live eBay listings.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex items-center justify-center gap-4">
                <Button className="bg-[#3f6b4b] hover:bg-[#2f5239]" >
                    Browse Collection
                </Button>
                <Button variant="outline">
                    Featured Cards
                </Button>

            </div>
        </section>
    )
}