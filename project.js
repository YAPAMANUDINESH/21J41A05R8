import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, TextField, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';
import { CssBaseline } from '@mui/material';

// Types
interface Product {
    id: string;
    name: string;
    company: string;
    category: string;
    price: number;
    rating: number;
    discount: number;
    availability: string;
}

// Fetch Products
const fetchProducts = async (
    company: string,
    category: string,
    top: number,
    minPrice: number,
    maxPrice: number
): Promise<Product[]> => {
    const API_BASE_URL = 'http://20.244.56.144/test/companies';
    try {
        const response = await axios.get(${API_BASE_URL}/${company}/categories/${category}/products, {
            params: { top, minPrice, maxPrice }
        });
        return response.data.map((item: any, index: number) => ({
            id: ${item.productName}-${item.price}-${index},
            name: item.productName,
            company,
            category,
            price: item.price,
            rating: item.rating,
            discount: item.discount,
            availability: item.availability,
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// ProductList Component
const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
    const getRandomImage = () => https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)};
    
    return (
        <Grid container spacing={2}>
            {products.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card>
                        <img src={getRandomImage()} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                        <CardContent>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography>Price: ${product.price.toFixed(2)}</Typography>
                            <Typography>Rating: {product.rating}</Typography>
                            <Typography>Discount: {product.discount}%</Typography>
                            <Typography>Availability: {product.availability}</Typography>
                            <Link to={/product/${product.id}}>View Details</Link>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

// AllProductsPage Component
const AllProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState({
        company: 'AMZ',
        category: 'Laptop',
        minPrice: 0,
        maxPrice: 10000
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await fetchProducts(
                filters.company, 
                filters.category, 
                10, 
                filters.minPrice, 
                filters.maxPrice
            );
            setProducts(fetchedProducts);
            setLoading(false);
        };

        loadProducts();
    }, [filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = () => {
        setLoading(true);
    };

    return (
        <div>
            <h1>All Products</h1>
            <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                >
                    <MenuItem value="Laptop">Laptop</MenuItem>
                    <MenuItem value="Phone">Phone</MenuItem>
                    {/* Add more categories */}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Company</InputLabel>
                <Select
                    name="company"
                    value={filters.company}
                    onChange={handleFilterChange}
                >
                    <MenuItem value="AMZ">AMZ</MenuItem>
                    <MenuItem value="FLP">FLP</MenuItem>
                    {/* Add more companies */}
                </Select>
            </FormControl>
            <TextField
                name="minPrice"
                label="Min Price"
                type="number"
                value={filters.minPrice}
                onChange={handleFilterChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="maxPrice"
                label="Max Price"
                type="number"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: '16px' }}>
                Search
            </Button>
            {loading ? <p>Loading...</p> : <ProductList products={products} />}
        </div>
    );
};

// ProductDetailPage Component
const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // Example product detail (replace with actual fetched data)
    const product: Product = {
        id: id || '',
        name: 'Sample Product',
        company: 'AMZ',
        category: 'Laptop',
        price: 999,
        rating: 4.5,
        discount: 10,
        availability: 'yes'
    };

    return (
        <div>
            <h1>Product Detail</h1>
            <div>
                <h2>{product.name}</h2>
                <p>Company: {product.company}</p>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>Rating: {product.rating}</p>
                <p>Discount: {product.discount}%</p>
                <p>Availability: {product.availability}</p>
            </div>
        </div>
    );
};

// App Component
const App: React.FC = () => {
    return (
        <Router>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<AllProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;