import { Table } from 'antd';
import { Box, TableContainer } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Drawer, Space } from 'antd';
import { HeatMapOutlined,PlusOutlined } from '@ant-design/icons';
import DeleteItem from './DeleteItem';
import UpdateStock from './UpdateStock';

// third-party

export default function OrderTable() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:9000/mongo/items/get')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
    const [itemDetails, setItemDetails] = useState(null);
console.log(itemDetails)
    const [open, setOpen] = useState(false);
    const showDrawer = (record) => {
      setOpen(true);
      setItemDetails(record);
    };

    const onClose = () => {
      setOpen(false);
    };




    //stock
    const [itemDetails1, setItemDetails1] = useState(null);
    const [open1, setOpen1] = useState(false);
    const showDrawer1 = (record) => {
      setOpen1(true);
      setItemDetails1(record);
    };

    const onClose1 = () => {
      setOpen1(false);
    };

  const itemColumn = [
 
    {
      title: 'Item Code',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name'
    },

    {
      title: 'Quantity in Stock (kgs)',
      dataIndex: 'availableQuantity',
      key: 'availableQuantity'
    },
    {
      title: 'Price',
      dataIndex: 'priceUSD',
      key: 'priceUSD'
    },

       {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <HeatMapOutlined style={{ color: 'blue', cursor: 'pointer' }} onClick={() => showDrawer(record)}/>
          <PlusOutlined style={{ color: 'blue', cursor: 'pointer' }} onClick={() => showDrawer1(record)}/>
        </div>
      )
    },
  ];

  return (
    <Box>
      <Drawer
        title="Delete Item"
        width={600}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button >Cancel</Button>
            <Button type="primary" >
              OK
            </Button>
          </Space>
        }
      >
        <DeleteItem  itemDetails={itemDetails}/>
      </Drawer>


      <Drawer
        title="Update Stock"
        width={600}
        onClose={onClose1}
        open={open1}
        extra={
          <Space>
            <Button >Cancel</Button>
            <Button type="primary" >
              OK
            </Button>
          </Space>
        }
      >
        <UpdateStock  itemDetails={itemDetails1}/>
      </Drawer>

      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          columns={itemColumn}
          dataSource={items}
          size="small"
          pagination={{
            pageSize: 10
          }}
        />
      </TableContainer>
    </Box>
  );
}
