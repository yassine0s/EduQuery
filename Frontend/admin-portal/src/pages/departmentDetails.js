import React from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBContainer, MDBTableHead, MDBTable, MDBTableBody
} from 'mdb-react-ui-kit';
export default function departmentDetails() {
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

            <h2 className='mx-5 mt-5'> Related Subjects</h2>
            <br></br>
            <MDBRow>
                <MDBCol md="2"></MDBCol>
                <MDBCol md="8">
                    <MDBTable>
                        <MDBTableHead dark>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <MDBBtn className="bg-dark" rounded size="sm" href="/departmentDetails">
                                    Edit
                                </MDBBtn>{" "}
                            </tr>
                        </MDBTableBody>
                    </MDBTable>
                </MDBCol>
                <MDBCol md="2"></MDBCol>
            </MDBRow>
        </div>

    );
}