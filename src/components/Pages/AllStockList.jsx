import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, IconButton, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Pagination } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { API_ENDPOINTS } from '../apiConfig';

const AllStockList = ({ open, onClose, onEdit, onDelete }) => {
    const [stockData, setStockData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [hasMore, setHasMore] = useState(true); // Track if more records are available

    const fetchStockData = useCallback(async () => {
        try {
            const response = await axios.post(API_ENDPOINTS.getAllItemStockList, {
                itemId: null,
                page: page - 1,
                size: pageSize
            });
            const data = response.data;
            setStockData(data.result || []);
            setTotalRecords(data.count || 0); // Update total records

            const total = data.count || 0; // Ensure this is the correct total number of records
            const totalPages = Math.ceil(total / pageSize); // Calculate total pages
            setTotalPages(totalPages);

            // Determine if there are more records to fetch
            setHasMore(page < totalPages);
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    }, [page, pageSize]);

    useEffect(() => {
        if (open) {
            fetchStockData();
        }
    }, [open, page, fetchStockData]);

    const filteredStockData = useMemo(() => {
        return stockData.filter(item =>
            item['Item name'].toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, stockData]);

    const handleEdit = (item) => {
        if (onEdit) onEdit(item);
    };

    const handleDelete = (id) => {
        if (onDelete) onDelete(id);
    };

    const handlePageChange = (event, value) => {
        if (value >= 1 && value <= totalPages) { // Ensure page value is within valid range
            setPage(value);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                All Stock
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div className="w-full">
                    <TextField
                        variant="outlined"
                        placeholder="Search by item name"
                        fullWidth
                        margin="normal"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Item Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Item Code</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Created Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredStockData.length > 0 ? (
                                filteredStockData.map((item) => (
                                    <TableRow key={item['Item Id']}>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(item)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(item['Item Id'])} color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{item['Item name']}</TableCell>
                                        <TableCell>{item['Item code']}</TableCell>
                                        <TableCell>{item['Item Quantity']}</TableCell>
                                        <TableCell>{item['Created Date Time']}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No stock data available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                />
                <div className="text-center mt-2">
                    <span>Total Records: {totalRecords}</span>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AllStockList;
