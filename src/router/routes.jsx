import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import HomeIcon from '@mui/icons-material/Home';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';


const routes = [
    {
        path: "/",
        content: "Main",
        icon: <HomeIcon/>
    },
    {
        path: "/service",
        content: "Service",
        icon: <LocalPostOfficeIcon/>
    },
    {
        path: "/orders",
        content: "Orders",
        icon: <BorderStyleIcon/>
    },
]

export default routes