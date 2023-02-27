import {
    Box,
    Typography
} from '@mui/material';
import { Container } from '@mui/system';

const InformationSection = () => {
    return (
        <>
            <img style={{ width: '100%' }} src='/static/images/Top.svg' alt="curve" />

            <Box bgcolor={"#96011c"}>
                <Container
                    maxWidth={'false'}
                    sx={{
                        width: '85%',
                        margin: '0 auto',
                        //px: { lg: '130px!important' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    <Box sx={{ textAlign: 'center', width: { md: '40%' } }}>
                        <Typography
                            variant='h1'
                            sx={{ fontSize: '35px', color: 'white', fontWeight: 800 }}
                        >
                            What is Lorem Ipsum?
                        </Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{ fontSize: '19px', color: 'white', fontWeight: 800, mt: '100px' }}
                        >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Typography>
                    </Box>

                    <img src='/static/images/glass.png' width='518' />
                </Container>
            </Box>

            <img style={{ width: '100%' }} src='/static/images/Bottom.svg' alt="curve" />
        </>
    );
}

export default InformationSection;