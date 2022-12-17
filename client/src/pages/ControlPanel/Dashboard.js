import { Box, IconButton, Typography } from "@mui/material";
import SalesLine from "./Charts/SalesLine";
import DownloadIcon from '@mui/icons-material/Download';

const Dashboard = () =>{
    return (
        <Box sx={{
            p:4,
        }}>
            {/* HEADER */}
            <Box sx={{
                display:'flex',
            }}>
                <Box>
                    <Typography variant="h2">Dashboard</Typography>
                    <Typography variant="h6">Welcome to your Dashboard</Typography>
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
                <SalesLine />
            </Box>
        </Box>
    );
}

export default Dashboard;