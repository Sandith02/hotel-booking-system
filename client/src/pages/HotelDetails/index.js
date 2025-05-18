import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetHotelByIdQuery } from '../../store/slices/hotelSlice';

// Mock room data (we'll replace with API later)
const mockRooms = [
  {
    id: '101',
    name: 'Deluxe Room',
    price: 150,
    capacity: { adults: 2, children: 1 },
    size: 35,
    bedType: 'King',
    amenities: ['Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Coffee machine'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
  },
  {
    id: '102',
    name: 'Superior Room',
    price: 200,
    capacity: { adults: 2, children: 2 },
    size: 40,
    bedType: 'Queen',
    amenities: ['Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Coffee machine', 'Balcony'],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
  },
  {
    id: '103',
    name: 'Suite',
    price: 300,
    capacity: { adults: 4, children: 2 },
    size: 60,
    bedType: 'King + Sofa Bed',
    amenities: ['Free WiFi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'Coffee machine', 'Balcony', 'Living area', 'Bathtub'],
    image: 'https://images.unsplash.com/photo-1576675784201-0e142b423952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
  },
];

const HotelDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: hotel, isLoading, isError } = useGetHotelByIdQuery(id);
  
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: '',
    checkOut: '',
    guests: { adults: 2, children: 0 },
    roomId: '',
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleGuestChange = (type, value) => {
    setBookingDetails(prev => ({
      ...prev,
      guests: {
        ...prev.guests,
        [type]: parseInt(value),
      },
    }));
  };
  
  const handleRoomSelect = (roomId) => {
    setBookingDetails(prev => ({
      ...prev,
      roomId,
    }));
  };
  
  const handleBooking = () => {
    // In a real app, we'd dispatch a booking action here
    // For now, just show an alert
    alert(`Booking confirmed for ${hotel?.name}!`);
    navigate('/');
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (isError || !hotel) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Hotel Not Found</h2>
        <p className="text-gray-600 mb-6">The hotel you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Image */}
      <div className="h-[400px] bg-gray-300 relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{hotel.name}</h1>
            <p className="text-xl">{hotel.location}</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap md:flex-nowrap">
          {/* Hotel Details */}
          <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Hotel</h2>
              <p className="text-gray-700 mb-6">{hotel.description}</p>
              
              <div className="flex items-center mb-6">
                <span className="bg-primary text-white font-semibold px-2 py-1 rounded text-sm mr-2">
                  {hotel.rating}
                </span>
                <span className="text-gray-700 font-medium">Excellent</span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Hotel Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Swimming Pool
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Spa
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Fitness Center
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Free WiFi
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Restaurant
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  24/7 Reception
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Available Rooms</h3>
              <div className="space-y-6">
                {mockRooms.map((room) => (
                  <div 
                    key={room.id} 
                    className={`border rounded-lg overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-md ${bookingDetails.roomId === room.id ? 'border-primary shadow-md' : ''}`}
                  >
                    <div className="md:w-1/3 h-48 md:h-auto bg-gray-200">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-2/3 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl font-bold mb-2">{room.name}</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                            {room.capacity.adults} Adults, {room.capacity.children} Children
                          </span>
                          <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                            {room.size} m²
                          </span>
                          <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                            {room.bedType}
                          </span>
                        </div>
                        <div className="mb-4">
                          <h5 className="font-medium mb-1">Amenities</h5>
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.map((amenity, index) => (
                              <span key={index} className="text-gray-600 text-sm">
                                • {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <div>
                          <span className="text-2xl font-bold text-primary">${room.price}</span>
                          <span className="text-gray-600 ml-1">per night</span>
                        </div>
                        <button 
                          onClick={() => handleRoomSelect(room.id)} 
                          className={`px-4 py-2 rounded transition-colors ${
                            bookingDetails.roomId === room.id 
                              ? 'bg-green-500 text-white' 
                              : 'bg-primary text-white hover:bg-primary-dark'
                          }`}
                        >
                          {bookingDetails.roomId === room.id ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <div className="h-[400px] bg-gray-200 mb-4 rounded">
                {/* Placeholder for map */}
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                  Map will be displayed here
                </div>
              </div>
              <p className="text-gray-700">{hotel.location}, Sri Lanka</p>
            </div>
          </div>
          
          {/* Booking Form */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-4">Book Your Stay</h2>
              
              <div className="mb-4">
                <label htmlFor="checkIn" className="block text-gray-700 text-sm font-medium mb-2">Check In</label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  className="input"
                  value={bookingDetails.checkIn}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="checkOut" className="block text-gray-700 text-sm font-medium mb-2">Check Out</label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  className="input"
                  value={bookingDetails.checkOut}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Guests</label>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="adults" className="block text-gray-700 text-sm mb-1">Adults</label>
                    <select
                      id="adults"
                      className="input"
                      value={bookingDetails.guests.adults}
                      onChange={(e) => handleGuestChange('adults', e.target.value)}
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="children" className="block text-gray-700 text-sm mb-1">Children</label>
                    <select
                      id="children"
                      className="input"
                      value={bookingDetails.guests.children}
                      onChange={(e) => handleGuestChange('children', e.target.value)}
                    >
                      {[0, 1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 my-6 pt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Room Price</span>
                  <span className="text-gray-800 font-medium">
                    ${bookingDetails.roomId 
                      ? mockRooms.find(room => room.id === bookingDetails.roomId)?.price || 0 
                      : 0}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="text-gray-800 font-medium">
                    ${bookingDetails.roomId 
                      ? Math.round((mockRooms.find(room => room.id === bookingDetails.roomId)?.price || 0) * 0.1) 
                      : 0}
                  </span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="text-gray-800 font-bold">Total</span>
                  <span className="text-gray-800 font-bold">
                    ${bookingDetails.roomId 
                      ? Math.round((mockRooms.find(room => room.id === bookingDetails.roomId)?.price || 0) * 1.1) 
                      : 0}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={handleBooking} 
                className="w-full btn btn-primary py-3 mt-4"
                disabled={!bookingDetails.checkIn || !bookingDetails.checkOut || !bookingDetails.roomId}
              >
                Book Now
              </button>
              
              <p className="text-gray-600 text-sm mt-4">
                You won't be charged yet. We'll reserve your room and confirm availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;