const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { auth, adminAuth } = require('../middleware/auth');

// Get all bookings (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('user', 'name email')
      .populate('room', 'roomNumber type');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('room', 'roomNumber type price');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new booking
router.post('/', auth, async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, specialRequests } = req.body;

    // Validate required fields
    if (!roomId || !checkIn || !checkOut) {
      return res.status(400).json({ 
        message: 'Missing required fields: roomId, checkIn, and checkOut are required' 
      });
    }

    // Check if room exists and is available
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    if (!room.isAvailable) {
      return res.status(400).json({ message: 'Room is not available' });
    }

    // Calculate total price
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * nights;

    // Create booking
    const booking = new Booking({
      user: req.user._id,
      room: roomId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice,
      specialRequests,
      status: 'confirmed',
      paymentStatus: 'paid'
    });

    await booking.save();

    // Update room availability
    room.isAvailable = false;
    await room.save();

    // Populate the booking with room details before sending response
    const populatedBooking = await Booking.findById(booking._id)
      .populate('room', 'roomNumber type price');

    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(400).json({ 
      message: 'Failed to create booking',
      error: error.message 
    });
  }
});

// Update booking status (admin only)
router.patch('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    // If booking is cancelled, make room available again
    if (status === 'cancelled') {
      const room = await Room.findById(booking.room);
      if (room) {
        room.isAvailable = true;
        await room.save();
      }
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Process checkout (admin only)
router.patch('/:id/checkout', adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if booking is in a valid state for checkout
    if (booking.status !== 'confirmed') {
      return res.status(400).json({ message: 'Only confirmed bookings can be checked out' });
    }

    // Update booking status to completed
    booking.status = 'completed';
    booking.checkoutDate = new Date();
    await booking.save();

    // Make room available again
    const room = await Room.findById(booking.room);
    if (room) {
      room.isAvailable = true;
      await room.save();
    }

    res.json({
      message: 'Checkout processed successfully',
      booking: booking
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ 
      message: 'Failed to process checkout',
      error: error.message 
    });
  }
});

// Update payment status (admin only)
router.patch('/:id/payment', adminAuth, async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Validate payment status
    if (!['paid', 'pending', 'refunded'].includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    // Update payment status
    booking.paymentStatus = paymentStatus;
    await booking.save();

    res.json({
      message: 'Payment status updated successfully',
      booking: booking
    });
  } catch (error) {
    console.error('Payment status update error:', error);
    res.status(500).json({ 
      message: 'Failed to update payment status',
      error: error.message 
    });
  }
});

// Cancel booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns the booking or is admin
    if (booking.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    // Check if booking can be cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel a completed booking' });
    }

    // Update room availability
    const room = await Room.findById(booking.room);
    if (room) {
      room.isAvailable = true;
      await room.save();
    }

    // Update booking status instead of deleting
    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    res.json({ 
      message: 'Booking cancelled successfully',
      booking: booking
    });
  } catch (error) {
    console.error('Booking cancellation error:', error);
    res.status(500).json({ 
      message: 'Failed to cancel booking',
      error: error.message 
    });
  }
});

module.exports = router; 