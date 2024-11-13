import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { API_ENDPOINTS } from "../apiConfig";

import AllStockList from "./AllStockList";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { getBatchesFromItemId } from "../../services/loginApiConfig/LoginApiConfig";

function AddStock() {
  const { handleSubmit, reset, control, setValue, register } = useForm({
    defaultValues: {
      itemName: "",
      itemBatch: "",
      quantity: "",
      batchExpiryDate: "",
      purchaseRate: "",
      sellingPrice: "",
      search: "",
    },
  });

  const [billList, setBillList] = useState([]);
  const [product, setProduct] = useState({
    itemName: "",
    itemBatch: "",
    quantity: "",
    batchExpiryDate: "",
    purchaseRate: "",
    sellingPrice: "",
    search: "",
  });
  const [editingItem, setEditingItem] = useState(null);
  const [searchOptions, setSearchOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const [errors, setErrors] = useState({
    itemName: false,
    itemBatch: false,
    quantity: false,
    batchExpiryDate: false,
    purchaseRate: false,
    sellingPrice: false,
    search: false,
  });

  const searchInputRef = useRef(null); // Create a ref for the search field

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      itemName: !product.search,
      // itemBatch: !product.itemBatch,
      quantity: !product.quantity,
      // batchExpiryDate: !product.batchExpiryDate,
      purchaseRate: !product.purchaseRate,
      sellingPrice: !product.sellingPrice,
      search: !product.search,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((val) => val);
  };

  const onSubmit = () => {
    console.log("Product before add:", product); // Log the product state
    if (!validateForm()) return;

    if (editingItem) {
      setBillList((prevList) => {
        const updatedList = prevList.map((item) =>
          item.id === editingItem.id ? { ...product, id: item.id } : item
        );
        console.log("BillList after update:", updatedList); // Log the updated list
        return updatedList;
      });
      setEditingItem(null);
    } else {
      const newItem = { ...product, id: new Date().getTime() }; // Use timestamp as unique ID
      setBillList((prevList) => {
        const updatedList = [...prevList, newItem];
        console.log("BillList after add:", updatedList); // Log the updated list
        return updatedList;
      });
      console.log("Item added to list");
    }

    // Reset product state and batch options
    setProduct({
      itemName: "",
      itemBatch: "", // Reset itemBatch here
      quantity: "",
      batchExpiryDate: "",
      purchaseRate: "",
      sellingPrice: "",
      search: "",
    });
    setErrors({
      itemName: false,
      itemBatch: false,
      quantity: false,
      batchExpiryDate: false,
      purchaseRate: false,
      sellingPrice: false,
      search: false,
    });

    // Focus on the search field
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    setSearchOptions([]);
    setBatchOptions([]); // Clear batch options

    // setSearchOptions:'';
    console.log("setSearchOptions....", setSearchOptions.data);
    console.log("searchOptions....", searchOptions.data);
    console.log("searchOptions2222222222....", searchOptions);

    console.log("setBatchOptions....", setBatchOptions.data);
    console.log("batchOptions....", batchOptions.data);
    console.log("batchOptions333333333333333333", batchOptions);
    reset();
    setValue("itemBatch", "");
  };

  const handleEdit = (item) => {
    setProduct(item);
    setEditingItem(item);
  };

  const handleDelete = (id) => {
    setBillList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const fetchSearchOptions = async (searchString) => {
    console.log("lllllllllllllllllllllll==", searchString);

    try {
      const response = await axios.get(
        `${API_ENDPOINTS.getStockItems}/${searchString}`
      );
      if (response.data.status === 200) {
        setSearchOptions(
          response.data.result.map((item) => ({
            id: item.id,
            name: item.item_name,
          }))
        );
      } else {
        console.error("Error fetching search options:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching search options:", error);
    }
  };

  const fetchBatchOptions = (itemId) => {
    getBatchesFromItemId(itemId)
      .then((response) => response.data)
      .then((res) => {
        if (res.status === 200) {
          // setBatchOptions(res.result.map(batch => batch.item_batch));
          setBatchOptions(
            res.result.map((batch) => ({
              // id: batch.id,
              // name: batch.item_batch,
              // purchasePrice: batch.purchasePrice, // Adjust based on API response
              // mrp: batch.mrp, // Adjust based on API response
              label: batch.item_batch,
              value: batch.item_batch,
            }))
          );
        } else {
          console.error("Error fetching batch options:", res.message);
        }
      })
      .catch((error) => {
        //   toast.error(error.response?.data?.message);
      });
  };

  useEffect(() => {
    if (product.search.length >= 1) {
      // Start fetching data after 1 character
      const delayDebounceFn = setTimeout(() => {
        fetchSearchOptions(product.search);
      }, 300); // Debounce delay

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchOptions([]);
    }
  }, [product.search]);

  const handleSearchChange = (event, newValue) => {
    setProduct((prev) => ({
      ...prev,
      search: newValue ? newValue.name : "",
    }));
  };

  useEffect(() => {
    if (product.search !== "") {
      console.log("product12345", product);
      console.log("product.search--", product.search);

      const selectedItem = searchOptions.find(
        (item) => item.name === product.search
      );
      console.log("selectedItem,,,,", selectedItem);

      if (selectedItem) {
        fetchBatchOptions(selectedItem.id);
      } else {
        console.log("111111111111111111111111111111111111111");

        setBatchOptions([]);
      }
    }
  }, [product.search, searchOptions]); // Add searchOptions to the dependency array

  const handleBatchChange = (event, newValue) => {
    console.log("newvalue123", newValue);

    setProduct((prev) => ({
      ...prev,
      itemBatch: newValue ? newValue.itemBatch : "",
    }));
  };

  const handleBatchInputChange = (event) => {
    console.log("event123", event.target.value);

    const value = event?.target?.value;
    setProduct((prev) => ({
      ...prev,
      itemBatch: value,
    }));
  };

  const formatBillList = () => {
    console.log("billList==", billList);

    const lst = billList.map((item) => ({
      itemName: item.search,
      quantity: parseInt(item.quantity),
      itemBatch: item.itemBatch,
      batchExpiryDate: new Date(item.batchExpiryDate).toISOString(), // Format date to ISO string
      purchasePrice: parseFloat(item.purchaseRate),
      itemMrp: parseFloat(item.sellingPrice),
    }));
    console.log("lst", lst);

    return lst;
  };

  const saveStockList = async () => {
    try {
      const formattedData = formatBillList(); // formattedData is an array, not an object with a 'data' property
      console.log("formattedData", formattedData); // Log the array to check its content

      // if (formattedData.length > 0) { // Check if the array is not empty
      console.log("kooooooooooooooo");

      const response = await axios.post(
        `${API_ENDPOINTS.addStockList}`,
        formattedData
      );

      setBillList([]);
      setProduct({
        itemName: "",
        itemBatch: "",
        quantity: "",
        batchExpiryDate: "",
        purchaseRate: "",
        sellingPrice: "",
        search: "",
      });
      setErrors({
        itemName: false,
        itemBatch: false,
        quantity: false,
        batchExpiryDate: false,
        purchaseRate: false,
        sellingPrice: false,
        search: false,
      });
      if (response.data.status === 200) {
        // toast.success(response.data.message); // Show success toast
      } else {
        // toast.error(`Error: ${response.data.message}`); // Show error toast
      }
      // } else {
      //     toast.error('Item List is Empty.');
      // }
    } catch (error) {
      // toast.error('An unexpected error occurred.'); // Show error toast
    }
  };

  const resetFormDate = async () => {
    setBillList([]);
    setProduct({
      itemName: "",
      itemBatch: "",
      quantity: "",
      batchExpiryDate: "",
      purchaseRate: "",
      sellingPrice: "",
      search: "",
    });
    setErrors({
      itemName: false,
      itemBatch: false,
      quantity: false,
      batchExpiryDate: false,
      purchaseRate: false,
      sellingPrice: false,
      search: false,
    });
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSaveClick = () => {
    const formattedData = formatBillList();
    console.log("formattedData[===", formattedData);

    if (formattedData.length > 0) {
      setConfirmationDialogOpen(true);
    } else {
      // toast.error('Item List is Empty.');
    }
  };

  const handleConfirmSave = () => {
    saveStockList();
    setConfirmationDialogOpen(false);
  };

  const handleCancelSave = () => {
    setConfirmationDialogOpen(false);
  };

  console.log("batchOptions222", batchOptions);

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-lg">
      <div className="relative">
        <div className="text-center mb-4">
          <h1 className="">Add Stock</h1>
        </div>
        <div className="absolute top-0 right-0 p-4">
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            All Stock
          </Button>
        </div>
        <AllStockList open={modalOpen} onClose={handleCloseModal} />
      </div>
      <Paper className="mb-5 p-5">
        <Typography variant="h5" component="h2" className="mb-3">
          Item Information
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-5 gap-3 items-end">
            <div className="col-span-2">
              <Autocomplete
                freeSolo
                options={searchOptions}
                getOptionLabel={(option) => option.name || ""}
                inputValue={product.search}
                onInputChange={(event, newInputValue) => {
                  setProduct((prev) => ({
                    ...prev,
                    search: newInputValue,
                  }));
                }}
                inputRef={searchInputRef}
                onChange={handleSearchChange}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </div>
            <div>
              {/* <Autocomplete
                                name="itemBatch"
                                options={batchOptions}
                                getOptionLabel={(option) => option.name || ''}
                                // value={batchOptions.find(option => option.name === product.itemBatch) || ""}
                                onChange={handleBatchChange}
                                onInputChange={handleBatchInputChange}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Item Batch"
                                        fullWidth
                                    />
                                )}
                            /> */}
              <Controller
                name="itemBatch"
                control={control} // Pass the control object from useForm
                defaultValue="" // Default value for the field, if any
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={batchOptions}
                    getOptionLabel={(option) => option.label || ""}
                    onChange={(event, newValue) => {
                      field.onChange(newValue ? newValue.label : "");
                      setProduct((prev) => ({
                        ...prev,
                        itemBatch: newValue ? newValue.label : "",
                      }));
                    }}
                    onInputChange={(event, newInputValue) => {
                      field.onChange(newInputValue);
                      setProduct((prev) => ({
                        ...prev,
                        itemBatch: newInputValue,
                      }));
                    }}
                    freeSolo
                    renderInput={(params) => (
                      <TextField {...params} label="Item Batch" fullWidth />
                    )}
                    {...register("itemBatch")}
                    value={
                      batchOptions.find(
                        (option) => option.label === field.value
                      ) || null
                    } // Sync value with form state
                  />
                )}
              />
            </div>
            <div>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={product.quantity}
                onChange={handleChange}
                fullWidth
                error={errors.quantity}
                helperText={errors.quantity}
              />
            </div>
            <div>
              <TextField
                id="batchExpiryDate"
                label="Batch Expiry Date"
                name="batchExpiryDate"
                type="date"
                value={product.batchExpiryDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={errors.batchExpiryDate}
                helperText={errors.batchExpiryDate}
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 mt-5">
            <div>
              <TextField
                label="Purchase Rate"
                name="purchaseRate"
                type="number"
                value={product.purchaseRate}
                onChange={handleChange}
                fullWidth
                error={errors.purchaseRate}
                helperText={errors.purchaseRate}
              />
            </div>
            <div>
              <TextField
                label="MRP"
                name="sellingPrice"
                type="number"
                value={product.sellingPrice}
                onChange={handleChange}
                fullWidth
                error={errors.sellingPrice}
                helperText={errors.sellingPrice}
              />
            </div>
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                // onClick={handleAddToItemList}
                className="bg-blue-500 hover:bg-blue-600 p-3"
              >
                {editingItem ? "Update Item" : "Add to Item List"}
              </Button>
            </div>
          </div>
        </form>
      </Paper>

      <Paper className="mb-5 p-5">
        <Typography variant="h5" component="h2" className="mb-3">
          Items
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Actions</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Item Batch</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Batch Expiry Date</TableCell>
                <TableCell>Purchase Rate</TableCell>
                <TableCell>MRP</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(item)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(item.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{item.search}</TableCell>
                  <TableCell>{item.itemBatch}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.batchExpiryDate}</TableCell>
                  <TableCell>{item.purchaseRate}</TableCell>
                  <TableCell>{item.sellingPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <div className="flex justify-end">
        <div>
          <Button
            variant="contained"
            color="warning"
            onClick={resetFormDate}
            className="bg-green-500 hover:bg-green-600"
          >
            Reset
          </Button>
        </div>

        <div className="ps-2">
          <Button
            variant="contained"
            color="success"
            onClick={handleSaveClick}
            className="bg-green-500 hover:bg-green-600"
          >
            Save
          </Button>
        </div>
      </div>
      {/* Edit Item Dialog */}
      <Dialog
        open={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-5 gap-3 items-end pt-2">
            <div className="col-span-2">
              <TextField
                label="Item Name"
                name="itemName"
                value={product.search}
                onChange={handleChange}
                fullWidth
                required
                error={errors.search}
                helperText={errors.search}
                disabled
              />
            </div>
            <div>
              <TextField
                label="Item Batch"
                name="itemBatch"
                value={product.itemBatch}
                onChange={fetchBatchOptions}
                fullWidth
                error={errors.itemBatch}
                helperText={errors.itemBatch}
              />
            </div>
            <div>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={product.quantity}
                onChange={handleChange}
                fullWidth
                required
                error={errors.quantity}
                helperText={errors.quantity}
              />
            </div>
            <div>
              <TextField
                id="batchExpiryDate"
                label="Batch Expiry Date"
                name="batchExpiryDate"
                type="date"
                value={product.batchExpiryDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={errors.batchExpiryDate}
                helperText={errors.batchExpiryDate}
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 mt-5">
            <div>
              <TextField
                label="Purchase Rate"
                name="purchaseRate"
                type="number"
                value={product.purchaseRate}
                onChange={handleChange}
                fullWidth
                required
                error={errors.purchaseRate}
                helperText={errors.purchaseRate}
              />
            </div>
            <div>
              <TextField
                label="MRP"
                name="sellingPrice"
                type="number"
                value={product.sellingPrice}
                onChange={handleChange}
                fullWidth
                required
                error={errors.sellingPrice}
                helperText={errors.sellingPrice}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditingItem(null)}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary" variant="outlined">
            Change
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
      >
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to save the stock list?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSave} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSave} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* <ToastContainer position="top-right" /> */}
    </div>
  );
}

export default AddStock;
