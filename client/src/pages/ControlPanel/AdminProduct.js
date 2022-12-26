import { Box, IconButton, Typography, Container, Divider } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { Outlet } from 'react-router-dom';

const AdminProducts = () =>{
    return (
        <Box sx={{
            p:4,
        }}>
            {/* HEADER */}
            <Box>
                <Box sx={{ pb: 2 }}>
                    <Typography variant="h3">Products</Typography>
                </Box>
                <Divider sx={{ mb: 5 }}/>
                {/* <Box sx ={{
                    ml:'auto',
                }}>
                    <IconButton>
                        <DownloadIcon/>
                    </IconButton>
                </Box> */}
            </Box>
            {/* CONTENT */}
            <Box height={"100%"} width={"100%"} ml={"auto"} mr={"auto"}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default AdminProducts;