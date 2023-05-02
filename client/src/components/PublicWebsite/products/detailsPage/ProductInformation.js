import { Box, Typography, Stack, Chip, Avatar } from '@mui/material';
import { Link } from "react-router-dom";

export default function ProductInformation({name, authors, desc}) {
    return (
        <>
            <Box textAlign="center">
                <Typography variant="h2">{name}</Typography>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        mt: 2
                    }}
                >
                    {authors.map((author) => (
                        <Chip
                            sx={{
                                mb: 1,
                            }}
                            avatar={author.image?<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" /> : <Avatar>{author.name[0].toUpperCase()}</Avatar>}
                            component={Link}
                            label={author.name}
                            to={"/author/" + author.author_id}
                            clickable
                            key={author.author_id}
                        />
                    ))}
                </Stack>
            </Box>
            <Box sx={{ textAlign: "center", height: "100%", mt: 5 }}>
                <div
                    dangerouslySetInnerHTML={{
                        __html: desc,
                    }}
                />
            </Box>
        </>
    )
};