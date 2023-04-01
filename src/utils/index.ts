import {OfferInterface} from '../Interfaces/index';

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

export const FieldInputProps = (theme: boolean) => {
    return (
        {
            style: {
                color: theme ? 'white' : 'initial',
                width: '95%',
                border: `1px solid ${theme ? '#6b6b6b' : null}`,
                borderRadius: '4px',
            },
        }
    );
}

export const FieldLabelProps = (theme: boolean) => {
    return (
        {
            style: {
                color: theme ? '#5EFFB1' : 'initial',
                shrink: true,
                fontWeight: 'bold'
            },
        }
    );
}

export const FieldVariant = (theme: boolean) => {
    return (
        theme ? 'outlined' : 'standard'
    );
}