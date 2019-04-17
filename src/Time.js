import React, { Component } from 'react';
import styled from 'styled-components';

const TimeContaier = styled.span`
    margin-right: 10px;
    display: inline-flex;
`;

class Time extends Component {
    //метод для вывода времени в необходимом формате ('HH:mm')
    formatDateToTime = (date) => {
        let withoutDate = date.split(" ")[1];
        let betterTime = withoutDate.split(":")[0] + ':' + withoutDate.split(":")[1];
        return betterTime;
    }
    
    render() {
        let { startTime } = this.props;
        return(
            <TimeContaier>
               {this.formatDateToTime(startTime)} 
            </TimeContaier>
        )
    }
}

export default Time;