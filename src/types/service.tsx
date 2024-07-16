interface Service {
  id: string;
  name: string;
  price: number;
}

interface ServiceModal2 {
  id?: number; // Assuming id can be optional or undefined
  name: string;
  price: number | string; // Price can be either number or string, as per your requirement
}

interface ServiceEdit {
  name: string;
  price: string | number; // Price can be either number or string during edit
}

interface ServiceModalProps {
  open: boolean;
  handleClose: () => void;
  edit: ServiceModal2 | null;
  fetchData: () => void;
}

export { Service, ServiceModal2, ServiceModalProps, ServiceEdit };
