import React, { Component } from 'react';
import styled from 'styled-components';

const Info = styled.div`
`;
const Logo = styled.img`
width: 40px;
height: 40px;
margin: 3px 17px 3px 54px;
border-raduis: 10px;
`;
const Title = styled.span`
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