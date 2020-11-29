import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Button,
  InputLabel,
  MenuItem,
  Typography,
  FormControl,
  Select,
  Checkbox,
  FormControlLabel,
  Snackbar,
} from "@material-ui/core";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    // position: 'relative',
    width: 500,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    margin: theme.spacing(6, 6, 3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  success: {
    backgroundColor: "#43a047",
  },
  error: {
    backgroundColor: "#d32f2f",
  },
  info: {
    backgroundColor: "#2979ff",
  },
  warning: {
    backgroundColor: "#ffa000",
  },
}));
const Form = (props) => {
  const classes = useStyles();
  // const taskname = useRef();
  // const description = useRef();
  const {
    reset,
    submitting,
    data,
    dirtyData,
    handleClose,
    setSearchNews,
    handleSubmit,
    setProvider,
    provider,
  } = props;
  const handleProvider = (e) => {
    debugger;
    if (data.providers === "Clarin") {
      setProvider("Clarín");
    }
    if (data.providers === "Pagina12") {
      setProvider("Página 12");
    }
    if (data.providers === "LaNacion") {
      setProvider("La%20Nación");
    }
    if (data.providers === "Telam") {
      setProvider("Télam");
    }
  };
  return (
    <div className={classes.paper}>
      <form
        noValidate
        autoComplete="off"
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" gutterBottom>
          Buscar Noticias de Coronavirus
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="search"
              // inputRef={taskname}
              onChange={(e) =>
                setSearchNews({ ...data, search: e.target.value })
              }
              value={data.search}
              label="Título"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="category"
                value={data.category}
                onChange={(e) =>
                  setSearchNews({ ...data, category: e.target.value })
                }
              >
                <MenuItem value={"ULTIMAS_NOTICIAS"}>Últimas noticias</MenuItem>
                <MenuItem value={"LOCALES"}>Locales</MenuItem>
                <MenuItem value={"NACIONALES"}>Nacionales</MenuItem>
                <MenuItem value={"INTERNACIONALES"}>Internacionales</MenuItem>
                <MenuItem value={"ECONOMIA"}>Economía</MenuItem>
                <MenuItem value={"POLITICA"}>Política</MenuItem>
                <MenuItem value={"POLICIALES"}>Policiales</MenuItem>
                <MenuItem value={"SOCIEDAD"}>Sociedad</MenuItem>
                <MenuItem value={"SALUD"}>Salud</MenuItem>
                <MenuItem value={"CULTURA"}>Cultura</MenuItem>
                <MenuItem value={"DEPORTES"}>Deportes</MenuItem>
                <MenuItem value={"TECNOLOGIA"}>Tecnología</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="demo-simple-select-label">Fuente</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="providers"
                value={data.providers}
                onChange={(e) =>
                  setSearchNews({ ...data, providers: e.target.value })
                }
              >
                <MenuItem value={"Clarin"}>Clarín</MenuItem>
                <MenuItem value={"Pagina12"}>Pagina12</MenuItem>
                <MenuItem value={"LaNacion"}>LaNacion</MenuItem>
                <MenuItem value={"Telam"}>Telam</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={data.startDate}
              onChange={(e) =>
                setSearchNews({ ...data, startDate: e.target.value })
              }
              id="start"
              label="Desde"
              type="date"
              defaultValue={moment().format("ll")}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              value={data.endDate}
              onChange={(e) =>
                setSearchNews({ ...data, endDate: e.target.value })
              }
              id="end"
              label="Hasta"
              type="date"
              defaultValue={moment().format("ll")}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid>
          <Button
            color="primary"
            type="submit"
            disabled={submitting}
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={() => handleProvider()}
          >
            Buscar
          </Button>

          <Button
            //   component={LinkAddEvent}
            color="primary"
            type="button"
            onClick={handleClose}
          >
            Cancelar
          </Button>
        </Grid>
      </form>
    </div>
  );
};
export default Form;
