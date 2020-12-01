import React from "react";
import Card from "../forms/card";
import { connect } from "react-redux";
import Spinner from "../forms/spinner";
const Search = ({ searchNews }) => {
  if (!searchNews) {
    return <Spinner />;
  }
  return (
    <>
      <Card news={searchNews} />
    </>
  );
};
const mapStateToProps = (state) => {
  return { searchNews: state.searchNews };
};
export default connect(mapStateToProps)(Search);
