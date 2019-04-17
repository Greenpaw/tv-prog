import React, { Component } from 'react';
import styled from 'styled-components';
import Time from './Time'
var dayjs = require("dayjs");

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

class Title extends Component {

    state = {
        actualTime: dayjs().format('HH:mm'),
        isActual: false,
        isEnd: false,
      };

    
    componentDidMount() {
        this.updateActualProg();
    }

    //метод определения актуальности программы
    updateActualProg = () => {
        const timeStart = this.props.data.start; //получаем время начала передачи из родительского компонента App
        const timeStartString = dayjs(timeStart).format('HH:mm'); // время начала передачи в формате ('HH:mm')
        const timeEnd = dayjs(timeStart).add(this.props.data.duration, 'second'); //вычисляем время окончания передачи, добавляя её длительность к времени начала

        //исключаем из обработки программы, которые еще не начались
        if (dayjs(timeEnd).format('YYYY-MM-DD') > dayjs(timeStart).format('YYYY-MM-DD')) {
            return;
        }
        const timeEndString = dayjs(timeEnd).format('HH:mm'); // время завершения в формате ('HH:mm')
        

        //программа актуальна тогда, когда время ее начала меньше чем текущее время и текущее время меньше чем время её окончания
        if (timeStartString < this.state.actualTime && this.state.actualTime < timeEndString) {
            this.setState({ isActual: true })
        } else 
        
        //иначе программа уже завершена
        { if (timeEndString < this.state.actualTime) {this.setState({ isEnd: true })}}
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