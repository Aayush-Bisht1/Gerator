import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDevices = createAsyncThunk('devices/fetchDevices', async (params = {}) => {
  const queryParams = new URLSearchParams();
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      if (Array.isArray(params[key])) {
        params[key].forEach(value => queryParams.append(key, value));
      } else {
        queryParams.append(key, params[key]);
      }
    }
  });

  const response = await fetch(`http://localhost:3000/api/devices?${queryParams.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch devices');
  return response.json();
});

const initialState = {
  devices: [],
  loading: false,
  error: null,
  pagination: { currentPage: 1, totalPages: 0, totalItems: 0, itemsPerPage: 12, hasNextPage: false, hasPrevPage: false },
  filters: { searchQuery: '', priceRange: [0, 1000000], selectedTransactionTypes: [], selectedSellers: [], selectedWarranties: [], selectedShipping: [], selectedStatuses: [], selectedLocations: [], sortBy: 'datePosted' }
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
      state.pagination.currentPage = 1;
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
      state.pagination.currentPage = 1;
    },
    toggleTransactionType: (state, action) => {
      const type = action.payload;
      if (state.filters.selectedTransactionTypes.includes(type)) {
        state.filters.selectedTransactionTypes = state.filters.selectedTransactionTypes.filter(t => t !== type);
      } else {
        state.filters.selectedTransactionTypes.push(type);
      }
      state.pagination.currentPage = 1;
    },
    toggleSeller: (state, action) => {
      const seller = action.payload;
      if (state.filters.selectedSellers.includes(seller)) {
        state.filters.selectedSellers = state.filters.selectedSellers.filter(s => s !== seller);
      } else {
        state.filters.selectedSellers.push(seller);
      }
      state.pagination.currentPage = 1;
    },
    toggleWarranty: (state, action) => {
      const warranty = action.payload;
      if (state.filters.selectedWarranties.includes(warranty)) {
        state.filters.selectedWarranties = state.filters.selectedWarranties.filter(w => w !== warranty);
      } else {
        state.filters.selectedWarranties.push(warranty);
      }
      state.pagination.currentPage = 1;
    },
    toggleShipping: (state, action) => {
      const shipping = action.payload;
      if (state.filters.selectedShipping.includes(shipping)) {
        state.filters.selectedShipping = state.filters.selectedShipping.filter(s => s !== shipping);
      } else {
        state.filters.selectedShipping.push(shipping);
      }
      state.pagination.currentPage = 1;
    },
    toggleStatus: (state, action) => {
      const status = action.payload;
      if (state.filters.selectedStatuses.includes(status)) {
        state.filters.selectedStatuses = state.filters.selectedStatuses.filter(s => s !== status);
      } else {
        state.filters.selectedStatuses.push(status);
      }
      state.pagination.currentPage = 1;
    },
    setLocations: (state, action) => {
      state.filters.selectedLocations = action.payload;
      state.pagination.currentPage = 1;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
      state.pagination.currentPage = 1;
    },
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.filters.searchQuery = '';
      state.filters.priceRange = [0, 1000000];
      state.filters.selectedTransactionTypes = [];
      state.filters.selectedSellers = [];
      state.filters.selectedWarranties = [];
      state.filters.selectedShipping = [];
      state.filters.selectedStatuses = [];
      state.filters.selectedLocations = [];
      state.filters.sortBy = 'datePosted';
      state.pagination.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload.devices;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, setPriceRange, toggleTransactionType, toggleSeller, toggleWarranty, toggleShipping, toggleStatus, setLocations, setSortBy, setPage, resetFilters } = devicesSlice.actions;
export default devicesSlice.reducer;