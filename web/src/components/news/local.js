import React from "react";
import Card from "../forms/card";
import { connect } from "react-redux";
import Spinner from "../forms/spinner";
const Local = ({ news }) => {
  const local = news.filter((e) => e.category == "Locales");
  if (!local[0]) {
    return <Spinner />;
  }
  return (
    <>
      <Card news={local} />
    </>
  );
};
const mapStateToProps = (state) => {
  return { news: state.news };
};
export default connect(mapStateToProps)(Local);