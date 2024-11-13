import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setDialogOpen(true);
    };

    const handleConfirmLogout = () => {
        setDialogOpen(false);
        localStorage.removeItem('user');
        console.log('User logged out');
        localStorage.clear();
        navigate('/'); // Navigate to login or home page
    };

    const handleCancelLogout = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: 'primary.main' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" className="text-white no-underline">
                            <span className="font-bold">Shop Name</span>
                        </Link>
                    </Typography>
                    <div className="flex-grow"></div>
                    <Button color="inherit" component={Link} to="/home">Home</Button>
                    <Button color="inherit" component={Link} to="/addstock">Add Stock</Button>
                    <Button color="inherit" component={Link} to="/bill">Bill</Button>
                    <Button color="inherit" component={Link} to="/usermanagement">User Management</Button>
                    <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Dialog open={dialogOpen} onClose={handleCancelLogout}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    Are you sure you want to log out?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelLogout}>Cancel</Button>
                    <Button onClick={handleConfirmLogout} color="primary">Logout</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Navbar;
