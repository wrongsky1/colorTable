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
        <tr className={classes.tableRow}>
            <td
                style={{
                    backgroundColor: `${color}`,
                    minWidth: "40px",
                }}
            ></td>
            <td>{name}</td>
            <td>{type}</td>
            <td>{color}</td>
            <td>
                <button
                    className={classes.button}
                    type='button'
                    onClick={onEditClick}
                >
                    <ColorizeIcon />
                </button>
            </td>
            <td>
                <button
                    className={classes.button}
                    type='button'
                    onClick={onDeleteClick}
                >
                    <DeleteForeverIcon />
                </button>
            </td>
        </tr>
    );
}
