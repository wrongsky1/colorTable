import React from "react";
import classes from "./Popup.module.css";
import { SketchPicker } from "react-color";
import CloseIcon from "@material-ui/icons/Close";

export default class Popup extends React.Component {
    refInput = React.createRef();
    state = {
        name: "",
        type: "base",
        color: "white",
        isValidate: true,
    };

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleEscPress);
        if (this.props.row) {
            const { name, type, color } = this.props.row;
            this.setState({ name, type, color, isValidate: true });
        }
    };

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleEscPress);
    };

    handleEscPress = (evt) => {
        if (evt.keyCode === 27) {
            this.props.onClose();
        }
    };

    handleOverlayClick = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.props.onClose();
        }
    };

    handleInputNameChange = (evt) => {
        const { value } = evt.target;
        this.setState((prevState) => ({ ...prevState, name: value }));
    };

    handleInputTypeChange = (evt) => {
        const { value } = evt.target;
        this.setState((prevState) => ({ ...prevState, type: value }));
    };

    handleColorChange = (colors) => {
        this.setState((prevState) => ({ ...prevState, color: colors.hex }));
    };

    handleColorChangeComplete = (colors) => {
        this.setState((prevState) => ({ ...prevState, color: colors.hex }));
    };

    handleSubmitButtonClick = (evt) => {
        evt.preventDefault();
        if (!this.state.name) {
            this.setState((prevState) => ({ ...prevState, isValidate: false }));
            this.refInput.current.focus();
        } else {
            this.props.onClose();
            this.props.onSubmit(this.state);
        }
    };

    render() {
        return (
            <div className={classes.popup} onClick={this.handleOverlayClick}>
                <div className={classes.wrapper}>
                    <h2
                        className={classes.title}
                    >{`${this.props.title} данных`}</h2>

                    <form className={classes.form} noValidate>
                        <div className={classes.inputWrapper}>
                            <label className={classes.input} htmlFor='name'>
                                Название
                            </label>
                            <input
                                id='name'
                                type='text'
                                name='name'
                                ref={this.refInput}
                                value={this.state.name}
                                onChange={this.handleInputNameChange}
                                required
                            />
                            {!this.state.isValidate ? (
                                <p className={classes.error}>
                                    Укажите название
                                </p>
                            ) : null}
                        </div>
                        <div className={classes.inputWrapper}>
                            <label className={classes.input} htmlFor='type'>
                                Тип
                            </label>
                            <select
                                id='type'
                                type='text'
                                name='type'
                                value={this.state.type}
                                onChange={this.handleInputTypeChange}
                            >
                                <option defaultValue value='main'>
                                    main
                                </option>
                                <option value='primary'>primary</option>
                                <option value='secondary'>secondary</option>
                                <option value='base'>base</option>
                            </select>
                        </div>

                        <div className={classes.colorWrapper}>
                            <label htmlFor='color'>Цвет:</label>
                            <input
                                id='color'
                                type='hidden'
                                name='color'
                                required
                                value={this.state.color}
                            />
                            <div
                                style={{
                                    backgroundColor: `${this.state.color}`,
                                }}
                            ></div>
                        </div>
                        <SketchPicker
                            disableAlpha
                            color={this.state.color}
                            onChange={this.handleColorChange}
                            onChangeComplete={this.handleColorChangeComplete}
                        />

                        <button
                            className={classes.closeButton}
                            type='button'
                            onClick={this.props.onClose}
                        >
                            <CloseIcon />
                        </button>
                        <button
                            className={classes.button}
                            type='submit'
                            onClick={this.handleSubmitButtonClick}
                        >
                            {this.props.buttonName}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
