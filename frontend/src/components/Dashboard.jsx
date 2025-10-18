import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDevices,
    setSearchQuery,
    setPriceRange,
    toggleTransactionType,
    toggleSeller,
    toggleWarranty,
    toggleShipping,
    toggleStatus,
    setLocations,
    setSortBy,
    setPage,
    resetFilters
} from '../redux/devicesSlice';
import { logout } from '../redux/authSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { devices, loading, error, pagination, filters } = useSelector(state => state.devices);
    
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    useEffect(() => {
        const params = {
            page: pagination.currentPage,
            limit: pagination.itemsPerPage,
            sortBy: filters.sortBy,
            minPrice: filters.priceRange[0],
            maxPrice: filters.priceRange[1],
        };

        if (filters.searchQuery) params.search = filters.searchQuery;
        if (filters.selectedTransactionTypes.length > 0) params.transactionType = filters.selectedTransactionTypes[0];
        if (filters.selectedSellers.length > 0) params.sellerRole = filters.selectedSellers[0];
        if (filters.selectedWarranties.length > 0) params.warranty = filters.selectedWarranties[0];
        if (filters.selectedShipping.length > 0) params.shipping = filters.selectedShipping[0];
        if (filters.selectedStatuses.length > 0) params.deviceStatus = filters.selectedStatuses[0];
        if (filters.selectedLocations.length > 0) params.location = filters.selectedLocations[0];

        dispatch(fetchDevices(params));
    }, [dispatch, pagination.currentPage, filters]);

    const toggleFilter = (arr, action, val) => {
        dispatch(action(val));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage));
    };

    const filterSections = [
        { title: 'Transaction Type', items: ['sale', 'rent', 'exchange'], selected: filters.selectedTransactionTypes, toggle: (v) => toggleFilter(filters.selectedTransactionTypes, toggleTransactionType, v) },
        { title: 'Seller Type', items: ['manufacturer', 'owner', 'agent', 'distributor'], selected: filters.selectedSellers, toggle: (v) => toggleFilter(filters.selectedSellers, toggleSeller, v) },
        { title: 'Warranty', items: ['yes', 'no', 'included_in_price'], selected: filters.selectedWarranties, toggle: (v) => toggleFilter(filters.selectedWarranties, toggleWarranty, v) },
        { title: 'Shipping', items: ['yes', 'no', 'contact_for_shipping'], selected: filters.selectedShipping, toggle: (v) => toggleFilter(filters.selectedShipping, toggleShipping, v) },
        { title: 'Status', items: ['new', 'used', 'used_partially_refurbished', 'used_deinstalled', 'used_installed', 'used_fully_refurbished', 'surplus'], selected: filters.selectedStatuses, toggle: (v) => toggleFilter(filters.selectedStatuses, toggleStatus, v) }
    ];

    const sortOpts = [
        { value: 'datePosted', label: 'Recently Posted' },
        { value: 'priceLow', label: 'Price: Low to High' },
        { value: 'priceHigh', label: 'Price: High to Low' }
    ];

    const formatLabel = (str) => {
        return str.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    const renderPagination = () => {
        if (pagination.totalPages <= 1) return null;

        const pages = [];
        const maxVisiblePages = 5;
        const startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    style={{
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        background: pagination.currentPage === i ? '#7c3aed' : 'white',
                        color: pagination.currentPage === i ? 'white' : '#333',
                        borderRadius: 4,
                        cursor: 'pointer',
                        margin: '0 2px'
                    }}
                >
                    {i}
                </button>
            );
        }

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    style={{
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        background: pagination.hasPrevPage ? 'white' : '#f5f5f5',
                        color: pagination.hasPrevPage ? '#333' : '#999',
                        borderRadius: 4,
                        cursor: pagination.hasPrevPage ? 'pointer' : 'not-allowed'
                    }}
                >
                    Previous
                </button>
                {pages}
                <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    style={{
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        background: pagination.hasNextPage ? 'white' : '#f5f5f5',
                        color: pagination.hasNextPage ? '#333' : '#999',
                        borderRadius: 4,
                        cursor: pagination.hasNextPage ? 'pointer' : 'not-allowed'
                    }}
                >
                    Next
                </button>
            </div>
        );
    };

    return (
        <div style={{ minHeight: '100vh', width: '100%', background: '#f5f5f5' }}>
            <header style={{ position: 'sticky', top: 0, background: 'white', borderBottom: '1px solid #ddd', zIndex: 100 }}>
                <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', padding: '0 16px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>DeviceMarket</h1>
                        <nav style={{ display: 'flex', gap: 8 }}>
                            <button style={{ padding: '6px 12px', border: 'none', background: 'none', cursor: 'pointer', color: '#111' }}>Buy</button>
                            <button style={{ padding: '6px 12px', border: 'none', background: 'none', cursor: 'pointer', color: '#111' }}>Jobs</button>
                        </nav>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <input
                            type="search"
                            placeholder="Search..."
                            value={filters.searchQuery}
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                            style={{ padding: '6px 12px', border: '1px solid #ddd', borderRadius: 4, width: 300, fontSize: 14, height: 35, outline: 'none' }}
                        />
                        <button style={{ padding: '6px 16px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: '14px', height: 35, marginRight: 10 }}>Sell</button>
                        <button 
                            onClick={() => dispatch(logout())}
                            style={{ padding: '6px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: '14px', height: 35, marginRight: 20 }}
                        >Logout</button>
                    </div>
                </div>
            </header>

            <main style={{ display: 'flex', width: '100%', maxWidth: '100%', margin: '0' }}>
                {filterOpen && (
                    <div onClick={() => setFilterOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40 }} />
                )}

                <aside style={{ width: 300, background: 'white', borderRight: '1px solid #ddd', height: 'calc(100vh - 60px)', position: filterOpen ? 'fixed' : 'sticky', top: filterOpen ? 0 : 60, left: filterOpen ? 0 : 'auto', zIndex: filterOpen ? 50 : 1, overflowY: 'auto', transition: 'left 0.2s' }}>
                    <div style={{ padding: 16 }}>
                        {filterOpen && (
                            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong>Filters</strong>
                                <button onClick={() => setFilterOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 18 }}>×</button>
                            </div>
                        )}

                        <button onClick={handleResetFilters} style={{ width: '100%', padding: '8px', marginBottom: 16, border: '1px solid #ddd', background: '#f5f5f5', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>Reset Filters</button>

                        <div style={{ marginBottom: 20 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>Price Range</div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <input type="number" value={filters.priceRange[0]} onChange={(e) => dispatch(setPriceRange([Number(e.target.value), filters.priceRange[1]]))} placeholder="Min" style={{ flex: 1, padding: 6, border: '1px solid #ddd', borderRadius: 4, fontSize: 13 }} />
                                <input type="number" value={filters.priceRange[1]} onChange={(e) => dispatch(setPriceRange([filters.priceRange[0], Number(e.target.value)]))} placeholder="Max" style={{ flex: 1, padding: 6, border: '1px solid #ddd', borderRadius: 4, fontSize: 13 }} />
                            </div>
                        </div>

                        <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #f0f0f0' }}>
                            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>Location</div>
                            <input type="text" placeholder="Enter location..." onChange={(e) => { const val = e.target.value; dispatch(setLocations(val ? [val] : [])); }} style={{ width: '100%', padding: 6, border: '1px solid #ddd', borderRadius: 4, fontSize: 13 }} />
                        </div>

                        {filterSections.map(({ title, items, selected, toggle }) => (
                            <div key={title} style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #f0f0f0' }}>
                                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#666' }}>{title}</div>
                                {items.map(item => (
                                    <label key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, cursor: 'pointer' }}>
                                        <input type="checkbox" checked={selected.includes(item)} onChange={() => toggle(item)} style={{ cursor: 'pointer' }} />
                                        <span style={{ fontSize: 13 }}>{formatLabel(item)}</span>
                                    </label>
                                ))}
                            </div>
                        ))}
                    </div>
                </aside>

                <div style={{ flex: 1, padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div>
                            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>All Devices</h2>
                            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#666' }}>
                                {pagination.totalItems} results
                                {pagination.totalPages > 1 && ` • Page ${pagination.currentPage} of ${pagination.totalPages}`}
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => setFilterOpen(true)} style={{ padding: '6px 12px', border: '1px solid #ddd', background: 'white', borderRadius: 4, cursor: 'pointer', display: typeof window !== 'undefined' && window.innerWidth > 768 ? 'none' : 'block' }}>Filters</button>

                            <div style={{ position: 'relative' }}>
                                <button onClick={() => setSortOpen(!sortOpen)} style={{ padding: '6px 12px', border: '1px solid #ddd', background: 'white', borderRadius: 4, cursor: 'pointer' }}>Sort</button>

                                {sortOpen && (
                                    <div style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, background: 'white', border: '1px solid #ddd', borderRadius: 4, minWidth: 180, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
                                        {sortOpts.map(opt => (
                                            <button key={opt.value} onClick={() => { dispatch(setSortBy(opt.value)); setSortOpen(false); }} style={{ width: '100%', padding: '8px 12px', border: 'none', background: filters.sortBy === opt.value ? '#f5f3ff' : 'white', textAlign: 'left', cursor: 'pointer', fontSize: 13 }}>{opt.label}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div style={{ padding: 16, background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 4, color: '#dc2626', marginBottom: 16 }}>
                            Error loading devices: {error}
                        </div>
                    )}

                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                            {[...Array(8)].map((_, i) => (
                                <div key={i} style={{ background: 'white', border: '1px solid #ddd', borderRadius: 6, overflow: 'hidden' }}>
                                    <div style={{ paddingTop: '100%', background: '#f0f0f0' }} />
                                    <div style={{ padding: 12 }}>
                                        <div style={{ height: 12, background: '#f0f0f0', marginBottom: 8, borderRadius: 2 }} />
                                        <div style={{ height: 12, background: '#f0f0f0', width: '60%', borderRadius: 2 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : devices.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No devices found</div>
                            <p style={{ color: '#666', margin: 0 }}>Try adjusting your filters</p>
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 20 }}>
                                {devices.map(device => (
                                    <div key={device.id} style={{ background: 'white', border: '1px solid #ddd', borderRadius: 6, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                                        <div style={{ position: 'relative', paddingTop: '100%', background: '#f9f9f9' }}>
                                            <img src={device.image_url || 'https://via.placeholder.com/400'} alt={device.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                            {device.device_status === 'new' && (
                                                <span style={{ position: 'absolute', top: 6, right: 6, padding: '2px 6px', background: '#10b981', color: 'white', fontSize: 10, fontWeight: 600, borderRadius: 3, textTransform: 'uppercase' }}>New</span>
                                            )}
                                        </div>

                                        <div style={{ padding: 12 }}>
                                            <h3 style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{device.title}</h3>

                                            <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>
                                                {formatLabel(device.transaction_type)} • {formatLabel(device.seller_role)}
                                            </div>

                                            <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>
                                                {device.location_device && `${device.location_device} • `}
                                                {formatLabel(device.device_status)}
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid #f0f0f0' }}>
                                                <span style={{ fontSize: 16, fontWeight: 700, color: '#7c3aed' }}>
                                                    ${device.price ? device.price.toLocaleString() : 'Contact'}
                                                </span>
                                                {device.shipping === 'yes' && (
                                                    <span style={{ fontSize: 10, padding: '2px 4px', background: '#dbeafe', color: '#1e40af', borderRadius: 2, fontWeight: 500 }}>Free Ship</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {renderPagination()}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;