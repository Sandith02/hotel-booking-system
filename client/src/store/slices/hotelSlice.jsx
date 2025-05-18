import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

// Mock data for development (we'll replace with API calls later)
const mockHotels = [
  {
    id: '1',
    name: 'Cinnamon Grand Colombo',
    location: 'Colombo',
    rating: 4.8,
    price: 150,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Luxury hotel in the heart of Colombo with stunning views of the Indian Ocean.',
  },
  {
    id: '2',
    name: 'Amaya Hills',
    location: 'Kandy',
    rating: 4.6,
    price: 120,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Nestled in the hills of Kandy, offering a serene escape with cultural experiences.',
  },
  {
    id: '3',
    name: 'Jetwing Lighthouse',
    location: 'Galle',
    rating: 4.7,
    price: 180,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
    description: 'Colonial-style beachfront hotel with stunning views of the Indian Ocean.',
  },
  {
    id: '4',
    name: 'Heritance Tea Factory',
    location: 'Nuwara Eliya',
    rating: 4.5,
    price: 140,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Converted tea factory in the heart of Sri Lanka\'s tea country with panoramic mountain views.',
  },
];

// Create the hotel slice
const hotelSlice = createSlice({
  name: 'hotels',
  initialState: {
    searchParams: {
      location: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
    },
  },
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
  },
});

// Export the actions
export const { setSearchParams } = hotelSlice.actions;

// Export the reducer
export default hotelSlice.reducer;

// Create API endpoints for hotels
export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query({
      // For now, return mock data
      queryFn: () => ({ data: mockHotels }),
      providesTags: ['Hotel'],
    }),
    getHotelById: builder.query({
      // For now, return mock data for the selected hotel
      queryFn: (id) => {
        const hotel = mockHotels.find(hotel => hotel.id === id);
        return { data: hotel || null };
      },
      providesTags: ['Hotel'],
    }),
    searchHotels: builder.query({
      // For now, filter mock data based on search params
      queryFn: (searchParams) => {
        let filteredHotels = [...mockHotels];
        
        if (searchParams.location) {
          filteredHotels = filteredHotels.filter(hotel => 
            hotel.location.toLowerCase().includes(searchParams.location.toLowerCase())
          );
        }
        
        return { data: filteredHotels };
      },
      providesTags: ['Hotel'],
    }),
  }),
});

// Export the hooks
export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useSearchHotelsQuery,
} = hotelApiSlice;