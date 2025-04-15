import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaArrowLeft, FaCheck, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const cardVariants = {
  hover: { scale: 1.03, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" },
  tap: { scale: 0.98 }
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

// Success animation variants
const successIconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  }
};

// Container stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const [bookingData, setBookingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    // Check if booking data was passed
    if (location.state?.bookingData) {
      setBookingData(location.state.bookingData);
    } else {
      navigate('/');
    }
  }, [isLoggedIn, navigate, location]);

  const calculateTotal = () => {
    if (!bookingData) return 0;
    
    const nights = Math.round(
      (new Date(bookingData.checkOutDate) - new Date(bookingData.checkInDate)) / (1000 * 60 * 60 * 24)
    );
    
    const roomTotal = bookingData.roomPrice * nights;
    const tax = roomTotal * 0.18; // 18% tax
    const serviceCharge = 200; // Fixed service charge
    
    return {
      roomTotal,
      tax,
      serviceCharge,
      grandTotal: roomTotal + tax + serviceCharge
    };
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setError('');
  };

  const validateCreditCardForm = () => {
    if (!cardNumber.trim()) {
      setError('Card number is required');
      return false;
    }
    if (!cardName.trim()) {
      setError('Cardholder name is required');
      return false;
    }
    if (!cardExpiry.trim()) {
      setError('Expiry date is required');
      return false;
    }
    if (!cardCVV.trim()) {
      setError('CVV is required');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'credit-card' && !validateCreditCardForm()) {
      return;
    }
    
    setError('');
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentComplete(true);
      
      // In a real app, you would send booking details to the server here
    }, 2000);
  };

  const handleBookingComplete = () => {
    navigate('/bookings');
  };

  if (!bookingData) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  const { roomTotal, tax, serviceCharge, grandTotal } = calculateTotal();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <motion.button
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back
        </motion.button>

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-8"
        >
          Checkout
        </motion.h1>

        {isPaymentComplete ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-md p-8 mb-8 text-center"
          >
            <motion.div 
              className="flex justify-center mb-4"
              variants={successIconVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-green-100 rounded-full p-4">
                <FaCheck className="text-green-500 text-4xl" />
              </div>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold text-green-600 mb-2"
            >
              Payment Successful!
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg mb-6">
              Your booking has been confirmed. Thank you for choosing our hotel.
            </motion.p>
            <motion.p variants={itemVariants} className="mb-6">
              A confirmation email has been sent to your email address.
            </motion.p>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleBookingComplete}
              className="bg-custom-bg text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors btn-animate"
            >
              View My Bookings
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="bg-white rounded-lg shadow-md p-6 mb-6 hover-lift"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              >
                <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 pb-4 border-b">
                  <div>
                    <h3 className="font-semibold text-lg">{bookingData.roomName}</h3>
                    <p className="text-gray-600">
                      {formatDate(bookingData.checkInDate)} - {formatDate(bookingData.checkOutDate)}
                    </p>
                  </div>
                  <p className="text-lg font-medium">
                    ₹{bookingData.roomPrice} <span className="text-sm font-normal">per night</span>
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between py-2">
                    <span>Guests:</span>
                    <span>{bookingData.adult} Adult{bookingData.adult !== 1 ? 's' : ''}, {bookingData.children} Child{bookingData.children !== 1 ? 'ren' : ''}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white rounded-lg shadow-md p-6 hover-lift"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <motion.button
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={`p-4 border rounded-md flex flex-col items-center justify-center ${
                      paymentMethod === 'credit-card' ? 'border-custom-bg bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => handlePaymentMethodChange('credit-card')}
                  >
                    <FaCreditCard className="text-2xl mb-2" />
                    <span>Credit Card</span>
                  </motion.button>
                  <motion.button
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={`p-4 border rounded-md flex flex-col items-center justify-center ${
                      paymentMethod === 'paypal' ? 'border-custom-bg bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => handlePaymentMethodChange('paypal')}
                  >
                    <FaPaypal className="text-2xl mb-2" />
                    <span>PayPal</span>
                  </motion.button>
                  <motion.button
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={`p-4 border rounded-md flex flex-col items-center justify-center ${
                      paymentMethod === 'pay-at-hotel' ? 'border-custom-bg bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => handlePaymentMethodChange('pay-at-hotel')}
                  >
                    <FaMoneyBillWave className="text-2xl mb-2" />
                    <span>Pay at Hotel</span>
                  </motion.button>
                </div>

                {paymentMethod === 'credit-card' && (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Card Number</label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-bg input-animate"
                        maxLength="19"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Cardholder Name</label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-bg input-animate"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Expiry Date</label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-bg input-animate"
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">CVV</label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="text"
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                          placeholder="123"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-bg input-animate"
                          maxLength="3"
                        />
                      </div>
                    </div>
                  </motion.form>
                )}

                {paymentMethod === 'paypal' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-50 rounded-md text-center"
                  >
                    <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                  </motion.div>
                )}

                {paymentMethod === 'pay-at-hotel' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-50 rounded-md"
                  >
                    <p className="mb-2">Pay directly at the hotel during check-in.</p>
                    <p className="text-sm text-gray-600">Note: Please arrive with valid ID and the payment card used for booking.</p>
                  </motion.div>
                )}

                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 mt-4"
                  >
                    {error}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>

            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div 
                className="bg-white rounded-lg shadow-md p-6 sticky top-24 hover-lift"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              >
                <h2 className="text-xl font-semibold mb-4">Price Details</h2>
                
                <motion.div className="space-y-3 mb-6 pb-6 border-b">
                  <motion.div 
                    className="flex justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span>Room Charges</span>
                    <span>₹{roomTotal.toFixed(2)}</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span>Tax (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span>Service Charge</span>
                    <span>₹{serviceCharge.toFixed(2)}</span>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="flex justify-between font-bold text-lg mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </motion.div>
                
                <motion.button
                  whileHover={!isProcessing ? { scale: 1.05 } : {}}
                  whileTap={!isProcessing ? { scale: 0.95 } : {}}
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-custom-bg text-white py-3 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed btn-animate"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" /> Processing...
                    </span>
                  ) : (
                    'Confirm Booking'
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Checkout; 