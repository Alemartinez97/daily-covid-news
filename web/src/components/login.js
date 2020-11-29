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
  const { success, error, loading,history } = props;
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = (response) => {
    debugger
    const values = {
      email,
      pass,
    };
    api
      .post("/signup", values)
      .then((result) => {
        enqueueSnackbar("Usuario " + email + " Registrado con exito ", {
          variant: "success",
        });
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
      <Paper className={classes.root} justify-content="center">
        <form onSubmit={(e) => handleSubmit(e)}>
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
                name="pass"
                type="password"
                margin="normal"
                value={pass}
                className={classes.textField}
                onChange={(e) => setPass(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                //    onClick={() => history.push('/')}
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
