import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import OAuth from 'client-oauth2'
import { googleAuth } from '../common/consts'
import { Button, IconButton, TextField, Avatar, CircularProgress } from '@material-ui/core'
import { Container, Grid, Box, CssBaseline, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { trySignIn, setSignedIn } from '../actions'
import { rootStateT } from '../store/types'
import googleLoginBtn from "../assets/imgs/btn_google_signin_dark_normal_web@2x.png"

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    gButton: {
        width: 180,
    },
    imgGButton: {
        width: 160
    }
}));

let formData = {
    email: '',
    password: '',
}
const initialFormErrors = {
    emailErr: false,
}

export default function SignIn() {
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [spinnerShow, setSpinnerShow] = useState(false);

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const email = useSelector((state: rootStateT) => state.authentication.email);
    const notification = useSelector((state: rootStateT) => Boolean(state.services.notification.msg))

    if (email) history.replace('/');

    function areFieldsOk(data: typeof formData) {
        const fErrs = { ...initialFormErrors };

        fErrs.emailErr = !data.email.match(/.+@.+\..+/);
        setFormErrors(fErrs);

        const result = !Object.values(fErrs).includes(true);
        return result;
    }

    const handleBack = () => history.replace('/');

    const handleChange = (prop: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        formData[prop] = event.target.value;
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const result = areFieldsOk(formData);

        if (result) {
            setSpinnerShow(true);
            dispatch(trySignIn({
                email: formData.email,
                password: formData.password
            }));
        }
    }
    const handleGButtonClick = () => {
        const auth = new OAuth({ ...googleAuth });

        (window as any).oauth2Callback = async (uri: string) => {
            const tokenSet = await auth.token.getToken(uri);

            const addr = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + tokenSet.accessToken;
            const userInfoJSON = await fetch(addr);
            const userInfo = await userInfoJSON.json();
            
            dispatch(setSignedIn({
                email: userInfo.email,
                firstName: userInfo.given_name
            }));
        };

        window.open(auth.token.getUri());
    }

    useEffect(() => {
        if (notification) setSpinnerShow(false);
    }, [notification]);

    return (
        <>
            <Box mt={2}>
                <IconButton onClick={handleBack}><ArrowBackIosIcon /></IconButton>
            </Box>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={formErrors.emailErr}
                            onChange={handleChange('email')}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange('password')}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {spinnerShow ? <CircularProgress color="secondary" /> : 'Sign In'}
                        </Button>
                    </form>
                </div>
                <Grid container justify="space-between" alignItems="center" spacing={2}>
                    <Grid item>
                        <Link to="/signup">
                            <Typography variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        {/*<a href="https://accounts.google.com" >*/}
                        <Button onClick={handleGButtonClick}>
                            <img className={classes.imgGButton} src={googleLoginBtn} alt="Login with Google" />
                        </Button>

                        {/*</a> className={classes.gButton}  */}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}