import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';

export default () => {
    const [auth, setAuth] = useState(false);
    
    const history = useHistory();

    const handleSignIn = () => history.push('/signin');
    const handleSignUp = () => history.push('/signup');

    const content = (
        <>
            <Box display="flex" justifyContent="center">
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
    
    if (auth) return null;

    return content;
}