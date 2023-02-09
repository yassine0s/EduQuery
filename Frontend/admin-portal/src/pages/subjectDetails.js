import React from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBContainer,
} from 'mdb-react-ui-kit';
export default function subjectDetails() {
    return (
        <div className='mt-5'>
            <MDBContainer breakpoint="sm">
                <MDBRow className='g-5'>
                    <MDBCol>
                        <MDBInput id='form11Example4' label='Name' />
                    </MDBCol>
                </MDBRow>
                <MDBBtn className='mt-3' color='dark'>Save</MDBBtn>
            </MDBContainer>

        </div>

    );
}