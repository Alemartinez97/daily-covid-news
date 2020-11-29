import React from "react";
import Card from "../forms/card";
import { connect } from "react-redux";
import Spinner from "../forms/spinner";
const Politics = ({ news }) => {
const  politics = news.filter((e) => e.category == "Política");
  if (!politics[0]) {
    return <Spinner />;
  }
  return (
    <>
      <Card news={politics} />
    </>
  );
};
const mapStateToProps = (state) => {
  return { news: state.news };
};
export default connect(mapStateToProps)(Politics);
