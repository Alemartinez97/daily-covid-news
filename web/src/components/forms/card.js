import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { Link, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 250,
    margin: 10,
    overflow: 'scroll',
  },
  cardImage: {
    height: 250,
    margin: 10,
  },
  cover: {
    width: "90%",
    height: 200,
    margin: 15,
  },
}));

export default function MediaControlCard({ news }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      {news.map((e) => {
        return (
          <Grid container spacing={2}>
            <Grid item xs={9} spacing={2}>
              <Card key={e._id} className={classes.card}>
                <div>
                  <CardContent>
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
                    <Link href={e.sourceUrl}>{e.sourceUrl}</Link>
                  </CardContent>
                </div>
              </Card>
            </Grid>
            <Grid item xs={3} spacing={2}>
              <Card className={classes.cardImage}>
                <CardMedia className={classes.cover} image={e.imageUrl} />
              </Card>
            </Grid>
          </Grid>
        );
      })}
      
      {/* <Pagination count={10} color="primary" /> */}
    </>
  );
}
