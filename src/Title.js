import React, { Component } from 'react';
import styled from 'styled-components';
import Time from './Time'

const TitleContaier = styled.div`
display: flex;
margin-left:20px;
font-weight: ${props => props.isActual ? "700" : ""};
opacity: ${props => props.isEnd ? "0.5" : ""};
`;
const TextContainer = styled.span`
clear: both;
display: inline-flex;

`
var dayjs = require("dayjs");
class Title extends Component {

    state = {
        actualTime: dayjs().format('HH:mm'),
        isActual: false,
        isEnd: false,
      };

    componentDidMount() {
        this.updateActualProg();
    }

    updateActualProg = () => {
        const timeStart = this.props.data.start;
        const timeStartString = dayjs(timeStart).format('HH:mm'); // время начала передачи
        const timeEnd = dayjs(timeStart).add(this.props.data.duration, 'second');
        if (dayjs(timeEnd).format('YYYY-MM-DD') > dayjs(timeStart).format('YYYY-MM-DD')) {
            return;
        }
        const timeEndString = dayjs(timeEnd).format('HH:mm'); // время завершения

        if (timeStartString < this.state.actualTime && this.state.actualTime < timeEndString) {
            this.setState({ isActual: true })
        } else { if (timeEndString < this.state.actualTime) {this.setState({ isEnd: true })}}
    }

    render() {
        let { data } = this.props;
        
        return(
            <TitleContaier isActual={this.state.isActual} isEnd={this.state.isEnd}>
                <Time startTime={data.start}/>
                <TextContainer>{data.title}</TextContainer>   
            </TitleContaier>
            
        )
    }
}

export default Title;