import React, { Component } from 'react';
import styled from 'styled-components';
const StyledButton = styled.button`
    background-color: white;
    font-weight: 700;
    border: 1px solid white;
    border-bottom: 2px solid black;
    margin-left:98px
`;


class Button extends Component {

    state = {
        isOpen: false,
    }
// меняем значение стейта isOpen по нажатию на кнопку
    handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
        //передаём значение пропса родительскому компоненту
        this.props.updateData(!this.state.isOpen);    
    }

    render() {
        let {isOpen} = this.state;
        return(

            <StyledButton onClick={this.handleClick}>
                {isOpen ? 'Свернуть' : 'Развернуть'}
            </StyledButton>
            
        )
    }
}

export default Button;