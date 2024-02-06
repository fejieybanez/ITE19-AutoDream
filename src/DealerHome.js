import './App.css';
import DealerNavbar from "./DealerNavbar.js";
import { Col, Row, Card, Container, Button, Form } from "react-bootstrap";
import supabase from './SupabaseClient.js';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function CompanyVehicles() {
    const [carData, setCarData] = useState(null);
    const [error, setError] = useState(null);
    const dealerName = localStorage.getItem('dealer_name');
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const navigate = useNavigate();

    const handleLogin = useCallback(async () => {
        try {
            const { data } = await supabase
                .from('cars1')
                .select('*')
                .eq('dealer_name', dealerName);
            setCarData(data);
        } catch (error) {
            console.error('Error during login:', error.message);
            setError(error.message);
        }
    }, [dealerName]);

    useEffect(() => {
        handleLogin();
    }, [handleLogin]);

    const filterByPriceRange = async (min, max) => {
        try {
            const { data } = await supabase
                .from('cars1')
                .select('*')
                .eq('dealer_name', dealerName)
                .gte('price', min)
                .lte('price', max);
            setCarData(data);
        } catch (error) {
            console.error('Error during filtering by price range:', error.message);
            setError(error.message);
        }
    }; 

    const handlePriceFilter = () => {
        if (minPrice !== '' || maxPrice !== '') {
            filterByPriceRange(minPrice || 0, maxPrice || Infinity); 
        } else {
            handleLogin();
        }
    };

    const onClickBuyNow = (car) => {
        const { dealer_name, car_name, car_style, price, VIN, image_path, stocks, description } = car;
        localStorage.setItem('dealer_name', dealer_name);
        localStorage.setItem('car_name', car_name);
        localStorage.setItem('car_style', car_style);
        localStorage.setItem('price', price);
        localStorage.setItem('VIN', VIN);
        localStorage.setItem('image_path', image_path);
        localStorage.setItem('stocks', stocks);
        localStorage.setItem('description', description);
        navigate('/dealerconfirm');
    };

    return (
        <>
            <DealerNavbar />
            <Container className='mt-5'>
                <Form className='d-flex justify-content-end'>
                    <Form.Control
                        type='search'
                        placeholder='Search here...'
                        className='me-2 w-25'
                        aria-label='Search'
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <Form.Control
                        type='number'
                        placeholder='Min Price'
                        value={minPrice}
                        onChange={(event) => setMinPrice(event.target.value)}
                        className='me-2'
                        style={{ width: '150px' }}
                    />
                    <Form.Control
                        type='number'
                        placeholder='Max Price'
                        value={maxPrice}
                        onChange={(event) => setMaxPrice(event.target.value)}
                        className='me-2'
                        style={{ width: '150px' }} 
                    />
                    <Button
                        variant='outline-secondary'
                        onClick={handlePriceFilter}
                        style={{ backgroundColor: 'orange', borderColor: 'orange' }}>
                        Filter
                    </Button>
                </Form>
            </Container>
            {error && <p>{error}</p>}
            {carData && (
                <Container className='flexcon mt-4'>
                    <Row xs={1} md={2} lg={4} className='g-4'>
                        {carData
                            .filter((car) => car.car_name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((car) => (
                                <Col key={car.vin}>
                                    <DealerCarCard car={car} onClickBuyNow={onClickBuyNow} />
                                </Col>
                            ))}
                    </Row>
                </Container>
            )}
            <div className='footer1 d-flex mt-2'>
                <div style={{ fontSize: '10px', margin: 'auto' }}>© 2024 Copyright: AutoDream</div>
            </div>
        </>
    );
}

function DealerCarCard({ car, onClickBuyNow }) {
    const { car_name, price, image_path, stocks} = car;

    const handleBuyNowClick = () => {
        onClickBuyNow(car);
    };

    return (
        <Card style={{
            maxWidth: '540px',
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }} className="hover-card">
            <Card.Img src={image_path} className="card-image" style={{ objectFit: 'cover', flex: 1 }} />
            <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Card.Title className="mt-2">{car_name}</Card.Title>
                <Card.Text>Price: ₱{price}</Card.Text>
                <Card.Text>Stocks: {stocks}</Card.Text>
                <Button
                    variant="dark"
                    className="check-out mt-auto hover-button"
                    onClick={handleBuyNowClick}
                    style={{
                        backgroundColor: 'orange',
                        borderColor: 'orange',
                    }}>
                    Buy Now
                </Button>
            </Card.Body>
        </Card>
    );
}

export default CompanyVehicles;
