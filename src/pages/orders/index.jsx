import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Notification from "../../utils/notification";
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import order from "../../service/order";
import OrderModal from "./../../components/modal/order-modal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Index = () => {
  const [orders, setOrders] = useState([]);
  const [edit, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await order.get();
      if (response.status === 200) {
        setOrders(response?.data?.orders_list);
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  // const getData = async () => {
  //   try {
  //     const response = await order.get();
  //     if (response.status === 200) {
  //       setOrders(response?.data?.orders_list);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const deleteItem = async (id) => {
    try {
      const response = await order.delete(id);
      if (response.status === 200) {
      Notification({
        title: "Successfully deleted",
        type: "success",
      })

      setTimeout(function(){
        window.location.reload()
      },2000)
      }

    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const editItem = (row) => {
    setEdit(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(null);
  };

  const handleAddOrder = () => {
    setEdit(null);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-6">
        <h1 className="text-2xl">Orders</h1>
        <Button onClick={handleAddOrder} variant="contained">
          Add Order
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Checkbox</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Phone number</StyledTableCell>
              <StyledTableCell align="right">Proccess</StyledTableCell>
               <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    <form>
                      <input type="checkbox" />
                    </form>
                  </StyledTableCell>
                  <StyledTableCell align="start">{row.amount}</StyledTableCell>
                  <StyledTableCell align="right">{row.client_name}</StyledTableCell>
                  <StyledTableCell align="right">{row.client_phone_number}</StyledTableCell>
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                  <StyledTableCell align="right">
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                      <DeleteIcon color="black"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteItem(row.id)}
                      />

                      <EditIcon color="black" 
                      style={{ cursor: "pointer" }}
                        onClick={() => editItem(row)} />
                     
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <OrderModal open={open} handleClose={handleClose} edit={edit} fetchData={fetchData} />
    </div>
  );
};

export default Index;
