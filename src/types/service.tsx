interface Service {
  id: string;
  name: string;
  price: number;
}

interface ServiceModal2 {
  id?: number;
  name: string;
  price: number | string;
}

interface ServiceEdit {
  name: string;
  price: string | number;
}

interface ServiceModalProps {
  open: boolean;
  handleClose: () => void;
  edit: ServiceModal2 | null;
  fetchData: () => void;
}

export { Service, ServiceModal2, ServiceModalProps, ServiceEdit };
