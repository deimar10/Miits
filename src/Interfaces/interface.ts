export interface OfferInterface extends feedback{
    id: number,
    upcoming: boolean,
    favorite: boolean,
    title: string,
    category: string,
    slug: string,
    location: string,
    price: number,
    date: string,
    image: string,
    description: string,
}

interface feedback {
    feedback: Array<{
        name: string,
        comment: string
    }>
}

