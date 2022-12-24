import { Box, IconButton, Typography } from "@mui/material";
import ProductTable from "./Products/ProductTable";
import DownloadIcon from '@mui/icons-material/Download';

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
                    <Typography variant="h2">Products</Typography>
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
            <Box height={"300px"} width={"40vw"}>
                <ProductTable/>
            </Box>
        </Box>
    );
}

export default AdminProducts;