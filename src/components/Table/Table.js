import React from "react";
import { data } from "../../data/data";
import classes from "./Table.module.css";
import Popup from "../Popup/Popup";
import TableRow from "../TableRow/TableRow";
import AddIcon from "@material-ui/icons/Add";
import Select from "../Select/Select";

const TABLE_DATA = "";

const nameSort = (a, b) => {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }
    return 0;
};

const typeSort = (a, b) => {
    if (a.type > b.type) {
        return 1;
    }
    if (a.type < b.type) {
        return -1;
    }
    return 0;
};

export default class Table extends React.Component {
    state = {
        data,
        isPopupOpen: false,
        editedRow: null,
        selectedSort: "",
    };

    componentDidMount() {
        const data = localStorage.getItem(TABLE_DATA);
        data &&
            this.setState((prevState) => ({
                ...prevState,
                data: JSON.parse(data),
            }));
    }

    handleSaveButtonClick = () => {
        localStorage.setItem(TABLE_DATA, JSON.stringify(this.state.data));
    };

    handleSelectedSort = (sort) => {
        this.setState((prevState) => {
            let sortData = prevState.data.slice();
            if (sort === "name") {
                sortData.sort(nameSort);
            }
            if (sort === "type") {
                sortData.sort(typeSort);
            }
            return { data: sortData };
        });
    };

    handleOpenPopup = () => {
        this.setState((prevState) => ({ ...prevState, isPopupOpen: true }));
    };

    handleClosePopup = () => {
        this.setState((prevState) => ({
            ...prevState,
            isPopupOpen: false,
            editedRow: null,
        }));
    };

    handleSubmit = (dataForm) => {
        const { name, type, color } = dataForm;
        const newRow = { name, type, color };
        this.setState((prevState) => {
            if (prevState.editedRow) {
                const index = this.state.data.indexOf(this.state.editedRow);
                const newData = prevState.data.slice();
                newData.splice(index, 1, newRow);
                return { ...prevState, data: newData };
            } else {
                const newData = prevState.data.slice();
                newData.push(newRow);

                return { ...prevState, data: newData };
            }
        });
        if (this.state.editedRow) {
            const index = this.state.data.indexOf(this.state.editedRow);
            this.setState((prevState) => {
                const newData = prevState.data.slice();
                newData.splice(index, 1);
                return { ...prevState, data: newData };
            });
        }
    };

    handleEditButtonClick = (row) => {
        const index = this.state.data.indexOf(row);
        this.setState((prevState) => ({
            ...prevState,
            isPopupOpen: true,
            editedRow: prevState.data[index],
        }));
    };

    handleDeleteButtonClick = (row) => {
        const index = this.state.data.indexOf(row);
        this.setState((prevState) => {
            const newData = prevState.data.slice();
            newData.splice(index, 1);
            return { ...prevState, data: newData };
        });
    };

    render() {
        return (
            <>
                <div className={classes.table}>
                    <div className={classes.head}>
                        <h1 className={classes.title}>Таблица цветов</h1>
                        <div className={classes.buttons}>
                            <button
                                className={classes.button}
                                type='button'
                                onClick={this.handleOpenPopup}
                            >
                                <AddIcon />
                            </button>
                            <button
                                className={classes.button}
                                type='button'
                                onClick={this.handleSaveButtonClick}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                    <Select
                        velue={this.state.selestedSort}
                        onChange={this.handleSelectedSort}
                        defaultValue='Сортировка'
                        options={[
                            { value: "name", name: "По названию" },
                            { value: "type", name: "По типу" },
                        ]}
                    />

                    <table className={classes.content}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Название</th>
                                <th>Тип</th>
                                <th>Код</th>
                                <th>Изменить</th>
                                <th>Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.length ? (
                                this.state.data.map((row, index) => (
                                    <TableRow
                                        key={`${row.name}${index}`}
                                        name={row.name}
                                        type={row.type}
                                        color={row.color}
                                        onDeleteClick={() =>
                                            this.handleDeleteButtonClick(row)
                                        }
                                        onEditClick={() =>
                                            this.handleEditButtonClick(row)
                                        }
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className={classes.emptyCell}
                                        colSpan='6'
                                    >
                                        Нет данных
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {this.state.isPopupOpen && this.state.editedRow ? (
                    <Popup
                        title='Изменение'
                        buttonName='Сохранить'
                        row={this.state.editedRow}
                        onClose={this.handleClosePopup}
                        onSubmit={this.handleSubmit}
                    />
                ) : this.state.isPopupOpen ? (
                    <Popup
                        title='Добавление'
                        buttonName='Добавить'
                        onClose={this.handleClosePopup}
                        onSubmit={this.handleSubmit}
                    />
                ) : null}
            </>
        );
    }
}
