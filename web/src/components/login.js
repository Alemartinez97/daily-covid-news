import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { withRouter } from "react-router";
import api from "./utils/api";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  rightButton: {
    float: "right",
  },
  textField: {
    width: "100%",
  },
}));

const Login = (props) => {
  const { success, error, loading, history } = props;
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
      .post("/login", values)
      .then((result) => {
        if (result.data.token) {
          localStorage.setItem("token", JSON.stringify(result.data.token));
        }
        console.log(localStorage)
        enqueueSnackbar("Usuario " + email + " iniciar de sesión con exito ", {
          variant: "success",
        });
        history.push("/");
      })
      .catch((err) => {
        enqueueSnackbar("El usuario " + email + " no iniciar  sesión  " + err, {
          variant: "error",
        });
        console.error("Mutation error:", err);
      });
  };
  return (
    <Container maxWidth="xs">
      <Paper className={classes.root} justify-content="center">
        <form>
          <Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="Email"
                type="email"
                name="email"
                margin="normal"
                value={email}
                className={classes.textField}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                name="password"
                type="password"
                margin="normal"
                value={password}
                className={classes.textField}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                // type="submit"
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
              >
                Iniciar sesiôn
              </Button>
              <Button
                className={classes.rightButton}
                onClick={() => history.push("/signup")}
              >
                o crea una cuenta
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default withRouter(Login);
