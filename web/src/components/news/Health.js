import React from "react";
import Card from "../forms/card";
import { connect } from "react-redux";
import Spinner from "../forms/spinner";
const Health = ({ news }) => {
  const health = news.filter((e) => e.category == "Salud");
  if (!health[0]) {
    return <Spinner />;
  }
  return (
    <>
      <Card news={health} />
    </>
  );
};
const mapStateToProps = (state) => {
  return { news: state.news };
};
export default connect(mapStateToProps)(Health);
