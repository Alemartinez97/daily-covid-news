import React from "react";
import Card from "../forms/card";
import { connect } from "react-redux";
import Spinner from "../forms/spinner";
const Tecnology = ({ news }) => {
const  tecnology = news.filter((e) => e.category == "Tecnología");
  if (!tecnology[0]) {
    return <Spinner />;
  }
  return (
    <>
      <Card news={tecnology} />
    </>
  );
};
const mapStateToProps = (state) => {
  return { news: state.news };
};
export default connect(mapStateToProps)(Tecnology);
