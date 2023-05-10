import { Box, Card, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const BlogCard = ( { post } ) => {
    return(
        <Box sx={{
            flex:1,
            flexBasis: { xs: '80%', sm: '45%' , md: '30%' },
            maxWidth: { xs: '80%', sm: '45%' , md: '30%' },
            mt: 4
        }}>
            <Link to={post.slug}>
                <Card>
                    <Box width={'100%'} height={'60%'} objectFit='contain'>
                        <img style={{ width:'100%' }} src={post.image}/>
                    </Box>
                    <Box>
                        <Typography style={{ textAlign:'center' }} variant="h3">{post.title}</Typography>
                    </Box>
                </Card>
            </Link>
        </Box>
    )
}

export default BlogCard