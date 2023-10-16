// assets
import {
  AntDesignOutlined,
  BgColorsOutlined,
  PayCircleOutlined,
  LoadingOutlined,
   DollarOutlined,
   AppstoreAddOutlined,
} from '@ant-design/icons';

// icons
const icons = {
   DollarOutlined,
  PayCircleOutlined,
  BgColorsOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
};


const utilities = {
  id: 'utilities',
  title: 'Transactions',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Transactions',
      type: 'item',
      url: '/transactions',
      icon: icons.   DollarOutlined,
    },

    {
      id: 'util-items',
      title: 'Items',
      type: 'item',
      url: '/items',
      icon: icons.  AppstoreAddOutlined,
    },

    {
      id: 'util-transaction',
      title: 'Reporting',
      type: 'item',
      url: '/reporting',
      icon: icons.PayCircleOutlined
    },


  
  ]
};

export default utilities;
