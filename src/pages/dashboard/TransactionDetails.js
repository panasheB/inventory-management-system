import { CCallout } from '@coreui/react'
import { Col, Row } from 'reactstrap';
import { CTable, CTableHead, CTableBody, CTableHeaderCell, CTableDataCell, CTableRow } from '@coreui/react';
import { CTableFoot } from '@coreui/react';
import { cilPrint } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

function TranscationDetails({ transaction }) {
    


   
    return (
        <>

            <div style={{ marginTop: '20px' }}>
                <Row>
                    <Col sm="12">
                        <>
                            <CCallout style={{ backgroundColor: '#ffffff' }} color="light" className="px-3 py-2">
                                <Row style={{ paddingRight: '30px', paddingBottom: '0px', paddingTop: '0px', justifyContent: 'flex-end' }}>
                                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <span style={{ fontStyle: 'italic' }}>Specialists in Machine Learning</span>
                                                        <br />
                                                        <p>Midrand, Gauteng</p>
                                                        <p>South Africa</p>
                                                        <p style={{ marginTop: '20px' }}>027749779640</p>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div onClick={() => window.print()}>
                                                <CIcon icon={cilPrint} height={20} width={20} style={{ cursor: 'pointer', marginRight: '5px' }} />
                                            </div>
                                            <div>
                                                <h4>Invoice</h4>
                                                <p style={{ fontWeight: 'bold', color: 'black' }}>Karibu Techs AI</p>
                                                <p>Reg: K2018252309</p>
                                                <p>57 Carlswald Meadows</p>

                                            </div>
                                        </div>

                                        <hr style={{ margin: '20px 0' }} /> {/* Faint horizontal line */}

                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div style={{ textAlign: 'left' }}>
                                               
                                                <p><span style={{ color: 'black' }}> Full Name</span>: {transaction?.['patientFullName']}</p>
                                                <p><span style={{ color: 'black' }}> National ID</span>: {transaction?.['patientNationalId']}</p>
                                                <p><span style={{ color: 'black' }}> Patient ID</span>: {transaction?.['patientId']}</p>
                                                <p><span style={{ color: 'black' }}> Case Number</span>: {transaction?.['casenumber']}</p>
                                            </div>
                                            <div>
                                             
                                                <p><span style={{ color: 'black' }}>  Transaction ID</span>: {`${"T"+ transaction?.['_id']?.slice(12, 24)}`}</p>
                                                <p><span style={{ color: 'black' }}> Transaction Date</span>: {transaction?.['createdAt']}</p>
                                                <p><span style={{ color: 'black' }}> Payment Due </span>: {transaction?.total}</p>
                                                <p><span style={{ color: 'black' }}> Amount Due {transaction?.['currency']}</span>{(transaction?.['total'])?.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <CTable >
                                        <CTableHead style={{ backgroundColor: "#69a3de", color:"#FFF"}}>
                                            <CTableRow>
                                                <CTableHeaderCell>Products</CTableHeaderCell>
                                                <CTableHeaderCell>Price({transaction?.['currency']})</CTableHeaderCell>
                                                <CTableHeaderCell>Subtotal({transaction?.['currency']})</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            <CTableRow>
                                                <CTableDataCell>
                                                    <span style={{ whiteSpace: 'nowrap' }}>
                                                        {transaction?.['products']?.map((product, index) => (
                                                            <span key={index}>
                                                                {product?.name}
                                                                {index !== transaction?.products?.length - 1 ? ', ' : ''}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </CTableDataCell>
                                                <CTableDataCell>({transaction?.['currency']}) {transaction?.['price']}</CTableDataCell>
                                                <CTableDataCell>({transaction?.['currency']}) {(transaction?.['subtotal'])?.toLocaleString()}</CTableDataCell>

                                            </CTableRow>
                                        </CTableBody>
                                    </CTable>


                                    <div style={{ display: 'flex', justifyContent: 'end', gap: '10px', marginTop: '0px' }}>
                                        <CTableFoot>
                                            <CTableRow>
                                                <CTableHeaderCell colSpan="3" className="text-end">Subtotal:</CTableHeaderCell>
                                                <CTableDataCell > <span style={{ color: "#69a3de", marginLeft: '30px' }}> {transaction?.['currency']} {(transaction?.['subtotal'])?.toLocaleString()}</span></CTableDataCell>
                                            </CTableRow>
                                            <hr style={{ margin: '20px 0' }} />
                                   
                                            <CTableRow>
                                                <CTableHeaderCell colSpan="3" className="text-end">Amount Due:</CTableHeaderCell>
                                                <CTableDataCell> <span style={{ color: "#69a3de", marginLeft: '10px' }}> {transaction?.['currency']}{(transaction?.['subtotal'])?.toLocaleString()} </span></CTableDataCell>
                                            </CTableRow>

                                        </CTableFoot>


                                    </div>
                                </Row>


                            </CCallout>
                        </>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default TranscationDetails


