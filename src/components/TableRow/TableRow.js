import React from "react";
import classes from "./TableRow.module.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ColorizeIcon from "@material-ui/icons/Colorize";

export default function TableRow({
    name,
    type,
    color,
    onDeleteClick,
    onEditClick,
}) {
    return (
        <div className={classes.tableRow}>
            <div
                style={{
                    backgroundColor: `${color}`,
                    width: "40px",
                    height: "40px",
                    marginLeft: "5px",
                }}
            ></div>
            <p className={classes.name}>{name}</p>
            <p className={classes.type}>{type}</p>
            <p className={classes.color}> {color}</p>

            <button
                className={classes.button}
                type='button'
                onClick={onEditClick}
            >
                <ColorizeIcon />
            </button>

            <button
                className={classes.button}
                type='button'
                onClick={onDeleteClick}
            >
                <DeleteForeverIcon />
            </button>
        </div>
    );
}
