import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Home from './Home';
import ProductList from './ProductList';
import EditProduct from './EditProduct';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Gestión de Productos
          </Typography>
          <Button color="inherit" component={Link} to="/">Add Product</Button>
          <Button color="inherit" component={Link} to="/products">Product List</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/edit-product/:barcode" element={<EditProduct />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
