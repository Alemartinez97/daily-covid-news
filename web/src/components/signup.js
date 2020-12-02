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
import { useSnackbar } from "notistack";
import api from "./utils/api";

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
    <Container maxWidth="xs">
      <Paper className={classes.root}>
        <form>
          <Grid container>
            <Typography variant="h4">Crear nueva cuenta</Typography>
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
                type="password"
                name="password"
                margin="normal"
                value={password}
                className={classes.textField}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => handleSubmit()}
                variant="contained"
                color="primary"
              >
                Registrarse
              </Button>
              <Button
                className={classes.rightButton}
                onClick={() => history.push("/login")}
              >
                o inicia sesión
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default withRouter(Signup);
