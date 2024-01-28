import { useState } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup, FloatingLabel, Spinner } from "react-bootstrap";
import { FaCubes, FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import supabase from './SupabaseClient.js';
import { useNavigate } from 'react-router-dom';
import './App.css'

function Login() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('customer');
    const navigate = useNavigate();

    const validateUser = async () => {
        try {
            const tableName = userType === 'customer' ? 'user' : 'dealer';

            const { data } = await supabase
                .from(tableName)
                .select('*')
                .eq('email', email)
                .single();

            if (data && data.password === password) {
                const nameKey = userType === 'customer' ? 'user_name' : 'dealer_name';
                const name = data[nameKey];
                localStorage.setItem(nameKey, name);

                const route = userType === 'customer' ? '/userhome' : '/dealerhome';
                navigate(route);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        validateUser();
        setLoading(true);
    };
      
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Card className="p-4" style={{ background: 'linear-gradient(black, gray)', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, .1)' }}>
            <Row>
              <Col md='12'>
                <Card.Body className='d-flex flex-column'>
                  <div className='d-flex flex-row text-center'>
                    <span className="h1 fw-bold mb-0" style={{ color: 'white' }}>Login</span>
                  </div>
                  <h5 className="my-4 pb-3" style={{ letterSpacing: '1px', color: 'white' }}>Sign into your account</h5>
                  <Row className="mb-3">
                    <Col md="6">
                      <Button
                        variant={userType === 'customer' ? 'orange' : 'outline-orange'}
                        onClick={() => setUserType('customer')}
                        style={{
                          width: '100%',
                          color: userType === 'customer' ? 'white' : 'orange',
                          borderColor: userType === 'customer' ? 'orange' : 'white',
                          backgroundColor: userType === 'customer' ? 'orange' : 'transparent',
                        }}
                      >
                        Customer
                      </Button>
                    </Col>
                    <Col md="6">
                      <Button
                        variant={userType === 'dealer' ? 'orange' : 'outline-orange'}
                        onClick={() => setUserType('dealer')}
                        style={{
                          width: '100%',
                          color: userType === 'dealer' ? 'white' : 'orange',
                          borderColor: userType === 'dealer' ? 'orange' : 'white',
                          backgroundColor: userType === 'dealer' ? 'orange' : 'transparent',
                        }}
                      >
                        Dealer
                      </Button>
                    </Col>
                  </Row>
                  <Form onSubmit={handleClick}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1"><FaUserAlt /></InputGroup.Text>
                      <FloatingLabel label="Email">
                        <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                      </FloatingLabel>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1"><RiLockPasswordFill /></InputGroup.Text>
                      <FloatingLabel label="Password">
                        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                      </FloatingLabel>
                    </InputGroup>
                    <Row className="g-2">
                      <Col>
                        <Button
                          type="submit"
                          variant="orange"
                          style={{
                            width: '100%',
                            height: '57px',
                            backgroundColor: 'orange',
                            borderColor: 'orange',
                          }}
                          className="login-button"
                        >
                          {loading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              Loading...
                            </>
                          ) : "Login"}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      );
}
export default Login;
