import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import service from "../../service/service";
import Button from "@mui/material/Button";
import ServiceModal from "../../components/modal/sevice-modal";

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
  const [services, setServices] = useState([]);
  const [edit, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await service.get();
        if (response.status === 200) {
          setServices(response.data.services);
        }
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      const response = await service.delete(id);
      if (response.status === 200) {
        setServices((prevServices) =>
          prevServices.filter((service) => service.id !== id)
        );
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

  const handleAddService = () => {
    setEdit(null);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-6">
        <h1 className="text-2xl">Service</h1>
        <Button onClick={handleAddService} variant="contained">
          Add Service
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>T/R</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell align="right">{`${row.price} UZS`}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => editItem(row)}>
                    <EditIcon color="error" />
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => deleteItem(row.id)}>
                    <DeleteIcon color="error" />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ServiceModal open={open} handleClose={handleClose} edit={edit} />
    </div>
  );
};

export default Index;
