import React from "react";
import Card from "../forms/card";
import { connect } from "react-redux";
import Spinner from "../forms/spinner";
const International = ({ news }) => {
  const international = news.filter((e) => e.category == "Internacionales");
  if (!international[0]) {
    return <Spinner />;
  }
  return (
    <>
      <Card news={international} />
    </>
  );
};
const mapStateToProps = (state) => {
  return { news: state.news };
};
export default connect(mapStateToProps)(International);
