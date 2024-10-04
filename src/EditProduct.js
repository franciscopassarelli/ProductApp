import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

function EditProduct() {
  const { barcode } = useParams();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${barcode}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error al obtener el producto', error);
      }
    };
    fetchProduct();
  }, [barcode]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructura los valores de product
    const { name, price, description } = product;

    // Validar que al menos un campo haya sido editado
    if (!name && !price && !description) {
      setMessage('Debes llenar al menos un campo para actualizar el producto');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/products/${barcode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // Solo enviamos los campos que no están vacíos
        body: JSON.stringify({
          ...(name && { name }),
          ...(price && { price }),
          ...(description && { description }),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Producto actualizado exitosamente');
      } else {
        setMessage(`Error al actualizar el producto: ${data.message || 'Error desconocido'}`);
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Editar Producto
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <TextField
          name="name"
          label="Product Name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={product.name || ''}
        />
        <TextField
          name="price"
          label="Price"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={product.price || ''}
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={product.description || ''}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Changes
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

export default EditProduct;
