import { createClient } from "contentful";

export type CardItem = {
  id: string;
  title: string;
  player: string;
  price: number;
  ebayUrl: string;
  featured: boolean;
  imageUrl?: string;
  sport?: string;
  brand?: string;
  series?: string;
  year?: number;
};

type CardFields = {
  title: string;
  player: string;
  price: number;
  ebayUrl: string;
  featured?: boolean;
  sport?: string;
  brand?: string;
  series?: string;
  year?: number;
  image?: {
    fields?: {
      file?: {
        url?: string;
      };
    };
  };
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getCards(): Promise<CardItem[]> {
  const res = await client.getEntries({
    content_type: "cardItem",
  });

  return res.items.map((item) => {
    const fields = item.fields as CardFields;

    return {
      id: item.sys.id,
      title: fields.title,
      player: fields.player,
      price: fields.price,
      ebayUrl: fields.ebayUrl,
      featured: fields.featured ?? false,
      sport: fields.sport,
      brand: fields.brand,
      series: fields.series,
      year: fields.year,
      imageUrl: fields.image?.fields?.file?.url
        ? `https:${fields.image.fields.file.url}`
        : undefined,
    };
  });
}

export async function getCardById(id: string) : Promise<CardItem | null> {
  const res = await client.getEntry(id);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fields = res.fields as any;

  return {
    id: res.sys.id,
    title: fields.title,
    player: fields.player,
    price: fields.price,
    ebayUrl: fields.ebayUrl,
    featured: fields.featured ?? false,
    sport: fields.sport,
    brand: fields.brand,
    series: fields.series,
    year: fields.year,
    imageUrl: fields.image?.fields?.file?.url
      ? `https:${fields.image.fields.file.url}`
      : undefined,
  };
}