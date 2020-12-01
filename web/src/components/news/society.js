import React from "react";
import Card from "../forms/card";
import { connect } from "react-redux";
import Spinner from "../forms/spinner";
const Society = ({ news }) => {
    const  society = news.filter((e) => e.category == "Sociedad");
  if (!society[0]) {
    return <Spinner />;
  }
  return (
    <>
      <Card news={society} />
    </>
  );
};
const mapStateToProps = (state) => {
  return { news: state.news };
};
export default connect(mapStateToProps)(Society);
