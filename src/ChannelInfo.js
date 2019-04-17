import React, { Component } from 'react';
import styled from 'styled-components';

const Info = styled.div`
font-size: 20px;
display: flex;
`;
const Logo = styled.img`
width: 25px;
height: 25px;
margin: 3px 17px 3px 54px;
border-raduis: 10px;

`;
const Title = styled.span`
font-family: sans-serif;
`;


class ChannelInfo extends Component {

    render() {
        let {title, logo} = this.props
        return(
            <Info>
                <Logo src={'https://epg.domru.ru' + logo}/>
                <Title>{title}</Title>
            </Info>
            
        )
    }
}

export default ChannelInfo;