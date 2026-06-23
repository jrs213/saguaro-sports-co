import {getCards} from "@/lib/contentful";
import CollectionClient from "@/components/collection/CollectionClient";

export default async function CollectionPage({
    searchParams,
}: {
    searchParams: Promise<{
        sport?: string;
    }>;
}) {

    const params = await searchParams;

    const cards = await getCards();
    return (
        <div>
            <CollectionClient cards={cards} initialSport={params.sport} />
        </div>

    );
}