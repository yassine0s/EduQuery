import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

const Footer = () => {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: '#F2F2F2' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' >
           Yassine's coorporation
        </a>
      </div>
    </MDBFooter>
    );
};

export default Footer;