import { useState } from 'react';
import { CForm, CRow, CCol, CFormLabel } from '@coreui/react';
import { CFormInput, CFormSelect } from '@coreui/react';
import { CTable, CTableHead, CTableBody, CTableHeaderCell, CTableDataCell, CTableRow } from '@coreui/react';
import { CTableFoot } from '@coreui/react';
import { BsTrashFill } from 'react-icons/bs';
import {Button} from "antd"


function AddTransaction() {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [mode, setMode] = useState();
  const buttonStyle3 = {
    backgroundColor: '#69A3DE',
    border: '1px solid #69A3DE',
    borderRadius: '50px',
    color: '#fff',
    variant: 'outline',
    padding: '2px 15px',
    margin: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
};


  const products = [
    { name: 'LP GAS', priceUSD: 2, availableQuantity:50, priceZIMDOLLAR: 34 },
  ];

  const selectedProduct = products.find((item) => item.name === product);
  const price = currency === 'USD' ? selectedProduct?.priceUSD : currency === 'ZIMDOLLAR'? selectedProduct?.priceZIMDOLLAR : selectedProduct?.priceUSD;

  const [productsInCart, setProductsInCart] = useState([]);
  const currencyOptions = [
    { value: 'select', label: '--select' },
    { value: 'USD', label: 'USD' }
  ];

  const paymentMode = [
    { value: 'select', label: '--select' },
    { value: 'Mode 1', label: 'Mode 1' },
    { value: 'ANother', label: 'Another' }
  ];


  const handleGenerateQuotation = () => {
    const productInCart = {
      name: product,
      price,
      quantity,
    };
    setProductsInCart([...productsInCart, productInCart]);
  };

  const removeItemFromCart = (index) => {
    const updatedCart = productsInCart.filter((_, i) => i !== index);
    setProductsInCart(updatedCart);
  };

  const handleChangeProduct = (e) => {
    setProduct(e.target.value);
  };

  const handleChangeQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleChangeCurrency = (e) => {
    setCurrency(e.target.value);
  };

  const handleModeOfPayment = (e) => {
    setMode(e.target.value);
  };
  const getCurrencySymbol = () => {
    if (currency === 'ZIMDOLLAR') {
      return 'ZWL';
    }
     else {
        return '$';
    }
  };

//calculator
  const computeTotalAndSubtotal = () => {
    let subtotal = 0;
    let total = 0;

    for (const product of productsInCart) {
      subtotal += product.price * product.quantity;
      total += product.price * product.quantity ;
    }
    return { subtotal, total };
  };

  const [transaction, setTranscaction] = useState({
    amountTendered:'',
    customerName:'',
    customerPhone:'',
    customerEmail:'',
    product: '',
    price: '',
    quantity: '',
    availableQuantity:'',
    subtotal: '',
    total: '',
    cumulativeAmount:'',
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setTranscaction((prevRequest) => ({
      ...prevRequest,
      [name]: value
    }));
  };


   function handleSubmit() {
    const { subtotal, total } = computeTotalAndSubtotal();
    const data = {
      'transaction-details': {
        products: productsInCart,
        price: selectedProduct.price,
        subtotal: subtotal,
        total: total,
        currency: currency,
        customerEmail: transaction.customerEmail,
        customerName: transaction.customerName,
        customerPhone: transaction.customerPhone,
        amountTendered: transaction.amountTendered,
        availableQuantity:selectedProduct?.availableQuantity,
        paymentMode: mode,
        change: "",
        cumulativeAmount:transaction?.cumulativeAmount
      }
    
    };
    console.log(data)
  }

  const containerStyle = {
    border: '0.5px solid lightgrey',
    padding: '10px'
  };
  //tables

  const renderTableHeader = () => {
    if (currency === 'ZIMDOLLAR') {
      return (
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Item</CTableHeaderCell>
            <CTableHeaderCell>Price(ZWL)</CTableHeaderCell>
            <CTableHeaderCell>Quantity</CTableHeaderCell>
            <CTableHeaderCell>Total(ZWL)</CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
      );
    } else  {
        return (
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Item</CTableHeaderCell>
                <CTableHeaderCell>Price($)</CTableHeaderCell>
                <CTableHeaderCell>Quantity</CTableHeaderCell>
                <CTableHeaderCell>Total($)</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
          );
    }

  };

  const renderTableBody = () => {
    if (currency === 'ZIMDOLLAR') {
      return (
        <CTableBody>
          {productsInCart.map((product, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{product.name}</CTableDataCell>
              <CTableDataCell>{product.price?.toLocaleString()}</CTableDataCell>
              <CTableDataCell>{product.quantity}</CTableDataCell>
              <CTableDataCell>{product.price * product.quantity}</CTableDataCell>
              <CTableDataCell>
                <BsTrashFill size={18} color="#69a3de" style={{ cursor: 'pointer' }} onClick={() => removeItemFromCart(index)} />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      );
    } else  {
    
        return (
            <CTableBody>
              {productsInCart.map((product, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{product.name}</CTableDataCell>
                  <CTableDataCell>{product.price?.toLocaleString()}</CTableDataCell>
                  <CTableDataCell>{product.quantity}</CTableDataCell>
                  <CTableDataCell>{product.price * product.quantity}</CTableDataCell>
                  <CTableDataCell>
                    <BsTrashFill size={18} color="#69a3de" style={{ cursor: 'pointer' }} onClick={() => removeItemFromCart(index)} />
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          );
    
    }
  };

  return (
    <>
      <div style={containerStyle}>
        <>
          <div style={{ backgroundColor: 'white' }}>
            <div style={{ marginLeft: '10px' }}>
              <h5> Add Transaction</h5>
              <CRow>
                  <div>
                    <CRow>
                      <CCol xs="8" sm="8" lg="8">
                        <CForm>
                          <hr />
                          <div>
                            <CForm>
                              <CRow className="mb-3">
                                <CCol xs="6" sm="6" lg="6">
                                  <CFormLabel>Item</CFormLabel>
                                  <CFormSelect value={product} onChange={handleChangeProduct}>
                                    <option value="">Select item</option>
                                    {products.map((item) => (
                                      <option key={item.name} value={item.name}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </CFormSelect>
                                </CCol>

                                <CCol xs="6" sm="6" lg="6">
                                  <CFormLabel>Available Quantity</CFormLabel>
                                  <CFormInput type="number" min={0} value={selectedProduct?.availableQuantity}/>
                                </CCol>
                              </CRow>

                              <CRow className="mb-3">
                                <CCol xs="6" sm="6" lg="6">
                                  <CFormLabel>Unity Price</CFormLabel>
                                  <CFormInput type="number" min={0} value={selectedProduct?.priceUSD}  />
                                </CCol>

                                <CCol xs="6" sm="6" lg="6">
                                  <CFormLabel>Quantity</CFormLabel>
                                  <CFormInput type="number" min={0} value={quantity} onChange={handleChangeQuantity} />
                                </CCol>
                              </CRow>

                              <CRow className="mb-3">
                                <CCol xs="6" sm="6" lg="6">
                                  <CFormLabel>Currency</CFormLabel>
                                  <CFormSelect value={currency} onChange={handleChangeCurrency}>
                                    {currencyOptions.map((option) => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </CFormSelect>
                                </CCol>
                                <CCol xs="6" sm="6" lg="6">
                                  <CFormLabel>Mode of Payment</CFormLabel>
                                  <CFormSelect value={mode} onChange={handleModeOfPayment}>
                                    {paymentMode.map((option) => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </CFormSelect>
                                </CCol>
                              </CRow>




                              <CRow className="mb-3">
                              <CCol className="mb-2" xs="12" sm="6" lg="6">
                                <CFormLabel className="label-txt">Amount Tendered</CFormLabel>
                                <CFormInput
                                  type="text"
                                  size="sm"
                                  valid={transaction.amountTendered !== ''}
                                  name="amountTendered"
                                  placeholder="Amount Tendered"
                                  value={transaction.amountTendered}
                                  onChange={handleChange}
                                />
                              </CCol>

                              <CCol className="mb-2" xs="12" sm="6" lg="6">
                                <CFormLabel className="label-txt">Cumulative Amount</CFormLabel>
                                <CFormInput
                                  type="text"
                                  size="sm"
                                  valid={transaction.cumulativeAmount !== ''}
                                  name="cumulativeAmount"
                                  placeholder="Amount"
                                  value={transaction.cumulativeAmount}
                                  onChange={handleChange}
                                />
                              </CCol>
                              </CRow>

                              <CRow className="mb-3">

                              <CCol className="mb-2" xs="12" sm="6" lg="6">
                                <CFormLabel className="label-txt">Customer Name</CFormLabel>
                                <CFormInput
                                  type="text"
                                  size="sm"
                                  valid={transaction.customerName !== ''}
                                  name="customerName"
                                  placeholder="Customer Name"
                                  value={transaction.customerName}
                                  onChange={handleChange}
                                />
                              </CCol>
                           
                                <CCol className="mb-2" xs="12" sm="6" lg="6">
                                <CFormLabel className="label-txt">Customer Phone</CFormLabel>
                                <CFormInput
                                  type="text"
                                  size="sm"
                                  valid={transaction.customerPhone !== ''}
                                  name="customerPhone"
                                  placeholder="Customer Phone"
                                  value={transaction.customerPhone}
                                  onChange={handleChange}
                                />
                              </CCol>

                                <CCol className="mb-2" xs="12" sm="6" lg="6">
                                <CFormLabel className="label-txt">Customer Email</CFormLabel>
                                <CFormInput
                                  type="text"
                                  size="sm"
                                  valid={transaction.customerEmail !== ''}
                                  name="customerEmail"
                                  placeholder="Customer Email"
                                  value={transaction.customerEmail}
                                  onChange={handleChange}
                                />
                              </CCol>
                              </CRow>

                              <CRow className="mb-3">
                                <CCol className="mb-2" xs="12" sm="6" lg="6">
                                <CFormLabel className="label-txt">Customer Email</CFormLabel>
                                <CFormInput
                                  type="text"
                                  size="sm"
                                  valid={transaction.customerEmail !== ''}
                                  name="customerEmail"
                                  placeholder="Customer Email"
                                  value={transaction.customerEmail}
                                  onChange={handleChange}
                                />
                              </CCol>
                              </CRow>
                            

                              <CRow className="mb-1">
                                <CCol xs="6" sm="6" lg="6">
                                  <div style={{ display: 'flex', justifyContent: 'start', gap: '10px', marginTop: '30px' }}>
                                    <Button
                                      style={{ color: '#fff', border: 'none', backgroundColor: '#69a3de' }}
                                      size="sm"
                                      onClick={handleGenerateQuotation}
                                    >
                                      Add Order
                                    </Button>
                                  </div>
                                </CCol>
                              </CRow>
                            </CForm>
                          </div>

                          <CTable>
                            {renderTableHeader()}
                            {renderTableBody()}
                          </CTable>

                          <div style={{ display: 'flex', justifyContent: 'end', gap: '10px', marginTop: '0px' }}>
                            <CTableFoot>
                            <CTableRow>
                                <CTableHeaderCell colSpan="3" className="text-end">
                                  Cumulative Ammount:
                                </CTableHeaderCell>
                                <CTableDataCell>
                                  <span style={{ color: '#69a3de' }}>
                                 {transaction?.cumulativeAmount}
                                  </span>
                                </CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableHeaderCell colSpan="3" className="text-end">
                                  Change:
                                </CTableHeaderCell>
                                <CTableDataCell>
                                  <span style={{ color: '#69a3de' }}>
                                   000
                                  </span>
                                </CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableHeaderCell colSpan="3" className="text-end">
                                  Total Price:
                                </CTableHeaderCell>
                                <CTableDataCell>
                                  <span style={{ color: '#69a3de' }}>
                                    {getCurrencySymbol()}
                                    {computeTotalAndSubtotal()?.subtotal?.toLocaleString()}
                                  </span>
                                </CTableDataCell>
                              </CTableRow>
                            </CTableFoot>
                          </div>
                        </CForm>
                        <hr />
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                          <Button
                            className="sb-3"
                            size="sm"
                            style={buttonStyle3}
                            onClick={handleSubmit}
                          >
                            Confirm Order
                          </Button>{' '}
                        </div>
                      </CCol>
                    </CRow>
                  </div>
              </CRow>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
export default AddTransaction;
