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

export interface registered {
    name: string,
    id: number,
    joined_at: string
}

export interface PublicRouteProps {
    auth: {login: boolean},
    setAuth: (auth: any) => void,
    admin: boolean,
    setAdmin: (admin: boolean) => void,
    register: any
    setRegister: any
}

export interface PrivateRouteProps {
    theme: boolean,
    auth: {login: boolean},
    setAuth: (auth: {login: boolean}) => void,
    handleThemeSwitch: () => void,
    offersData: any
}

