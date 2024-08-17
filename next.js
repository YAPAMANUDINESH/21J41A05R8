import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define types for the product
interface Product {
    id: number;
    name: string;
    price: number;
}

// Service to fetch top N products
const fetchTopNProducts = async (n: number): Promise<Product[]> => {
    const API_URL = 'http://your-api-url.com/products'; // Replace with actual API endpoint
    try {
        const response = await axios.get(${API_URL}?top=${n});
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// ProductList component to display the products
const ProductList: React.FC<{ products: Product[] }> = ({ products }) => (
    <div>
        <h2>Top Products</h2>
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    {product.name} - ${product.price.toFixed(2)}
                </li>
            ))}
        </ul>
    </div>
);

// HomePage component to manage state and fetch products
const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadProducts = async () => {
            const topProducts = await fetchTopNProducts(10); // Fetch top 10 products
            setProducts(topProducts);
            setLoading(false);
        };

        loadProducts();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Top N Products</h1>
            <ProductList products={products} />
        </div>
    );
};

// App component with routing setup
const App: React.FC = () => {
    return (
        <div>
            <HomePage />
        </div>
    );
};

export default App;