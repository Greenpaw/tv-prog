import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import Title from './Title'
import Button from './Button'
import ChannelInfo from './ChannelInfo'
import { Scrollbars } from 'react-custom-scrollbars';
var dayjs = require("dayjs"); //библиотека для работы с временем


const ResponseList = styled.div`0
width: 300px;
height: ${props => props.isOpen ? "340px" : "125px"};
line-height: 1.5;
overflow: ${props => props.isOpen ? "" : "hidden"};
font-family: sans-serif;
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


class App extends Component {
    state = {
        programmList: [], //пропс который будет содержать информацию по телепрограмме
        channelTitle: '', //название канала
        channelLogo: '',  //лого канала  
      };

      handleErrorMessage = () => {
        return 'К сожалению, сегодня программа телепередач недоступна'
      }

      //запрашиваем информацию о каналах в городе
      getInfoChannel = () => {
        axios.get('http://epg.domru.ru/channel/list?domain=perm')
        .then((response) => {
          let responseArray = [];
          responseArray.push(Object.values(response.data[22]));// достаем информацию по конкретному каналу (1 канал)
          this.setState({
            channelTitle: responseArray["0"]["1"],// присваиваем название канала
            channelLogo: responseArray["0"]["2"],// присваиваем логотип
          })
        })
        .catch((error) => {
            this.handleErrorMessage();
        });
    }
     //запрашиваем программу передач канала на текущий день
    getChannelProgList = () => {
        var dateFrom = dayjs().format('YYYY-MM-DD');// получаем сегодняшнюю дату в необходимом формате
        var badTime = dayjs(dateFrom).add(1, 'day'); // прибавляем к сегодняшней дате 1 день
        var dateTo = dayjs(badTime).format('YYYY-MM-DD'); //приводим промежуточную дату в необходимый формат
        axios.get('http://epg.domru.ru/program/list?domain=perm&date_from='+dateFrom+'+00%3A00%3A00&date_to='+dateTo+'+00%3A00%3A00&xvid[0]=1&xvid[1]')
          .then((response) => {
            let responseArray = [];
            responseArray.push(Object.values(response.data["1"]));
            this.setState({
                programmList: responseArray["0"],// получаем расписание канала
            })
          })
          .catch((error) => {
              this.handleErrorMessage();
          });
    }

    //вызываем методы обращения к API
    componentDidMount(){
        this.getChannelProgList(); 
        this.getInfoChannel();
    }

    //метод для возврата пропса isOpen от дочернего компонента Button родительскому App
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
                <ResponseList isOpen = {this.state.isOpen}>
                    <Scroll>
                    {
                        this.state.programmList.map((item, index) => (
                            <Title data={item} key={index} />
                        ))
                    }
                    </Scroll>  
                </ResponseList>
                <Button updateData={this.updateData}/>
            </Article>
        </React.Fragment>
        )
    }
}

export default App;