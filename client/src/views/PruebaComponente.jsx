import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';

const App = ({open, setOpen}) => {
  // const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };
const PruebaComponente = () => {

  const { data, isLoading, error, setData } = Axios("http://localhost:8000/api/auth/cart/list");
  if (isLoading) {
    return (
      <div>Cargando</div>
    )
  }
  if (error) {
    return (
      <div>Esto va tardar mas de lo pensado</div>
    )
  }
  if (data) {
    //console.log(data)
  }

  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Basic Drawer"
        placement={'left'}
        closable={false}
        onClose={onClose}
        visible={open}
        key={'left'}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
