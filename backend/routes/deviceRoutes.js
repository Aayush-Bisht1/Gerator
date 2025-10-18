import express from 'express';
import { getDeviceById, getDevices } from '../db.js';
import { pool } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const {
            page = 1,
            limit = 12,
            search = '',
            minPrice = 0,
            maxPrice = 1000000,
            transactionType = '',
            sellerRole = '',
            warranty = '',
            shipping = '',
            deviceStatus = '',
            location = '',
            sortBy = 'datePosted'
        } = req.query;

        const offset = (page - 1) * limit;
        
        // Build the WHERE clause dynamically
        let whereConditions = [];
        let queryParams = [];

        // Price range filter
        whereConditions.push('price >= ? AND price <= ?');
        queryParams.push(minPrice, maxPrice);

        // Search filter
        if (search) {
            whereConditions.push('(title LIKE ? OR tags LIKE ?)');
            queryParams.push(`%${search}%`, `%${search}%`);
        }

        // Transaction type filter
        if (transactionType) {
            whereConditions.push('transaction_type = ?');
            queryParams.push(transactionType);
        }

        // Seller role filter
        if (sellerRole) {
            whereConditions.push('seller_role = ?');
            queryParams.push(sellerRole);
        }

        // Warranty filter
        if (warranty) {
            whereConditions.push('warranty = ?');
            queryParams.push(warranty);
        }

        // Shipping filter
        if (shipping) {
            whereConditions.push('shipping = ?');
            queryParams.push(shipping);
        }

        // Device status filter
        if (deviceStatus) {
            whereConditions.push('device_status = ?');
            queryParams.push(deviceStatus);
        }

        // Location filter
        if (location) {
            whereConditions.push('location_device LIKE ?');
            queryParams.push(`%${location}%`);
        }

        const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

        // Build ORDER BY clause
        let orderBy = 'ORDER BY ';
        switch (sortBy) {
            case 'priceLow':
                orderBy += 'price ASC';
                break;
            case 'priceHigh':
                orderBy += 'price DESC';
                break;
            case 'datePosted':
            default:
                orderBy += 'post_publish_date DESC';
                break;
        }

        // Get total count for pagination
        const countQuery = `SELECT COUNT(*) as total FROM devices ${whereClause}`;
        const [countResult] = await pool.query(countQuery, queryParams);
        const total = countResult[0].total;

        // Get paginated results
        const dataQuery = `SELECT * FROM devices ${whereClause} ${orderBy} LIMIT ? OFFSET ?`;
        const devices = await pool.query(dataQuery, [...queryParams, parseInt(limit), offset]);

        res.json({
            devices: devices[0],
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const device = await getDeviceById(req.params.id);
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }
        res.json(device);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;