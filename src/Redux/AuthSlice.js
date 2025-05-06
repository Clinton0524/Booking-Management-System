import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  const { username, password } = credentials;
  try {
    const res = await fetch('https://cors-anywhere.herokuapp.com/https://restful-booker.herokuapp.com/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      // Handle the error if response is not OK
      throw new Error(`Request failed with status: ${res.status}`);
    }

    const data = await res.json();
    // Ensure the token is returned
    if (data.token) {
      localStorage.setItem('token', data.token);
      return data.token;
    } else {
      throw new Error('No token received from API');
    }
  } catch (err) {
    console.error('Error during login:', err);  // Log the full error for debugging
    return rejectWithValue(err.message || 'Unknown error');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    error: '',
    loading: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
