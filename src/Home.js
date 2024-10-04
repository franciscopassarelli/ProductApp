import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

function Home() {
  const [product, setProduct] = useState({
    name: '',
    barcode: '',
    price: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Producto agregado: ${data.name}`);
        setProduct({
          name: '',
          barcode: '',
          price: '',
          description: '',
        });
      } else {
        setMessage('Error al agregar el producto. Verifica los datos.');
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor. Intenta de nuevo más tarde.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Agregar Producto
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <TextField
          name="name"
          label="Product Name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={product.name}
        />
        <TextField
          name="barcode"
          label="Barcode"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={product.barcode}
        />
        <TextField
          name="price"
          label="Price"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={product.price}
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={product.description}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Product
        </Button>
      </form>
      
      {message && (
        <Typography variant="h6" style={{ marginTop: '20px', color: 'green' }}>
          {message}
        </Typography>
      )}
    </Container>
  );
}

export default Home;
