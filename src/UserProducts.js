import React, { useState, useEffect } from "react";
import { Col, Row, Card, Container, Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import supabase from './SupabaseClient.js';
import UserNavbar from "./UserNavbar.js";
import './App.css';

function UserProducts() {
    const [carData, setCarData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedStyle, setSelectedStyle] = useState(""); // State to hold selected car style

    const all = async () => {
        try {
            const { data } = await supabase
                .from('dealer_inventory1')
                .select('*');
            setCarData(data);
        } catch (error) {
            console.error('Error during fetching all cars:', error.message);
            setError(error.message);
        }
    };

    useEffect(() => {
        all();
    }, []);

    const handleLogin = async (dealer_name) => {
        try {
            if (dealer_name === 'All') {
                all();
            } else {
                const { data } = await supabase
                    .from('dealer_inventory1')
                    .select('*')
                    .eq('dealer_name', dealer_name);
                setCarData(data);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            setError(error.message);
        }
    };

    const filterByPriceRange = async (min, max) => {
        try {
            const { data } = await supabase
                .from('dealer_inventory1')
                .select('*')
                .gte('price', min)
                .lte('price', max);
            setCarData(data);
        } catch (error) {
            console.error('Error during filtering by price range:', error.message);
            setError(error.message);
        }
    };

    const handlePriceFilter = () => {
        if (minPrice !== "" || maxPrice !== "") {
            filterByPriceRange(minPrice || 0, maxPrice || Infinity);
        } else {
            all();
        }
    };

    const onClickBuyNow = (car) => {
        const { dealer_name, car_name, car_style, price, VIN, image_path, description } = car;
        localStorage.setItem('dealer_name', dealer_name);
        localStorage.setItem('car_name', car_name);
        localStorage.setItem('car_style', car_style);
        localStorage.setItem('price', price);
        localStorage.setItem('VIN', VIN);
        localStorage.setItem('image_path', image_path);
        localStorage.setItem('description', description);
        navigate('/userconfirm');
    };

    const handleStyleFilter = async (style) => {
        try {
            const { data } = await supabase
                .from('dealer_inventory1')
                .select('*')
                .eq('car_style', style);
            setCarData(data);
        } catch (error) {
            console.error('Error during filtering by car style:', error.message);
            setError(error.message);
        }
    };

    return (
        <>
            <UserNavbar />
            {error && <p>{error}</p>}
            <Container style={{ display: 'flex', flexDirection: 'column' }}>
                <Form className="d-flex justify-content-end mt-5 me-2" style={{ width: '70%' }}>
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2 w-25"
                        aria-label="Search"
                        onChange={event => setSearchTerm(event.target.value)}
                        style={{ borderColor: 'orange' }}
                    />
                    <Form.Control
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={event => setMinPrice(event.target.value)}
                        style={{ borderColor: 'orange' }}
                    />
                    <Form.Control
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={event => setMaxPrice(event.target.value)}
                        style={{ borderColor: 'orange' }}
                    />
                    <Button
                        variant="outline-secondary"
                        onClick={handlePriceFilter}
                        style={{ backgroundColor: 'orange', borderColor: 'orange' }}
                    >
                        Filter
                    </Button>
                </Form>
                <div className="d-flex justify-content-start mt-3" style={{ width: '100%' }}>
                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={all}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = 'orange';
                            e.target.style.borderColor = 'orange';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '';
                            e.target.style.borderColor = 'orange';
                        }}
                    >
                        All
                    </button>
                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => handleLogin('Toyota')}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = 'orange';
                            e.target.style.borderColor = 'orange';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '';
                            e.target.style.borderColor = 'orange';
                        }}
                    >
                        Toyota
                    </button>
                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => handleLogin('Ford')}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = 'orange';
                            e.target.style.borderColor = 'orange';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '';
                            e.target.style.borderColor = 'orange';
                        }}
                    >
                        Ford
                    </button>
                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => handleLogin('Nissan')}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = 'orange';
                            e.target.style.borderColor = 'orange';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '';
                            e.target.style.borderColor = 'orange';
                        }}
                    >
                        Nissan
                    </button>
                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => handleLogin('Subaro')}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = 'orange';
                            e.target.style.borderColor = 'orange';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '';
                            e.target.style.borderColor = 'orange';
                        }}
                    >
                        Subaro
                    </button>

                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => handleLogin('Mitsubishi')}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = 'orange';
                            e.target.style.borderColor = 'orange';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '';
                            e.target.style.borderColor = 'orange';
                        }}
                    >
                        Mitsubishi
                    </button>

                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => handleLogin('BMW')}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = 'orange';
                            e.target.style.borderColor = 'orange';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '';
                            e.target.style.borderColor = 'orange';
                        }}
                    >
                        BMW
                    </button>

                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => handleLogin('Chevrolet')}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = 'orange';
                            e.target.style.borderColor = 'orange';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '';
                            e.target.style.borderColor = 'orange';
                        }}
                    >
                        Chevrolet
                    </button>
                </div>
                <Form.Select
                    className="me-2 mt-3"
                    aria-label="Car Style"
                    onChange={event => {
                        setSelectedStyle(event.target.value);
                        handleStyleFilter(event.target.value);
                    }}
                    value={selectedStyle}
                    style={{ borderColor: 'orange', width: '50%', alignSelf: 'center' }}
                >
                    <option value="">Select Car Style</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Truck">Truck</option>
                    <option value="Pick-up Truck">Pick-up Truck</option>
                    <option value="Pony Car">Pony Car</option>
                    <option value="Luxury">Luxury</option>
                    <option value="MPV">MPV</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Coupe">Coupe</option>
                </Form.Select>
            </Container>
            {carData && carData.length > 0 && (
                <Container className='flexcon mt-4'>
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {carData
                            .filter(car => car.car_name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((car) => (
                                <Col key={car.vin}>
                                    <CarCard car={car} onClickBuyNow={onClickBuyNow} />
                                </Col>
                            ))}
                    </Row>
                </Container>
            )}
        </>
    );
}

function CarCard({ car, onClickBuyNow }) {
    const { car_name, price, image_path, stocks, description } = car;
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleBuyNowClick = () => {
        onClickBuyNow(car);
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const truncatedDescription = showFullDescription ? description : `${description.slice(0, 100)}...`;

    return (
        <div className="mb-4" style={{ height: '100%' }}>
            <Card style={{
                maxWidth: '540px',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }} className="hover-card">
                <Card.Img src={image_path} className="card-image" style={{ objectFit: 'contain', flex: 1, height: '100%' }} />
                <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Card.Title className="mt-2">{car_name}</Card.Title>
                    <Card.Text style={{ textAlign: 'justify', marginBottom: '1rem' }}>
                        {showFullDescription ? description : truncatedDescription}
                        {' '}
                        <span onClick={toggleDescription} style={{ color: 'gray', cursor: 'pointer' }}>
                            {showFullDescription ? ' Read less' : ' Read more...'}
                        </span>
                    </Card.Text>
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
                        Order Now
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default UserProducts;
