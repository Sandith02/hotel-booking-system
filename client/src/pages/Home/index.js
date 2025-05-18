import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Convert search params to query string
    const queryString = new URLSearchParams(searchParams).toString();
    navigate(`/hotels?${queryString}`);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Stay in Sri Lanka</h1>
            <p className="text-xl md:text-2xl mb-8">Discover the best hotels, resorts, and homestays across the island</p>
            
            {/* Search Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="location" className="block text-gray-700 text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Where are you going?"
                    className="input"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="checkIn" className="block text-gray-700 text-sm font-medium mb-2">Check In</label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    className="input"
                    value={searchParams.checkIn}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="checkOut" className="block text-gray-700 text-sm font-medium mb-2">Check Out</label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    className="input"
                    value={searchParams.checkOut}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-gray-700 text-sm font-medium mb-2">Guests</label>
                  <select
                    id="guests"
                    name="guests"
                    className="input"
                    value={searchParams.guests}
                    onChange={handleInputChange}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-4">
                  <button type="submit" className="w-full btn btn-primary py-3 text-lg">
                    Search Hotels
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Destinations Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations in Sri Lanka</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Colombo', 'Kandy', 'Galle', 'Nuwara Eliya'].map((city) => (
              <div key={city} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{city}</h3>
                  <p className="text-gray-600">Explore amazing stays</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SriStays</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Rates Guaranteed</h3>
              <p className="text-gray-600">Find the best deals and discounts on hotels across Sri Lanka.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Properties</h3>
              <p className="text-gray-600">We personally verify all hotels to ensure quality and comfort.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Customer Support</h3>
              <p className="text-gray-600">Our dedicated team is available anytime to assist you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;