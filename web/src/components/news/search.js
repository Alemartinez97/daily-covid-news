import React from "react";
import Card from "../forms/card";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import Spinner from "../forms/spinner";
const Search = ({ search }) => {
  if (!search[0]) {
    return <Spinner />;
  }
  return (
    <>
      <Typography component="h6" variant="h6">
        Resultados de busqueda {search.length} elementos
      </Typography>
      <Card news={search} />
    </>
  );
};
const mapStateToProps = (state) => {
  return { search: state.search };
};
export default connect(mapStateToProps)(Search);
