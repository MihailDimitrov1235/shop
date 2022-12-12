import { Box, IconButton, Typography } from "@mui/material";
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
            <Box>
                <p>content</p>
            </Box>
        </Box>
    );
}

export default Dashboard;