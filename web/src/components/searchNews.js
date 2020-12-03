import React, { useState } from "react";
import moment from "moment";
import MaterialTable, { MTableEditField } from "material-table";
import Form from "./form";
import { connect } from "react-redux";
import api from "./utils/api";
import instance from "./utils/http";
import { setSearchNews } from "./actions/index";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { useSnackbar } from "notistack";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: 0,
    margin: "0px auto",
    background: "blue",
  },
}));
const SearchNews = (props) => {
  const classes = useStyles();
  const {
    reset,
    submitting,
    event,
    errors,
    touched,
    task,
    history,
    searchNew,
  } = props;
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [searchNews, setSearchNews] = React.useState({
    search: "",
    category: "",
    providers: "",
    startDate: "",
    endDate: "",
  });
  const [provider, setProvider] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    if (searchNews.providers === "Clarin") {
      setProvider("Clarín");
    }
    if (searchNews.providers === "Pagina12") {
      setProvider("Página 12");
    }
    if (searchNews.providers === "LaNacion") {
      setProvider("La%20Nación");
    }
    if (searchNews.providers === "Telam") {
      setProvider("Télam");
    }
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + `${token}`,
      },
    };
    debugger;
    return instance
      .get(
        `/news?providers=${searchNews.providers}&search=${searchNews.search}&searchindataclass=${provider}&categories=${searchNews.category}&startDate=${searchNews.startDate}&endDate=${searchNews.endDate}&order=-1`
      )
      .then((result) => {
        props.setSearchNews(result.data);
        enqueueSnackbar("La Busqueda fue realizada con exito", {
          variant: "success",
        });
        setOpen(false);
        history.push("/search");
      })
      .catch((response) => {
        enqueueSnackbar("Error, La busqueda no se realizo. " + response, {
          variant: "error",
        });
        console.error("Mutation error:", response);
      });
  };
  const body = (
    <Form
      className={classes.dialog}
      setSearchNews={setSearchNews}
      data={searchNews}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      setProvider={setProvider}
      provider={provider}
    ></Form>
  );
  const modalSelect = (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>{body}</div>
      </Dialog>
    </div>
  );
  return (
    <>
      {modalSelect}{" "}
      <IconButton
        className={classes.search}
        aria-label="search"
        color="inherit"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
      </IconButton>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSearchNews: (search) => dispatch(setSearchNews(search)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(SearchNews));
