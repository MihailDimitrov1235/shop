import { Box, useTheme } from "@mui/material";
import Typography from '@mui/material/Typography';


const Products = () => {

    const theme = useTheme();

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
                    {/* <Typography variant="h6">Welcome to your Dashboard</Typography> */}
                </Box>
            </Box>
            {/* CONTENT */}
            <Box>

            </Box>
        </Box>
    )
}

export default Products;