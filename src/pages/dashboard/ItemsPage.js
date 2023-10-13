import {
    Grid,
  } from '@mui/material';
  import ItemsTable from './ItemsTable';

  import { PlusOutlined } from '@ant-design/icons';
  import MainCard from 'components/MainCard';
  import { Button, Drawer, Space } from 'antd';
  import { useState } from 'react';
import AddItem from './AddItem';
  
  
  
  // avatar style
  
  
  
  const ItemsPage = () => {

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
    };
  
    return (
        <>
              <Drawer
        title="Add Item"
        width={500}
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
        <AddItem  />
      </Drawer>


      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
  
   
        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <div style ={{margin:"10px"}}>
            <PlusOutlined  onClick={() => showDrawer()} style={{ color: 'blue', cursor: 'pointer',fontSize: '30px' }} />
            </div>
            <ItemsTable />
          </MainCard>
        </Grid>
       
  
      </Grid>
        
        </>
   
    );
  };
  
  export default ItemsPage;
  