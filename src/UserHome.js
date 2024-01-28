import './App.css';
import { useState } from 'react';
import UserNavbar from './UserNavbar.js';
import { Container, Button, Spinner } from 'react-bootstrap';

function UserHome() {
  const [loadingCarList, setLoadingCarList] = useState(false);
  const [loadingPurchases, setLoadingPurchases] = useState(false);
  const [carListButtonClicked, setCarListButtonClicked] = useState(false);
  const [purchasesButtonClicked, setPurchasesButtonClicked] = useState(false);

  const handleCarListClick = () => {
    setLoadingCarList(true);
    setCarListButtonClicked(true);
  };

  const handlePurchasesClick = () => {
    setLoadingPurchases(true);
    setPurchasesButtonClicked(true);
  };

  return (
    <>
      <UserNavbar />
      <section className="user-home-section">
        <Container className="info-container">
          <div className="info">
            <h1 style={{ textAlign: 'justify' }}>
              <span style={{ color: `#ff8800`, fontSize: '60px' }}>Fuel Your Fantasies.</span> <br />
              Welcome to AutoDream where the road to your dream car starts now! <br />
              <Button
                onClick={handleCarListClick}
                style={{
                  backgroundColor: carListButtonClicked ? '#ff8800' : '#ff8800',
                  borderColor: '#ff8800',
                  borderRadius: '20px', 
                }}
                className="mt-4 me-3 p-2"
                href="/userproducts"
              >
                {loadingCarList ? (
                  <>
                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    Loading...
                  </>
                ) : (
                  'Shop Now'
                )}
              </Button>
              <Button
                onClick={handlePurchasesClick}
                style={{
                  backgroundColor: purchasesButtonClicked ? '#ff8800' : 'transparent',
                  borderColor: '#ff8800',
                  color: '#343a40',
                  borderRadius: '20px',
                }}
                className="mt-4 p-2"
                href="/userpurchase"
              >
                {loadingPurchases ? (
                  <>
                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    Loading...
                  </>
                ) : (
                  'My Purchases'
                )}
              </Button>
            </h1>
          </div>
        </Container>
      </section>
      <div className="footer1 d-flex">
        <div style={{ fontSize: '10px' }} className="mt-2">
          © 2024 Copyright: AutoDream
        </div>
      </div>
    </>
  );
}

export default UserHome;

