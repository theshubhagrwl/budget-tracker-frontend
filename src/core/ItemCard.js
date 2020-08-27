import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    // background: "white",
    margin: "1rem",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#e53935",
    color: "white",
  },
  editButton: {
    backgroundColor: "#1e88e5",
    color: "white",
  },
});

const ItemCard = ({ title, description, amount }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        {/* <Typography variant="h5" component="h2">
          title here
        </Typography> */}
        <Typography className={classes.pos} color="textSecondary">
          ₹{amount}
        </Typography>
        <Typography variant="body2" component="p">
          {description ? <span>{description}</span> : ""}
          {/* {description} */}
          {/* <br /> */}
          {/* {date} */}
        </Typography>
      </CardContent>
      <CardActions className={classes.actionButton}>
        <Button size="small" className={classes.editButton}>
          Edit
        </Button>
        <Button size="small" className={classes.deleteButton}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
export default ItemCard;
