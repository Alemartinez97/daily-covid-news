import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router";
import api from "./utils/api";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = ({ history }) => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (response) => {
    const values = {
      email,
      password,
    };
    return api
      .post("/signup", values)
      .then((result) => {
        enqueueSnackbar("Usuario " + email + " registrado con exito ", {
          variant: "success",
        });
        history.push("/login");
      })
      .catch((err) => {
        enqueueSnackbar("El usuario " + email + " no se registro " + err, {
          variant: "error",
        });
        console.error("Mutation error:", err);
      });
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              autoFocus
              label="Email"
              type="email"
              name="email"
              margin="normal"
              value={email}
              className={classes.textField}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              margin="normal"
              value={password}
              className={classes.textField}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Button
              // type="submit"
              className={classes.submit}
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
              fullWidth
            >
              Crear una cuenta
            </Button>
            <Button
              className={classes.submit}
              color="primary"
              variant="contained"
              onClick={() => history.push("/login")}
              fullWidth
            >
              Iniciar sesiôn
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default withRouter(Signup);
