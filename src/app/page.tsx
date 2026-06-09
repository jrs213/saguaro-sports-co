import Hero from "@/components/layout/hero";
import FeaturedCards from "@/components/layout/featured-cards";
import CategoryTiles from "@/components/layout/category-tile";
import { getCards } from "@/lib/contentful";

export default async function Home() {
  const cards = await getCards();

  const featuredCards = cards.filter(
    (card) => card.featured
  );

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8">
      <Hero />

      <FeaturedCards cards={featuredCards} />

      <CategoryTiles />
    </main>
  );
}