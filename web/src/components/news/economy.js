import React from "react";
import Card from "../forms/card";
import { connect } from "react-redux";
import Spinner from "../forms/spinner";
const Economy = ({ news }) => {
  const economy = news.filter((e) => e.category == "Economía");
  if (!economy[0]) {
    return <Spinner />;
  }
  return (
    <>
      <Card news={economy} />
    </>
  );
};
const mapStateToProps = (state) => {
  return { news: state.news };
};
export default connect(mapStateToProps)(Economy);
