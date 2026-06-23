import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const categories = [
    { name: "Football", slug: "football", image: "/Logo.png" },
    { name: "Baseball", slug: "baseball", image: "/Logo.png" },
    { name: "Basketball", slug: "basketball", image: "/Logo.png" },
    { name: "Hockey", slug: "hockey", image: "/Logo.png" },
];

export default function CategoryTiles() {
    return (
        <section className="py-12">
            <h2 className="text-xl font-semibold mb-6">
                Shop by Category
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {categories.map((cat) => (
                    <Link key={cat.slug} href={`/collection?sport=${cat.slug}`}>
                        <Card className="p-8 text-center cursor-pointer hover:shadow-md transition">
                            <h3 className="text-lg font-medium text-[#3f6b4b]">
                                {cat.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                Browse {cat.name} Cards
                            </p>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
}