import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all bookings
export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async () => {
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/https://restful-booker.herokuapp.com/booking"
    );
    if (!response.ok) {
      throw new Error("Error while fetching bookings");
    }
    return response.json();
  }
);
//create booking details
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://restful-booker.herokuapp.com/booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data; // The full booking object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch booking details by ID
export const fetchBookingById = createAsyncThunk(
  "booking/fetchBookingById",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://cors-anywhere.herokuapp.com/https://restful-booker.herokuapp.com/booking/${bookingId}`
      );
      if (!res.ok)
        throw new Error(`Failed to fetch booking with id ${bookingId}`);
      const data = await res.json();
      return { ...data, bookingid: bookingId }; // ⬅️ Add bookingid manually
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const BookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    selectedBooking: null,
    status: "idle",
    error: null,
  },
  reducers: {
    addBooking: (state, action) => {
      // Add new booking to the list of bookings
      state.bookings = [action.payload, ...state.bookings];
    },
  },
  extraReducers: (builder) => {
    // Handle fetchBookings async actions
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle fetchBookingById async actions
      .addCase(fetchBookingById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedBooking = action.payload; // Store selected booking details
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //createBooking  async actions
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings = [action.payload, ...state.bookings];
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.error = action.payload || "Failed to create booking";
      });
  },
});
export const { addBooking } = BookingSlice.actions;
export default BookingSlice.reducer;
