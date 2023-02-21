import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
    height: '90vh',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#BDCDD6',
  };
const mainpage = () => {
    return (
        
            <Carousel effect="fade" >
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
    );
};

export default mainpage;