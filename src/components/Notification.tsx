import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { rootStateT } from '../store/types'
import { dropNotification } from '../actions'

export default () => {
    const dispatch = useDispatch();
    const notification = useSelector((state: rootStateT) => state.services.notification);

    const handleAlertClose = () => {
        dispatch(dropNotification());
    }

    return (
        <Snackbar open={Boolean(notification.msg)} autoHideDuration={6000} onClose={handleAlertClose}>
            <MuiAlert severity={notification.type} elevation={6} variant="filled" onClose={handleAlertClose}>
                {notification.msg}
            </MuiAlert>
        </Snackbar>
    )
}