import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { Link } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // width:"100%"
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 251,
    height: 200,
    padding: 0,
    justifyContent: "center",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard({ news }) {
  // const {
  //   category,
  //   description,
  //   imageUrl,
  //   publishedAt,
  //   title,
  //   provider,
  //   sourceUrl,
  // } = news;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      {news.map((e) => {
        return (
          <Card className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {e.title}
                </Typography>
                <Typography component="h6" variant="h6">
                  {moment(e.publishedAt).format("ll")}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {e.description}
                </Typography>
                <Typography>Fuente: {e.provider}</Typography>
                <Typography>Mas informacion: </Typography>
                <Link>{e.sourceUrl}</Link>
              </CardContent>
            </div>
            <CardMedia className={classes.cover} image={e.imageUrl} />
          </Card>
        );
      })}
      {/* <Pagination count={10} color="primary" /> */}
    </>
  );
}
