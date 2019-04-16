import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import Title from './Title'
import Button from './Button'
import ChannelInfo from './ChannelInfo'
import { Scrollbars } from 'react-custom-scrollbars';

const ResposeList = styled.div`
width: 300px;
height: ${props => props.isOpen ? "340px" : "125px"};
line-height: 1.5;
overflow: ${props => props.isOpen ? "" : "hidden"};

`;
const Article = styled.div`
width: 305px;
height: ${props => props.isOpen ? "430px" : "200px"};
border: 1px solid green;
border-radius: 20px;
border: 3px #ccc solid;
box-shadow: ${props => props.isOpen ? "0 0 10px #444" : "none"} ;
`;
const Scroll = styled(Scrollbars)`
width: 300px,
height: ${props => props.isOpen ? "335px" : "20px"},
left: -100px;
`;
var dayjs = require("dayjs");
class App extends Component {
    state = {
        programmList: [],
        channelTitle: '',
        channelLogo: '',    
      };

      handleErrorMessage = () => {
        return 'К сожалению, сегодня программа телепередач недоступна'
      }

      getInfoChannel = () => {
        axios.get('http://epg.domru.ru/channel/list?domain=perm')
        .then((response) => {
          let responseArray = [];
          responseArray.push(Object.values(response.data[22]));
          this.setState({
            channelTitle: responseArray["0"]["1"],
            channelLogo: responseArray["0"]["2"],
          })
        })
        .catch((error) => {
            this.handleErrorMessage();
        });
    }
    getChannelProgList = () => {
        var dateFrom = dayjs().format('YYYY-MM-DD');
        var badTime = dayjs(dateFrom).add(1, 'day'); 
        var dateTo = dayjs(badTime).format('YYYY-MM-DD');
        axios.get('http://epg.domru.ru/program/list?domain=perm&date_from='+dateFrom+'+00%3A00%3A00&date_to='+dateTo+'+00%3A00%3A00&xvid[0]=1&xvid[1]')
          .then((response) => {
            let responseArray = [];
            responseArray.push(Object.values(response.data["1"]));
            this.setState({
                programmList: responseArray["0"],
            })
          })
          .catch((error) => {
              this.handleErrorMessage();
          });
    }
    componentDidMount(){
        this.getChannelProgList();
        this.getInfoChannel();
    }
    updateData = (value) => {
        this.setState({ 
            isOpen: value,
        });
    }
    
    render() {
       
        return(
        <React.Fragment>
            <Article isOpen = {this.state.isOpen}>
                <ChannelInfo title={this.state.channelTitle} logo={this.state.channelLogo} />
                <ResposeList isOpen = {this.state.isOpen}>
                    <Scroll>
                    {
                        this.state.programmList.map((item, index) => (
                            <Title data={item} key={index} />
                        ))
                    }
                    </Scroll>  
                </ResposeList>
                <Button updateData={this.updateData}/>
            </Article>
        </React.Fragment>
        )
    }
}

export default App;