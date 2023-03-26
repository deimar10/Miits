import {OfferInterface} from '../Interfaces/interface';

const date = new Date().getTime();

export const handleOfferStatus = (offers: OfferInterface[]): OfferInterface[] => {
    return offers.map((object: OfferInterface) => {
        if (date < new Date(object.date).getTime()) {
            return {...object, upcoming: true};
        } else {
            return {...object, upcoming: false};
        }
    })
}