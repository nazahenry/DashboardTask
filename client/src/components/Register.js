import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// import { withFormik } from 'formik';
// import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';

import signup from '../img/black3.jpg';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Built with '}
      <Link color="inherit">
        Material-UI.
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    overflowY: 'hidden'
  },
  image: {
    backgroundImage: `url(${signup})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 15,
  },
  paper: {
    margin: theme.spacing(8, 4),
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
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

function Register() {
  const classes = useStyles();


  const inputLabel = React.useRef(null);

  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  

  const [state, setState] = React.useState({
            first_name: '',
            last_name: '',
            email_id: '',
            password: '',
            confirmPassword: '',
            gender: 'female',
            mobile_no: '',    
  })

  const {first_name, last_name, email_id, password, confirmPassword, gender, mobile_no} = state;

function onHandleChange(event){
  setState({...state, [event.target.name]: event.target.value });
}


// console.log(state.gender)


async function onSubmitRegister(event){
    event.preventDefault();

    if(password !== confirmPassword){
      alert('Passwords do not match!!!')
    } else{
      
      fetch('http://localhost:1111/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            first_name,
            last_name,
            email_id,
            password,
            gender,
            mobile_no,
        })
    })
    .then(response => response.json())
    .then(user => {
      console.log(user);
      setState({...state, [event.target.name]: '' })
    })
   .catch(err => console.error('Unable to Register', err));
}
    }
    


  return (
     
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ borderRadius: 10 }}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>

          
          <form 
                className={classes.form} 
                noValidate
                onSubmit={onSubmitRegister} >

          <Grid container spacing={2} style={{marginTop: 10}} >
            <Grid item xs={12} sm={6}>
              <TextField
                // autoComplete="first_name"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                // autoFocus
                onChange={onHandleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                // autoComplete="last_name"
                // autoFocus='first_name'
                onChange={onHandleChange}
              />
            </Grid>
            </Grid>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email_id"
              label="Email Address"
              name="email_id"
              // autoComplete="email_id"
              // autoFocus
              onChange={onHandleChange}
              type='email'
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mobile_no"
              label="Phone Number"
              name="mobile_no"
              // autoComplete="mobile_no"
              // autoFocus
              onChange={onHandleChange}
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
              // autoComplete="current-password"
              onChange={onHandleChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              onChange={onHandleChange}
            />

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="outlined-gender-simple" required>
                  Gender
                </InputLabel>
                <Select
                  value={state.gender}
                  onChange={onHandleChange}
                  input={<OutlinedInput labelWidth={labelWidth} name="gender" id="outlined-gender-simple" />}
                  >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                  <MenuItem value={'others'}>Others</MenuItem>
                </Select>
              </FormControl>
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // onClick={e => e.preventDefault()}
            >
              Register
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Have an account already? Sign in"}
                </Link>
              </Grid>
            </Grid>
            <Box marginTop={50}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}

export default Register;

// export default withFormik({
//   mapPropsToValues:  () => ({
//       first_name: '',
//       last_name: '',
//       email: '',
//       password: ''
      
//   }),

//   // validate: values => {
//   //     const err = {};
//   //     Object.keys(values).map( v => {
//   //         if(!values[v]){
//   //             err[v] = 'Required';
//   //         }return err
//   //     })
//   //     return err;
//   //          },

//   validationSchema: Yup.object().shape({
//       first_name: Yup.string().min(5,'It should be a minimum of FIVE').required('Provide a NAME'),
//       last_name: Yup.string().min(5,'It should be a minimum of FIVE').required('Provide a NAME'),
//       email: Yup.string().email('Provide a valid email').required('Email is required'),
//       passowrd: Yup.string().min(8,'Your password should be more than 8 characters').required('Provide a Password'),
      
//   }),
  

//   handleSubmit: (values, {setSubmitting}) => {
//       console.log('Values', values)
//       alert("You've Submitted the Form!", JSON.stringify(values));
//   }
// })(Register);