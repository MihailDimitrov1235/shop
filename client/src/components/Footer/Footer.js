import {
    Paper,
    Container,
    Box,
    Typography
} from '@mui/material';

const Footer = () => {
    return (
        <Paper
            component="footer"
            square
            variant="outlined"
            sx={{
                mt: 'auto',
                width: '100%',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        py: 2
                    }}
                >
                    <Typography variant="caption" color="initial">
                        © 2022 Bulgarian Academy of Sciences | Some rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
}

export default Footer;