import React, { useState } from 'react';
import {
    Button,
    TextField,
    Paper,
    Typography,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    FormControl,
    InputLabel
} from '@mui/material';

import CreatableSelect from 'react-select/creatable';
import { Controller, useForm } from 'react-hook-form';

function UserManagement() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        mobile: '',
        email: '',
        branches: []
    });

    const { control, handleSubmit } = useForm({
        defaultValues: {
            country: '',
            state: '',
            city: ''
        }
    });


    const branches = [
        { value: 'branch1', label: 'Branch 1' },
        { value: 'branch2', label: 'Branch 2' },
        { value: 'branch3', label: 'Branch 3' }
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'branches') {
            setFormData({ ...formData, [name]: event.target.value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div className="container p-5 bg-gray-100 rounded-lg shadow-lg">
            <div className="relative">
                <div className="text-center mb-4">
                    <h1 className="">Create User</h1>
                </div>
                <div className="absolute top-0 right-0 p-4">
                    <Button variant="contained" color="warning">
                        All Users
                    </Button>
                </div>
            </div>
            <div>
                <form>
                    <Paper className="mb-4 p-5">

                        <Typography variant="h5" component="h2" className="mb-3">
                            User Information
                        </Typography>
                        <div className='grid grid-cols-3 gap-3 items-end'>
                            <TextField
                                label="First Name"
                                name="firstname"
                                type="text"
                                value={formData.firstname}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                label="Last Name"
                                name="lastname"
                                type="text"
                                value={formData.lastname}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                label="Mobile"
                                name="mobile"
                                type="text"
                                value={formData.mobile}
                                onChange={handleChange}
                                fullWidth
                            />
                        </div>
                        <div className='mt-4 grid grid-cols-2 gap-3 items-end'>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel>Branch</InputLabel>
                                <Select
                                    label="Branch"
                                    name="branches"
                                    multiple
                                    value={formData.branches}
                                    onChange={handleChange}
                                    renderValue={(selected) => (
                                        <div>
                                            {selected.map((value) => (
                                                <span key={value}>{branches.find(branch => branch.value === value)?.label}</span>
                                            ))}
                                        </div>
                                    )}
                                >
                                    {branches.map((branch) => (
                                        <MenuItem key={branch.value} value={branch.value}>
                                            <Checkbox checked={formData.branches.indexOf(branch.value) > -1} />
                                            <ListItemText primary={branch.label} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </Paper>
                    <Paper className="mb-4 p-5">
                        <Typography variant="h5" component="h2" className="mb-3">
                            Address
                        </Typography>
                        <div className='grid grid-cols-3 gap-3 items-end'>
                            <Controller
                                name="country"
                                control={control}
                                render={({ field }) => (
                                    <CreatableSelect
                                        {...field}
                                        isClearable
                                        placeholder="Select or create country"
                                        className="basic-single"
                                        classNamePrefix="select"
                                    // Add more options and handle creation as needed
                                    />
                                )}
                            />
                            <Controller
                                name="state"
                                control={control}
                                render={({ field }) => (
                                    <CreatableSelect
                                        {...field}
                                        isClearable
                                        placeholder="Select or create state"
                                        className="basic-single"
                                        classNamePrefix="select"
                                    // Add more options and handle creation as needed
                                    />
                                )}
                            />
                            <Controller
                                name="city"
                                control={control}
                                render={({ field }) => (
                                    <CreatableSelect
                                        {...field}
                                        isClearable
                                        placeholder="Select or create city"
                                        className="basic-single"
                                        classNamePrefix="select"
                                    // Add more options and handle creation as needed
                                    />
                                )}
                            />
                        </div>
                    </Paper>

                </form>
            </div>
        </div>
    );
}

export default UserManagement;
