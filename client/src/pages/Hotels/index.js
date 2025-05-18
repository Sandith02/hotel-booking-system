import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchHotelsQuery } from '../../store/slices/hotelSlice';
import { setSearchParams } from '../../store/slices/hotelSlice';
import { Link } from 'react-router-dom';

const HotelsPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Parse query params
  const queryParams = new URLSearchParams(location.search);
  const locationParam = queryParams.get('location') || '';
  const checkInParam = queryParams.get('checkIn') || '';
  const checkOutParam = queryParams.get('checkOut') || '';
  const guestsParam = queryParams.get('guests') || 1;
  
  // Set local state for the search form
  const [searchValues, setSearchValues] = useState({
    location: locationParam,
    checkIn: checkInParam,
    checkOut: checkOutParam,
    guests: guestsParam,
  });
  
  // Update Redux store with search params
  useEffect(() => {
    dispatch(setSearchParams(searchValues));
  }, [dispatch, searchValues]);
  
  // Get search results
  const { data: hotels, isLoading, isError } = useSearchHotelsQuery(searchValues);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // The query will re-run automatically when searchValues changes
  };
  
  // Filter controls
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    rating: 0,
  });
  
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const applyFilters = (hotels) => {
    if (!hotels) return [];
    
    return hotels.filter(hotel => {
      // Apply price filter
      if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) {
        return false;
      }
      
      // Apply rating filter
      if (hotel.rating < filters.rating) {
        return false;
      }
      
      return true;
    });
  };
  
  const filteredHotels = applyFilters(hotels);
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="location" className="block text-gray-700 text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Where are you going?"
                className="input"
                value={searchValues.location}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="checkIn" className="block text-gray-700 text-sm font-medium mb-2">Check In</label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                className="input"
                value={searchValues.checkIn}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="checkOut" className="block text-gray-700 text-sm font-medium mb-2">Check Out</label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                className="input"
                value={searchValues.checkOut}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="guests" className="block text-gray-700 text-sm font-medium mb-2">Guests</label>
              <select
                id="guests"
                name="guests"
                className="input"
                value={searchValues.guests}
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
              <button type="submit" className="w-full btn btn-primary py-3">
                Update Search
              </button>
            </div>
          </form>
        </div>
        
        <div className="flex flex-wrap md:flex-nowrap">
          {/* Filters */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0 md:mr-6">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">Price Range</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">${filters.priceRange[0]}</span>
                  <span className="text-gray-600">${filters.priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              {/* Rating */}
              <div>
                <h4 className="text-lg font-medium mb-2">Rating</h4>
                <div className="space-y-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input
                        type="radio"
                        id={`rating-${rating}`}
                        name="rating"
                        value={rating}
                        checked={filters.rating === rating}
                        onChange={() => handleFilterChange('rating', rating)}
                        className="mr-2"
                      />
                      <label htmlFor={`rating-${rating}`} className="text-gray-700">
                        {rating === 0 ? 'Any' : `${rating}+ stars`}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Hotel Listings */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {isLoading ? 'Loading hotels...' : 
                    filteredHotels?.length 
                      ? `${filteredHotels.length} Hotels Found` 
                      : 'No hotels found'}
                </h2>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Sort by:</span>
                  <select className="input py-1 px-2">
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : isError ? (
                <div className="text-center p-8 text-red-600">
                  An error occurred while fetching hotels. Please try again.
                </div>
              ) : filteredHotels?.length === 0 ? (
                <div className="text-center p-8 text-gray-600">
                  No hotels match your search criteria. Try adjusting your filters.
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredHotels.map((hotel) => (
                    <div key={hotel.id} className="border rounded-lg overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow">
                      <div className="md:w-1/3 h-48 md:h-auto bg-gray-200">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                            <div className="flex items-center">
                              <span className="bg-primary text-white font-semibold px-2 py-1 rounded text-sm mr-2">
                                {hotel.rating}
                              </span>
                              <span className="text-gray-600 text-sm">Excellent</span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">{hotel.location}</p>
                          <p className="text-gray-700">{hotel.description}</p>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <div>
                            <span className="text-2xl font-bold text-primary">${hotel.price}</span>
                            <span className="text-gray-600 ml-1">per night</span>
                          </div>
                          <Link to={`/hotels/${hotel.id}`} className="btn btn-primary">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;