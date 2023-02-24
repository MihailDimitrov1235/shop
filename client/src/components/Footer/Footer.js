import {
    Paper,
    Container,
    Box,
    Typography
} from '@mui/material';
import topSvg from './Vector.svg';

const Footer = () => {
    return (
        <Box
        width='100%'
        display='contents'
        >
            <img style={{width:'100%'}} src={topSvg} alt="React Logo" />
            <Box
                margin='0'
                height='300px'
                style={{
                    backgroundColor:'#96011c'
                }}
            >
                
            </Box>
            {/* <Container maxWidth="lg">
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
            </Container> */}
        </Box>
    );
}

export default Footer;