import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import { Button, IconButton, Snackbar, CircularProgress } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { postNewUser } from '../../middleware/api';
import { signIn } from '../../actions';
import { responseT } from '../../common/types';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

let formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}
const initialFormErrors = {
    firstNameErr: false,
    emailErr: false,
    passwordErr: false
}
const initialErrorOpen = {
    open: false,
    msg: ''
}

export default function SignUp() {
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [formOk, setFormOk] = useState(false);
    const [errorOpen, setErrorOpen] = useState(initialErrorOpen);
    const [spinnerShow, setSpinnerShow] = useState(false);

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleBack = () => history.push('/');

    function testFields(data: typeof formData) {
        const fErrs = { ...initialFormErrors };

        fErrs.firstNameErr = data.firstName.length < 1 ? true : false;
        fErrs.emailErr = !data.email.match(/.+@.+\..+/);
        fErrs.passwordErr = data.password.length < 6 ? true : false;
        setFormErrors(fErrs);

        const result = !Object.values(fErrs).includes(true);
        return result;
    }

    const handleChange = (prop: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        formData[prop] = event.target.value;
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const result = testFields(formData);
        setFormOk(result);
    }
    const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') return;
        setErrorOpen(initialErrorOpen);
    }

    useEffect(() => {
        if (!formOk) return;
        setSpinnerShow(true);

        postNewUser(formData)
            .then((res: responseT) => {
                if (res.code === 200) {
                    dispatch(signIn({
                        email: formData.email,
                        firstName: formData.firstName
                    }));
                    history.push('/');
                } else {
                    setSpinnerShow(false);
                    setErrorOpen({ open: true, msg: res.msg });
                    setFormOk(false);
                }
            })
            .catch(err => {
                setSpinnerShow(false);
                setErrorOpen({ open: true, msg: err.message });
            });
    }, [formOk]);

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
                        Sign up
                </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    error={formErrors.firstNameErr}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleChange('firstName')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={handleChange('lastName')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    error={formErrors.emailErr}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange('email')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    error={formErrors.passwordErr}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    //autoComplete="current-password"
                                    onChange={handleChange('password')}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {spinnerShow ? <CircularProgress color="secondary" /> : 'Sign Up'}
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/signin">
                                    <Typography variant="body2">
                                        Already have an account? Sign in
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Snackbar open={errorOpen.open} autoHideDuration={6000} onClose={handleAlertClose}>
                    <MuiAlert severity="error" elevation={6} variant="filled" onClose={handleAlertClose}>
                        {errorOpen.msg}
                    </MuiAlert>
                </Snackbar>
            </Container>
        </>
    );
}