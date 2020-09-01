import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { deleteItem } from "./coreapicalls";
import { editItem } from "./coreapicalls";
import { useContext } from "react";
import { BudgetContext } from "../BudgetContext";

const useStyles = makeStyles({
  mainRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    margin: "0.5rem 0rem",
    minWidth: "15%",
    width: "70%",
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

const ItemCard = ({ id, title, description, amount, date }) => {
  const classes = useStyles();

  const { sUpdate } = useContext(BudgetContext);
  const [shouldUpdate, setShouldUpdate] = sUpdate;

  const formatDate = () => {
    const newDate = new Date(date).toDateString();
    return newDate;
  };

  useEffect(() => {
    formatDate();
  }, []);

  return (
    <div className={classes.mainRoot}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            //   className={classes.title}
            //   color="textSecondary"
            gutterBottom
          >
            {title}
          </Typography>
          {/* <Typography variant="h5" component="h2">
          title here
        </Typography> */}
          <Typography className={classes.pos} color="primary" gutterBottom>
            ₹{amount}
          </Typography>
          <Typography variant="body1" component="p">
            {description ? <span>{description}</span> : ""}
            {/* {description} */}
            {/* <br /> */}
          </Typography>
          <Typography color="textSecondary">
            {/* {date} */}
            {formatDate()}
          </Typography>
        </CardContent>
        <CardActions className={classes.actionButton}>
          {/* <Button size="small" className={classes.editButton}>
          Edit
        </Button> */}
          <Button
            size="small"
            className={classes.deleteButton}
            onClick={() => {
              deleteItem(id);
              setShouldUpdate(!shouldUpdate);
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default ItemCard;
