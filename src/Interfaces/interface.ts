export interface OfferInterface {
    id: number,
    upcoming: boolean,
    title: string,
    category: string,
    slug: string,
    location: string,
    price: number,
    date: string,
    image: string,
    description: string,
    feedback: Array<{
        name: string,
        comment: string
    }>
}

