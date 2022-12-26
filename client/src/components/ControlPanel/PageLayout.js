import { Box, IconButton, Typography, Container, Divider } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const PageLayout = ({ title }) => {
    const { t } = useTranslation();

    return (
        <Box sx={{
            p:4,
        }}>
            {/* HEADER */}
            <Box>
                <Box sx={{ pb: 2 }}>
                    <Typography variant="h3">{t(title)}</Typography>
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

PageLayout.propTypes = {
    title: PropTypes.string.isRequired
};

export default PageLayout;