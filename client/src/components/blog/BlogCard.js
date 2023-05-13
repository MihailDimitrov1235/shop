import { Box, Card, Typography, Chip, Stack } from "@mui/material"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const BlogCard = ( { post } ) => {

    const { t } = useTranslation();

    const date = post.date.split('-')
    const year = date[0]
    const month = date[1]
    const day = date[2]

    const monthMap = {
        '01' : t('january'),
        '02' : t('february'),
        '03' : t('march'),
        '04' : t('april'),
        '05' : t('may'),
        '06' : t('june'),
        '07' : t('july'),
        '08' : t('august'),
        '09' : t('september'),
        '10' : t('october'),
        '11' : t('november'),
        '12' : t('december'),
    }
    return(
        <Box sx={{
            flex:1,
            flexBasis: { xs: '80%', sm: '45%' , md: '30%' },
            maxWidth: { xs: '80%', sm: '45%' , md: '30%' },
            mt: 4
        }}>
            <Link to={post.slug}>
                <Card>
                    <Box width={'100%'} height={'60%'} display={'flex'} justifyContent={'center'} sx={{
                        mt:1,
                    }}>
                        <img style={{ width:'90%', borderRadius:'5px' }} src={post.image}/>
                    </Box>
                    <Box>
                        <Typography style={{ 
                            margin: '0 5%'
                            // textAlign:'center'
                             }} variant="h3">{post.title}</Typography>
                    </Box>
                    <Box>
                        <Typography style={{ 
                            margin: '0 5%',
                            marginBottom: '10px'
                            }} variant="subtitle1">{post.description}</Typography>
                    </Box>
                    {/* <Stack direction={'row'} spacing={1} sx={{ ml: '5%', mb: 1, mt: 4 }} >
                        {post.categories.map( (category, idx) => (
                            <Chip sx={{ fontSize:'100%', background:'linear-gradient(90deg, rgba(185,0,0,1) 0%, rgba(106,20,0,1) 100%)', color: 'white' }} label={category}/>
                        ))}
                    </Stack> */}
                    <Box>
                        <Box sx={{ display:'flex', ml: '5%', mb: 1 }}>
                            <PersonIcon/>
                            <Typography variant="subtitle1">
                                {post.author}
                            </Typography>
                        </Box>
                        <Box sx={{ display:'flex', ml: '5%', mb: 1 }}>
                            <CalendarMonthIcon/>
                            <Typography variant="subtitle1">
                                {monthMap[month]} {day}, {year}
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </Link>
        </Box>
    )
}

export default BlogCard