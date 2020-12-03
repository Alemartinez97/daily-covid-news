import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AiOutlineLogin } from "react-icons/ai";
import { SiGnuprivacyguard } from "react-icons/si";

import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withRouter } from "react-router-dom";
import SearchNews from "./searchNews";
import { Button } from "@material-ui/core";
import instance from "./utils/http";
import { addNews } from "./actions/index";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    // background: "#69f0ae",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  search: {
    display: "flex",
    alignItems: "center",
    margin: "0 auto",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    // display: "flex",
    // alignItems: "center",
    // padding: theme.spacing(0, 1),
    // // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    // justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Menu = ({ history, addNews }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleNews = async (url) => {
    await history.push(url);
    await instance
      .get(`/allthenews?search=Coronavirus&categories=ULTIMAS_NOTICIAS`)
      .then((result) => {
        addNews(result.data);
      });
  };
  // React.useEffect(() => {
  //   handleDeleteSession();
  // });
  // const value = localStorage.getItem("token");
  // const expireSession = () => {
  //   if (value) {
  //     localStorage.clear();
  //     history.push("/login");
  //     enqueueSnackbar("Sessión Expirada", {
  //       variant: "warning",
  //     });
  //   }
  // };
  // //the session will expire every 5 minutes
  // const handleDeleteSession = () => {
  //   setTimeout(expireSession, 300000);
  // };
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // className={clsx(classes.appBar, {
        //   [classes.appBarShift]: open,
        // })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap>CORONAVIRUS HOY</Typography>
          <IconButton
            onClick={() => history.push("/login")}
            color="inherit"
            size="large"
          >
            <AiOutlineLogin />
          </IconButton>
          <IconButton
            onClick={() => history.push("/signup")}
            color="inherit"
            size="large"
          >
            <SiGnuprivacyguard />
          </IconButton>
          <SearchNews className={classes.search} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon onClick={() => handleNews("/society")}>
              Sociedad
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon onClick={() => handleNews("/economy")}>
              Economía
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon onClick={() => handleNews("/politics")}>
              Politica
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon onClick={() => handleNews("/international")}>
              Internacionales
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon onClick={() => handleNews("/health")}>
              Salud
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon onClick={() => handleNews("/national")}>
              Nacionales
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon onClick={() => handleNews("/local")}>
              Locales
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon onClick={() => handleNews("/tecnology")}>
              Tecnología
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon onClick={() => logout()}>Logout</ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    addNews: (news) => dispatch(addNews(news)),
  };
}
export default connect(null, mapDispatchToProps)(withRouter(Menu));
