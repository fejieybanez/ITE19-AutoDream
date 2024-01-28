import { Table, Container, Row, Col, Card } from 'react-bootstrap';
import DealerNavbar from "./DealerNavbar.js";
import supabase from './SupabaseClient.js';
import { useState, useEffect, useCallback } from 'react';

function UserPurchase() {
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const dealer_name = localStorage.getItem('dealer_name');

    const fetchPurchaseHistory = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('dealer_sales')
                .select('*')
                .eq('dealer_name', dealer_name);

            if (error) {
                throw error;
            }
            setPurchaseHistory(data);
        } catch (error) {
            console.error('Error during fetching purchase history:', error.message);
        }
    }, [dealer_name]);

    useEffect(() => {
        fetchPurchaseHistory();
    }, [fetchPurchaseHistory]);

    return (
        <>
            <DealerNavbar />
            <Container className='mt-5'>
                <Row>
                    {purchaseHistory.map((purchase, index) => (
                        <Col key={index} md={4} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={purchase.image_path} />
                                <Card.Body>
                                    <Card.Title>{purchase.car_name}</Card.Title>
                                    <Card.Text>
                                        <strong>Customer:</strong> {purchase.user_name} <br />
                                        <strong>Color:</strong> {purchase.car_color} <br />
                                        <strong>Engine:</strong> {purchase.car_engine} <br />
                                        <strong>Price:</strong> {purchase.car_price} <br />
                                        <strong>Style:</strong> {purchase.car_style} <br />
                                        <strong>Transmission:</strong> {purchase.transmission_type} <br />
                                        <strong>VIN:</strong> {purchase.VIN} <br />
                                        <strong>Date of Purchase:</strong> {purchase.created_at}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default UserPurchase;
