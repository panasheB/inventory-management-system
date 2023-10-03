// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
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
      icon: icons.FontSizeOutlined
    },

  
  ]
};

export default utilities;
