import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
    modal: any,
    handleModalClose(): void,
    open: {offer: number, view: boolean}
}

function ActionModal({modal, handleModalClose, open}: Props) {

    const vertical = 'bottom';
    const horizontal = 'right';

    const modalStyle = {
        width: '100%',
        fontSize: '1.05rem'
    }

    return (
        <>
            <Snackbar
                open={open.view}
                autoHideDuration={3000}
                onClose={handleModalClose}
                message={modal[0]}
                anchorOrigin={{vertical, horizontal}}
                data-cy="action-description"
            >
                <Alert onClose={handleModalClose} severity={modal[1]} sx={modalStyle}>
                    {modal[0]}
                </Alert>
            </Snackbar>
        </>
    );
}

export default ActionModal;
