import './App.css';
import DealerNavbar from "./DealerNavbar";
import { Col, Row, Card, Container, Form } from "react-bootstrap";
import { useState, useEffect, useCallback } from 'react';
import supabase from './SupabaseClient.js';

function DealerInventory() {
    const [searchTerm, setSearchTerm] = useState("");
    const [carData, setCarData] = useState(null);
    const [error] = useState(null);
    const dealerName = localStorage.getItem('dealer_name');

    const handleInventory = useCallback(async () => {
        try {
            const { data } = await supabase
                .from('dealer_inventory')
                .select('*')
                .eq('dealer_name', dealerName);
            setCarData(data);
        }
        catch (error) {
            console.error('Error during login:', error.message);
        }
    }, [dealerName]);

    useEffect(() => {
        handleInventory();
    }, [handleInventory]);

    return (
        <>
            <DealerNavbar />
            <Container className='mt-5'>
                <Form className="d-flex justify-content-end">
                    <Form.Control
                        type="search"
                        placeholder="Search here. . ."
                        className="me-2 w-25"
                        aria-label="Search"
                        onChange={event => setSearchTerm(event.target.value)}
                    />
                </Form>
            </Container>
            {error && <p>{error}</p>}
            {carData && (
                <Container className='flexcon mt-4'>
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {carData.filter(car => car.car_name.toLowerCase().includes(searchTerm.toLowerCase())).map((car) => (
                            <Col key={car.vin}>
                                <CarCard car={car} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
            <div className="footer1 d-flex mt-2">
                <div style={{ fontSize: "10px", margin: 'auto' }}>
                    © 2024 Copyright: ITE 19 - Appraisal
                </div>
            </div>
        </>
    );
};

function CarCard({ car }) {
    const { car_name, price, image_path, stocks } = car;

    return (
        <div className="mb-4" style={{ height: '100%' }}>
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
                    <Card.Text>Price: {price}<br />Stocks: {stocks}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default DealerInventory;
