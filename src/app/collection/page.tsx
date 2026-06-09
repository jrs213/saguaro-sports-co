import {getCards} from "@/lib/contentful";
import CollectionClient from "@/components/collection/CollectionClient";

export default async function CollectionPage() {
    const cards = await getCards();
    return (
        <div>
            <CollectionClient cards={cards} />
        </div>

    );
}