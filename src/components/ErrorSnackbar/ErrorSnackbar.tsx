import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {setAppErrorAC} from "../../app/app-reducer";
import {Snackbar} from "@material-ui/core";
import {AlertProps} from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <Alert variant="filled" severity="error" ref={ref} {...props} />;
});

export function ErrorSnackbar() {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch()
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };


    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert variant="filled" severity="error" onClose={handleClose} sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
