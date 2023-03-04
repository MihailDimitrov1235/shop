import {Box, Typography, Stack, Chip} from '@mui/material';
import { Link } from "react-router-dom";

export default function ProductInformation({ name, authors, desc }){
    return(
        <>
        <Box textAlign="center" display={"flex"} flexWrap="wrap" justifyContent={'center'}>
            <Typography variant="h2">{name}</Typography>
            <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            display={"flex"}
            flexWrap="wrap"
            >
            {authors.map((author) => (
                <Chip
                sx={{
                    mb: 1,
                }}
                component={Link}
                label={author.name}
                to={"/author/" + author.id}
                clickable
                />
            ))}
            </Stack>
        </Box>
        <Box sx={{ textAlign: "center", height: "100%", mt: 5 }}>
            <Typography>{desc}</Typography>
        </Box>
        </>
    )
};