import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useLocation } from 'react-router-dom';

const PaymentSuccessPage = () => {
    const location = useLocation();
  const { orderId, courseName, amount } = location.state || {};
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <Card className="w-full max-w-lg shadow-lg border border-gray-200">
        <CardHeader className="flex flex-col items-center text-center">
          <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700">Payment Successful!</h1>
          <p className="text-sm text-gray-500">
            Thank you for your purchase. You are now enrolled in the course.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Transaction Details */}
          <div className="bg-gray-100 rounded-md p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Transaction Details</h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Order ID:</span> {orderId || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Course Name:</span> {courseName || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Amount Paid:</span> ₹{amount 
              || 'N/A'}
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-green-100 rounded-md p-4">
            <h2 className="text-lg font-semibold text-green-700 mb-2">What’s Next?</h2>
            <p className="text-sm text-green-600">
              Start learning immediately by accessing the course from your dashboard.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          {/* Call to Action Buttons */}
          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
            Go to My Courses
          </Button>
          <Button className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200">
            View Invoice
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Example usage with dummy data


export default PaymentSuccessPage
