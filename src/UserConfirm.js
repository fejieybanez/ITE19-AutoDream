import { useState } from 'react';
import supabase from './SupabaseClient.js';
import UserNavbar from './UserNavbar.js';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, FloatingLabel } from 'react-bootstrap';

const colorOptions = ['Red', 'White', 'Black']; 

function BuyNow() {
    const [error, setError] = useState(null);
    const [carColor, setCarColor] = useState('');
    const [carEngine, setCarEngine] = useState('');
    const [transmissionType, setTransmissionType] = useState('');
    const navigate = useNavigate();

    const user_name = localStorage.getItem('user_name');
    const car_name = localStorage.getItem('car_name');
    const car_style = localStorage.getItem('car_style');
    const car_price = localStorage.getItem('price');
    const image_path = localStorage.getItem('image_path');
    const VIN = localStorage.getItem('VIN');
    const dealer_name = localStorage.getItem('dealer_name');

    const deduct = async () => {
        const car_name = localStorage.getItem('car_name');
        const { data } = await supabase
            .from('dealer_inventory1')
            .select('*')
            .eq('car_name', car_name)
            .single();

        console.log(data);
        const newstocks = data.stocks;
        localStorage.setItem('newstocks', newstocks);

        try {
            const deductedstocks = localStorage.getItem('newstocks');
            let newStocks = parseInt(deductedstocks) - 1;
            const { data } = await supabase
                .from('dealer_inventory1')
                .update({ 'stocks': newStocks })
                .eq('car_name', car_name);
            console.log(data);
            buyconfirm();
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const buyconfirm = async () => {
        try {
            const { data } = await supabase
                .from('user_purchase')
                .insert([
                    {
                        user_name,
                        car_name,
                        car_style,
                        car_price,
                        image_path,
                        car_color: carColor,
                        car_engine: carEngine,
                        transmission_type: transmissionType,
                        VIN,
                    },
                ])
                .select();

            console.log(data);
            alert('Order Successful');
            dealersales();
            navigate('/userpurchase');
        } catch (error) {
            console.error('Error during login:', error.message);
            setError(error.message);
        }
    };

    const dealersales = async () => {
        try {
            const { data } = await supabase
                .from('dealer_sales')
                .insert([
                    {
                        dealer_name,
                        user_name,
                        car_name,
                        car_style,
                        car_price,
                        image_path,
                        car_color: carColor,
                        car_engine: carEngine,
                        transmission_type: transmissionType,
                        VIN,
                    },
                ])
                .select();

            console.log(data);
        } catch (error) {
            console.error('Error during login:', error.message);
            setError(error.message);
        }
    };

    return (
        <>
          <UserNavbar />
          <Container className='mt-5'>
            <Card className='mt-5' style={{
              boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
              padding: '20px 20px',
              backgroundColor: 'lightblue', 
            }}>
              <Row>
                <Col>
                  <Card.Img src={image_path} />
                  <Card.Title className="mt-3">{car_style}</Card.Title><br />
                </Col>
                <Col>
                  <div>
                    <Card.Title className="mt-3">{car_name}</Card.Title>
                    <Card.Title className="mt-1">₱{car_price}</Card.Title><br />
                    <Card.Text>
                      <Row>
                        <Col>
                          <p>Available Colors:</p>
                          <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-start' }}>
                            {colorOptions.map((color, index) => (
                              <div
                                key={index}
                                onClick={() => setCarColor(color)}
                                style={{
                                  backgroundColor: color.toLowerCase(),
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  cursor: 'pointer',
                                  border: `2px solid ${carColor === color ? 'orange' : 'transparent'}`,
                                }}
                              />
                            ))}
                          </div>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <FloatingLabel controlId="floatingSelectGrid" label="Car Engine : ">
                            <Form.Select value={carEngine} onChange={(e) => setCarEngine(e.target.value)} aria-label="Floating label select example">
                              <option value="v4">v4</option>
                              <option value="v6">v6</option>
                              <option value="v8">v8</option>
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <FloatingLabel
                            controlId="floatingSelectGrid"
                            label="Transmission Type : "
                          >
                            <Form.Select value={transmissionType} onChange={(e) => setTransmissionType(e.target.value)} aria-label="Floating label select example">
                              <option value="Automatic">Automatic</option>
                              <option value="Manual">Manual</option>
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                      </Row>
                    </Card.Text>
    
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Button
                        variant="warning"
                        className="check-out w-50"
                        onClick={deduct}
                        style={{ height: "55px" }}
                      >
                        Buy Now
                      </Button>
                    </div>
                    {error && <p>{error}</p>}
                  </div>
                </Col>
              </Row>
            </Card>
          </Container>
          <div className="footer1 d-flex">
            <div style={{ fontSize: "10px" }} className='mt-2'>
              © 2024 Copyright: Auto Dream
            </div>
          </div>
        </>
      );
    }
    
    export default BuyNow;