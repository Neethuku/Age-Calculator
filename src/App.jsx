import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  const handleCalculate = () => {
    if (!birthDate) return;

    const today = new Date();
    const birth = new Date(birthDate);

    if (birth > today) {
      setErrorMessage('Please select a valid birth date (not in the future).');
      setAge(null);
      return;
    } else {
      setErrorMessage('');
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();


    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  const handleReset = () => {
    setBirthDate('');
    setAge(null);
  };

  return (
    <>
      <div className="row h-100 w-100 d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-2"></div>
        <div className="col-8 d-flex align-items-center justify-content-center">
          <Card style={{ width: '30rem' }} className="d-flex align-items-center justify-content-center card">
            <h3 className="mt-3 fw-bold" style={{ letterSpacing: '2px', color: 'white' }}>
              AGE CALCULATOR
            </h3>
            <Card.Body>
              <Form.Control
                required
                type="date"
                style={{ width: '240px', marginTop: '-10px' }}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
              <Button 
              className="mt-3 w-100 calculate-btn" 
              onClick={handleCalculate}>
                Calculate
              </Button>
              <Button 
              variant="outline-primary" 
              className="mt-3 w-100 reset-btn" 
              onClick={handleReset}>
                Reset
              </Button>
            </Card.Body>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {age && (
              <p style={{ color: 'white' }}>
                You are {age.years} years, {age.months} months, and {age.days} days old
              </p>
            )}
          </Card>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
}

export default App;