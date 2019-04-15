import React, { Component } from 'react';
import styled from 'styled-components';

const TimeContaier = styled.span`
    margin-right: 10px;
    display: inline-flex;
`;

class Title extends Component {
    state = {
        programmList: [],
      };

    getBetterTime = (time) => {
        let withoutDate = time.split(" ")[1];
        let betterTime;
        betterTime = withoutDate.split(":")[0] + ':' + withoutDate.split(":")[1];
        return betterTime;
    }

    render() {
        let { time } = this.props;
        return(
            <TimeContaier>
               {this.getBetterTime(time)} 
            </TimeContaier>
            
        )
    }
}

export default Title;