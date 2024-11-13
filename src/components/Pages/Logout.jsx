// import React, { useState, useEffect } from 'react';
// import ConfirmationDialog from './ConfirmationDialog';
// import { useNavigate } from 'react-router-dom';

// function Logout() {
//     const [showDialog, setShowDialog] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Show confirmation dialog when component mounts
//         setShowDialog(true);
//     }, []);

//     const handleLogout = () => {
//         console.log("hghhhhhhhhhhhhhhhhhhhhhhhhh");
        
//         try {
//             // Clear user session and localStorage
//             localStorage.removeItem('user');
//             console.log('User logged out');
//             localStorage.clear();
//             // Navigate to the login page
//             navigate('/');
//         } catch (error) {
//             console.error('Error during logout:', error);
//         } finally {
//             setShowDialog(false);
//         }
//     };

//     const handleCancel = () => {
//         navigate('/dashboard/home');
//         setShowDialog(false);
//     };

//     return (
//         <div>
//             <ConfirmationDialog 
//                 show={showDialog}
//                 onConfirm={handleLogout}
//                 onCancel={handleCancel}
//             />
//         </div>
//     );
// }

// export default Logout;
