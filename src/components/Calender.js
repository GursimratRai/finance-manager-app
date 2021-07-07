import React, { Component } from 'react';
import { Calendar } from 'antd';

import 'antd/dist/antd.css';
import '../assets/css/Calender.css';

class Calender extends Component {

    onSelect = (value) => {
        console.log('value',value.format('DD-MM-YYYY'));
    }

    render() {
        return (
            <div>
             <Calendar onSelect={this.onSelect} />
            </div>
        );
    }
}

export default Calender;