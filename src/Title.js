import React, { Component } from 'react';
import styled from 'styled-components';
import Time from './Time'

const TitleContaier = styled.div`
display: flex;
margin-left:20px;
`;
const TextContainer = styled.span`
clear: both;
display: inline-flex;
`

class Title extends Component {

    render() {
        let { data } = this.props;
        return(
            <TitleContaier>
                <Time time={data.start} />
                <TextContainer>{data.title}</TextContainer>   
            </TitleContaier>
            
        )
    }
}

export default Title;