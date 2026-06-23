import { getCardById } from "@/lib/contentful";
import Image from "next/image";
import Link from "next/link";

export default async function CardPage({
  params,
}: {
  params: { id: string };
}) {
  const card = await getCardById(params.id);

  if (!card) {
    return (
      <div className="p-10 text-center">
        <p>Card not found</p>
        <Link href="/collection" className="text-blue-600">
          Back to collection
        </Link>
      </div>
    );
  }
  console.log(card.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <Link
        href="/collection"
        className="text-sm text-muted-foreground"
      >
        ← Back to Collection
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-6">

        {/* IMAGE */}
        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
          {card.imageUrl && (
            <Image
              src={card.imageUrl}
              alt={card.title}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* DETAILS */}
        <div className="space-y-4">

          <h1 className="text-2xl font-semibold">
            {card.title}
          </h1>

          <p className="text-muted-foreground">
            {card.player}
          </p>

          <p className="text-2xl font-bold text-[#3f6b4b]">
            ${card.price}
          </p>

          <div className="space-y-1 text-sm border-t pt-4">
            <p><span className="font-medium">Sport:</span> {card.sport}</p>
            <p><span className="font-medium">Brand:</span> {card.brand}</p>
            <p><span className="font-medium">Series:</span> {card.series}</p>
            <p><span className="font-medium">Year:</span> {card.year}</p>
          </div>

          <a
            href={card.ebayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-[#e53935] text-white px-5 py-2 rounded-md hover:bg-[#c62828] transition"
          >
            View on eBay
          </a>

        </div>
      </div>
    </div>
  );
}