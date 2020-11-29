import React, { useState } from "react";
import moment from "moment";
import MaterialTable, { MTableEditField } from "material-table";
import Form from "./form";
import { connect } from "react-redux";
import api from "./utils/api";
import { addSearchNews } from "./actions/index";
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
  const { reset, submitting, event, errors, touched, task } = props;
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [searchNews, setSearchNews] = React.useState({
    search: "",
    category: "",
    providers: "",
    startDate: "",
    endDate: "",
  });
  const [provider, setProvider] = useState();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    debugger
    return api
      .get(
        `/news?providers=${searchNews.providers}&search=${searchNews.search}&searchindataclass=${provider}&categories=${searchNews.category}&startDate=${searchNews.startDate}&endDate=${searchNews.endDate}&pagination=10&order=-1`
      )
      .then((result) => {
        debugger
        console.log("data",result.data)
        props.addSearchNews(result.data);
      });
    // .then((data) => {
    //   props.editTask(taskData);
    //   enqueueSnackbar(
    //     "La tarea " + taskData.taskname + " fue actualizada con exito ",
    //     {
    //       variant: "success",
    //     }
    //   );
    // })
    // .catch((err) => {
    //   enqueueSnackbar("Error, La tarea no se actualizo. " + err.msg, {
    //     variant: "error",
    //   });
    //   console.error("Mutation error:", err);
    // });
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
  debugger
  return {
    addSearchNews: (searchnews) => dispatch(addSearchNews(searchnews)),
  };
};

export default connect(mapDispatchToProps)(withRouter(SearchNews));
