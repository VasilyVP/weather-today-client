import React, { useState } from 'react';
import { Grid, Box, makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
//import Box from '@material-ui/core/Box';

/*
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    }
}));
*/

export default () => {
    const [auth, setAuth] = useState(false);

    const content = (
        <>
            <Box display="flex" justifyContent="center">
                <Button variant="contained" color="primary">Sign In</Button>
                <Box alignSelf="end" mx={1}>
                    or
                </Box>
                <Button variant="contained" color="primary" > Sign Up</Button>
            </Box>
            <Box textAlign="center" fontSize="h6.fontSize" mt={2}>
                for 5 days personal weather forecast
            </Box>
        </>
    );
    /*
    const content = (
        <>
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item>
                    <Button variant="contained" color="primary">Sign In</Button>
                </Grid>
                <Grid item>
                    or
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" > Sign Up</Button>
                </Grid>
            </Grid>
            <Box textAlign="center" fontSize="h6.fontSize" mt={2}>
                for 5 days personal weather forecast
            </Box>
        </>
    );
    */
    if (auth) return null;

    return content;
}