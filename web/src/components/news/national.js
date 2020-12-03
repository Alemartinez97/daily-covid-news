import React from "react";
import Card from "../forms/card";
import { connect } from "react-redux";
import Spinner from "../forms/spinner";
const National = ({ news }) => {
  const national = news.filter((e) => e.category == "Nacionales");
  if (!national[0]) {
    return <Spinner />;
  }
  return (
    <>
      <Card news={national} />
    </>
  );
};
const mapStateToProps = (state) => {
  return { news: state.news };
};
export default connect(mapStateToProps)(National);