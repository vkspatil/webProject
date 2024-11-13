import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';
import { API_ENDPOINTS } from '../apiConfig';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

function UserRegistration({ show, handleClose }) {

    // State to manage form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        mobileNo: '',
        country: null,
        state: null,
        city: null,
        landmark: '',
        loginName: '',
        password: '',
        cpassword: ''
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [error, setError] = useState('');

    // Fetch countries when the component mounts
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.getAllCountry);
                const countryOptions = response.data.map(country => ({
                    value: country.id,
                    label: country.name
                }));
                setCountries(countryOptions);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    // Fetch states based on selected country
    const fetchStates = async (countryId) => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.getAllStates}/${countryId}`);
            const stateOptions = response.data.map(state => ({
                value: state.id,
                label: state.name
            }));
            setStates(stateOptions);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    // Fetch cities based on selected state
    const fetchCities = async (stateId) => {
        try {
            console.log("stateId,,", stateId);
            const response = await axios.get(`${API_ENDPOINTS.getAllCity}/${stateId}`);
            const cityOptions = response.data.map(city => ({
                value: city.id,
                label: city.name
            }));
            setCities(cityOptions);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };


    // Handle form field changes
    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));

        // Validate passwords
        if (id === 'password' || id === 'cpassword') {

            if (formData.password && formData.cpassword && formData.password !== formData.cpassword) {
                setError('Passwords do not match');
            } else {
                setError('');
            }
        }
    };


    // Handle dropdown changes and new option creation
    const handleCountryChange = (selectedOption, actionMeta) => {
        if (actionMeta.action === 'create-option') {
            const newCountry = { value: Date.now(), label: selectedOption.label };
            setCountries([...countries, newCountry]);
            setFormData(prevState => ({
                ...prevState,
                country: newCountry,
                state: null,
                city: null
            }));
            setStates([]);
            setCities([]);
        } else if (selectedOption) {
            setFormData(prevState => ({
                ...prevState,
                country: selectedOption,
                state: null,
                city: null
            }));
            fetchStates(selectedOption.value);
        } else {
            setFormData(prevState => ({
                ...prevState,
                country: null,
                state: null,
                city: null
            }));
            setStates([]);
            setCities([]);
        }
    };

    const handleStateChange = (selectedOption, actionMeta) => {
        if (actionMeta.action === 'create-option') {
            const newState = { value: Date.now(), label: selectedOption.label };
            setStates([...states, newState]);
            setFormData(prevState => ({
                ...prevState,
                state: newState,
                city: null
            }));
            setCities([]);
        } else if (selectedOption) {
            setFormData(prevState => ({
                ...prevState,
                state: selectedOption,
                city: null
            }));
            fetchCities(selectedOption.value);
        } else {
            setFormData(prevState => ({
                ...prevState,
                state: null,
                city: null
            }));
            if (formData.country) {
                fetchStates(formData.country.value);
            } else {
                setStates([]);
            }
        }
    };

    const handleCityChange = (selectedOption, actionMeta) => {
        if (actionMeta.action === 'create-option') {
            const newCity = { value: Date.now(), label: selectedOption.label };
            setCities([...cities, newCity]);
            setFormData(prevState => ({
                ...prevState,
                city: newCity
            }));
        } else if (selectedOption) {
            setFormData(prevState => ({
                ...prevState,
                city: selectedOption
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                city: null
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.cpassword) {
            setError('Passwords do not match');
        } else {
            setError('');
            // Proceed with form submission (e.g., API call)
            console.log('Form submitted successfully');
        }
        console.log("formData.country==" + formData.country.data);
        const countryId = formData.country ? formData.country.value : null;
        const stateId = formData.state ? formData.state.value : null;
        const cityId = formData.city ? formData.city.value : null;

        try {
            // Construct the object to match the POST object structure
            const userData = {
                id: 0,
                firstName: formData.firstName,
                lastName: formData.lastName,
                dateOfBirth: formData.dateOfBirth,
                age: 0, // You might need to calculate this if required
                isActive: true,
                mobileNo: formData.mobileNo,
                country: {
                    id: countryId,
                    name: formData.country.label,
                    isActive: true,
                    createDateTime: new Date().toISOString()
                },
                state: {
                    id: stateId,
                    name: formData.state.label,
                    isActive: true,
                    createDateTime: new Date().toISOString(),
                    country: {
                        id: formData.country.value,
                        name: formData.country.label,
                        isActive: true,
                        createDateTime: new Date().toISOString()
                    }
                },
                city: {
                    id: cityId,
                    name: formData.city.label,
                    isActive: true,
                    createDateTime: new Date().toISOString(),
                    state: {
                        id: formData.state.value,
                        name: formData.state.label,
                        isActive: true,
                        createDateTime: new Date().toISOString(),
                        country: {
                            id: formData.country.value,
                            name: formData.country.label,
                            isActive: true,
                            createDateTime: new Date().toISOString()
                        }
                    }
                },
                landmark: formData.landmark,
                userCreateDateTime: new Date().toISOString(),
                loginName: formData.loginName,
                password: formData.password
            };

            // POST request to the endpoint
            await axios.post(API_ENDPOINTS.createUser, userData);
            console.log('User registered successfully');
            handleClose(); // Close the modal after successful submission
        } catch (error) {
            console.error('Error registering user:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div >
            <Modal show={show} onHide={handleClose} dialogClassName="modal-custom-width">
                <Modal.Header closeButton>
                    <div className='w-full flex justify-center pt-12'>
                        <Modal.Title>Create User</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <FormControl fullWidth onSubmit={handleSubmit} className="space-y-4">
                        {/* Form fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <TextField
                                    id="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    id="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <TextField
                                    id="email"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    id="dateOfBirth"
                                    label="Date of Birth"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <TextField
                                    id="mobileNo"
                                    label="Mobile Number"
                                    type="tel"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <div className='h-18'>
                                    {/* <label htmlFor="country" className="form-label block text-sm font-medium text-gray-700">State</label> */}
                                    {/* <labl htmlFor="country" className="form-label block text-sm font-medium text-gray-700">Country/> */}
                                    <CreatableSelect
                                        id="country"
                                        value={formData.country}
                                        onChange={handleCountryChange}
                                        options={countries}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isClearable
                                        isSearchable
                                        placeholder="Country"
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div className='p-3'>
                                {/* <label htmlFor="state" className="form-label block text-sm font-medium text-gray-700">State</label> */}
                                <CreatableSelect
                                    id="state"
                                    value={formData.state}
                                    onChange={handleStateChange}
                                    options={states}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isClearable
                                    isSearchable
                                    placeholder="State"
                                    isDisabled={!formData.country}
                                />
                            </div>
                            <div>
                                {/* <label htmlFor="city" className="form-label block text-sm font-medium text-gray-700">City</label> */}
                                <CreatableSelect
                                    id="city"
                                    value={formData.city}
                                    onChange={handleCityChange}
                                    options={cities}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isClearable
                                    isSearchable
                                    placeholder="City"
                                    isDisabled={!formData.state}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <TextField
                                id="landmark"
                                label="Landmark"
                                variant="outlined"
                                fullWidth
                                value={formData.landmark}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <TextField
                                    id="loginName"
                                    label="Login Name"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.loginName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    id="cpassword"
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.cpassword}
                                    onChange={handleChange}
                                    required
                                    error={!!error}
                                    helperText={error}
                                />
                            </div>
                        </div>
                        <div className='w-full flex justify-center'>
                            <Button onClick={handleSubmit} variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </FormControl>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default UserRegistration;
