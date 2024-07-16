interface Service {
  id: string;
  name: string;
  price: number;
}

interface ServiceModal {
  id?: string;
  name: string;
  price: number;
}

interface ServiceEdit {
  name: string;
  price: string | number;
}

interface ServiceModalProps {
  open: boolean;
  handleClose: () => void;
  edit: Service | null;
  fetchData: () => void;
}

export {Service,ServiceModal,ServiceModalProps,ServiceEdit}