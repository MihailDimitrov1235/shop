import { Box, IconButton, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { Outlet } from 'react-router-dom';

const AdminProducts = () =>{
    return (
        <Box sx={{
            p:4,
        }}>
            {/* HEADER */}
            <Box sx={{
                display:'flex',
            }}>
                <Box>
                    <Typography variant="h3" style={{ fontSize: "40px" }}>Products</Typography>
                </Box>
                <Box sx ={{
                    ml:'auto',
                }}>
                    <IconButton>
                        <DownloadIcon/>
                    </IconButton>
                </Box>
            </Box>
            {/* CONTENT */}
            <Box height={"100%"} width={"100%"} ml={"auto"} mr={"auto"}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default AdminProducts;