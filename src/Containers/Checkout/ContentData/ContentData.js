import React, { Component } from "react";

import Button from '../../../Components/UI/Button/Button';
import classes from './ContentData.module.css'
import axios from '../../../axios-order'
import Spnnier from '../../../Components/UI/Spnnier/Spnnier'

import Input from '../../../Components/UI/Input/Input'
class ContenetData extends Component {
    state = {
        // ingredients: null,
        orderForm: {
            name: {
                label: 'Name',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touch: false

            },


            street: {
                label: 'Street',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            zipCode: {
                label: 'ZipCode',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLenght: 6
                },
                valid: false,
                touch: false
            },
            country: {
                label: 'Country',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            email: {
                label: 'Email',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            deliveryMethod: {
                label: 'DeliveryMethod',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: "fastest",
                validation: {},
                valid: true,
                
            },

        },
        loader: false,
        formValid: false
    }



    // componentWillMount() {
    //     this.setState({ ingredients: this.props.ingredients })
    // }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loader: true, })
        // alert('You continue!');
        const formData = {};
        for (let formElementIdentifire in this.state.orderForm) {
            formData[formElementIdentifire] = this.state.orderForm[formElementIdentifire].value;
        }
        console.log(this.props.price)
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData

        }

        axios.post('/order.json', order)
            .then(response => {
                this.setState({ loader: false })
                this.props.history.push('/');
            })
            .catch(error => {

                this.setState({ loader: false })})

    }
    formChangeHandler = (event, identifier) => {
        // console.log(event.target.value);

        const updatedForm = { ...this.state.orderForm };

        const updatedFormElement = { ...updatedForm[identifier] }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm.touch = true

        updatedForm[identifier] = updatedFormElement;

        let formValid = true;
        for (let identifier in updatedForm) {
            console.log(updatedForm[identifier].valid)
            formValid = updatedForm[identifier].valid && formValid;
        }
        console.log(formValid)
        this.setState({ orderForm: updatedForm, formValid: formValid })

    }
    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return isValid;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLenght) {
            isValid = value.length <= rules.maxLenght && isValid;
        }
        return isValid
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>
            {/* <Input elementType="" elementConfig="" value=" " /> */}
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementtype={formElement.config.elementType}
                    elementconfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    label={formElement.config.label}
                    shouldValidate={formElement.config.validation}
                    touch={formElement.config.touch}
                    changed={(event) => this.formChangeHandler(event, formElement.id)} />
            ))}
            <Button disabled={!this.state.formValid} btnType="Success" >ORDER</Button>
        </form>);
        if (this.state.loader) {
            form = <Spnnier />
        }

        return (
            <div className={classes.ContentData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>

        )
    }
}

export default ContenetData;