import { Card, Container } from 'react-bootstrap';
import DealerNavbar from "./DealerNavbar.js";
import supabase from './SupabaseClient.js';
import { useState, useEffect, useCallback } from 'react';

function DealerPurchase() {
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
                <Card>
                    <Card.Body>
                        <Card.Title>Sold Cars</Card.Title>
                        {purchaseHistory.map((purchase, index) => (
                            <div key={index} className="border-bottom mb-3">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p><strong>Car Name:</strong> {purchase.car_name}</p>
                                        <p><strong>Customer:</strong> {purchase.user_name}</p>
                                        <p><strong>Color:</strong> {purchase.car_color}</p>
                                        <p><strong>Engine:</strong> {purchase.car_engine}</p>
                                        <p><strong>Price:</strong> ₱{purchase.car_price}</p>
                                        <p><strong>Style:</strong> {purchase.car_style}</p>
                                        <p><strong>Transmission:</strong> {purchase.transmission_type}</p>
                                        <p><strong>VIN:</strong> {purchase.VIN}</p>
                                        <p><strong>Date of Purchase:</strong> {purchase.created_at}</p>
                                    </div>
                                    <div>
                                        <img
                                            src={purchase.image_path}
                                            alt={purchase.car_name}
                                            style={{ width: '400px', height: 'auto' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default DealerPurchase;
