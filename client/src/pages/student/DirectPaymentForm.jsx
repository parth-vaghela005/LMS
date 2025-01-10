import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardFooter, CardContent } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

const DirectPaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  // For navigation
  const navigate = useNavigate();

  const handlePayment = async () => {
    setError(false);
    setMessage('');

    // Basic validations
    if (!userId || !courseId || !cardNumber || !expiryDate || !cvv || !amount) {
      setError(true);
      setMessage('All fields are required!');
      return;
    }

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      setError(true);
      setMessage('Card Number must be 16 digits.');
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setError(true);
      setMessage('Expiry Date must be in MM/YY format.');
      return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      setError(true);
      setMessage('CVV must be 3 digits.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/v1/auth/direct-payment', {
        userId,
        courseId,
        cardNumber,
        expiryDate,
        cvv,
        amount,
      });

      // On success, navigate to the PaymentSuccessPage
      navigate('/payment-success', {
        state: {
          orderId: response.data.orderId,
          courseName: courseId,
          amount:amount,
        },
      });
    } catch (error) {
      setError(true);
      setMessage(`Payment failed: ${error.response?.data?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-lg shadow-md">
        <CardHeader>
          <h1 className="text-xl font-semibold text-gray-700">Secure Payment</h1>
          <p className="text-sm text-gray-500">Complete your purchase by filling in the details below.</p>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className={`mb-4 ${error ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {message}
            </Alert>
          )}
          <div className="space-y-4">
            <div>
              <Label>User ID</Label>
              <Input
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div>
              <Label>Course ID</Label>
              <Input
                placeholder="Enter Course ID"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              />
            </div>
            <div>
              <Label>Card Number</Label>
              <Input
                placeholder="1234 5678 9012 3456"
                maxLength={16}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label>Expiry Date</Label>
                <Input
                  placeholder="MM/YY"
                  maxLength={5}
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value.replace(/[^0-9/]/g, ''))}
                />
              </div>
              <div className="flex-1">
                <Label>CVV</Label>
                <Input
                  placeholder="123"
                  maxLength={3}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>
            <div>
              <Label>Amount</Label>
              <Input
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <Button className="w-full" onClick={handlePayment} disabled={loading}>
              Pay Now
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default DirectPaymentForm;
