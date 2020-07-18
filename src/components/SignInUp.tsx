import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { rootStateT } from '../store/types'

export default () => {
    const services = useSelector((state: rootStateT) => state.services);
    const firstName = useSelector((state: rootStateT) => state.authentication.firstName);
    
    const history = useHistory();

    const handleSignIn = () => history.push('/signin');
    const handleSignUp = () => history.push('/signup');

    const content = (
        <>
            <Box display="flex" justifyContent="center" mt={7}>
                <Button variant="contained" color="primary" onClick={handleSignIn}>Sign In</Button>
                <Box alignSelf="end" mx={1}>
                    or
                </Box>
                <Button variant="contained" color="primary" onClick={handleSignUp}> Sign Up</Button>
            </Box>
            <Box textAlign="center" fontSize="h6.fontSize" mt={2}>
                for 5 days personal weather forecast
            </Box>
        </>
    );
    
    if (firstName || !services.serviceAvailable || services.gettingWeather) return null;

    return content;
}