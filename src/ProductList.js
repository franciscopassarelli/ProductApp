import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  // Obtener productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Error al obtener productos');
        }
      } catch (error) {
        console.error('Error al conectar con el servidor', error);
      }
    };

    fetchProducts();
  }, []);

  // Eliminar producto
  const handleDelete = async (barcode) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${barcode}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(product => product.barcode !== barcode));
      } else {
        console.error('Error al eliminar producto');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error);
    }
  };

  // Redirigir a la página de edición
  const handleEdit = (barcode) => {
    navigate(`/edit-product/${barcode}`); // Redirige a la página de edición
  };

  return (
    <div>
      <Typography variant="h4" style={{ margin: '20px 0' }}>
        Lista de Productos
      </Typography>
      <List>
        {products.map((product) => (
          <ListItem key={product.barcode}>
            <ListItemText
              primary={product.name}
              secondary={`Barcode: ${product.barcode}, Price: $${product.price}, Description: ${product.description}`}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(product.barcode)} // Pasa el barcode al handleEdit
              style={{ marginRight: '10px' }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(product.barcode)}
            >
              Eliminar
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ProductList;
