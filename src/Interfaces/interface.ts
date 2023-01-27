export interface OfferInterface {
    id: number,
    upcoming: boolean,
    favorite: boolean,
    enterprise: string,
    title: string,
    category: string,
    slug: string,
    location: string,
    price: number,
    date: string,
    image: string,
    description: string,
    feedback: Array<{
        comment: string,
        name: string
    }>
}
export interface feedback {
    name: string,
    comment: string,
    nameError: string,
    commentError: string
}
export interface register {
    username: string,
    password: string,
    password_repeat: string
}

export interface login {
    username: string,
    password: string
}

