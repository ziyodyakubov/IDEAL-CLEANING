import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Notification from "../../utils/notification";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import service from "../../service/service";
import ServiceModal from "../../components/modal/sevice-modal";
import { Service } from "../../types/service";

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

const Index: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [edit, setEdit] = useState<Service | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = async (id: string) => {
    try {
      const response = await service.delete(id);
      if (response.status === 200) {
        Notification({
          title: "Successfully deleted",
          type: "success",
        });

        setServices((prevServices) => prevServices.filter((service) => service.id !== id));
      } else if (response.status === 400) {
        Notification({
          title: "Bad Request",
          type: "error",
          message: response.data.message || "There was an issue with the request.",
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      Notification({
        title: "Error",
        type: "error",
        message: "An error occurred while trying to delete the item.",
      });
    }
  };

  const editItem = (row: Service) => {
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
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{row.name.charAt(0).toUpperCase() + row.name.slice(1)}</StyledTableCell>
                <StyledTableCell align="center">{`${row.price} UZS`}</StyledTableCell>
                <StyledTableCell align="center">
                  <div className="flex items-center gap-2 justify-center">
                    <EditIcon className="cursor-pointer text-blue-600" onClick={() => editItem(row)} />
                    <DeleteIcon className="cursor-pointer text-blue-500" onClick={() => deleteItem(row.id)} />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ServiceModal open={open} handleClose={handleClose} edit={edit} fetchData={fetchData} />
    </div>
  );
};

export default Index;
