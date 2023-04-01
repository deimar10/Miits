import React from 'react';
import { IMaskInput } from 'react-imask';
import TextField from '@mui/material/TextField';

interface Props {
    name: string,
    label: string,
    variant: any,
    value: string,
    InputLabelProps: object,
    InputProps: any,
    onChange(e: any): void
}

export const DateField = ({name, label, variant, value, InputLabelProps, InputProps, onChange}: Props) => {
    return (
        <TextField
            name={name}
            label={label}
            variant={variant}
            value={value}
            InputLabelProps={InputLabelProps}
            InputProps={{
                inputComponent: MaskedInput,
                ...InputProps
            }}
            onChange={onChange}
        />
    );
}

const MaskedInput = React.forwardRef<any>((props: any, ref) => {
    return (
        <IMaskInput
            mask={dateMask}
            lazy={true}
            inputRef={ref}
            {...props}
        />
    );
})

const dateMask = '00.00.0000';

