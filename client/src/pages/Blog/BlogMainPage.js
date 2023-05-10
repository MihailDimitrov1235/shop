import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const BlogMainPage = () =>{
    const { t } = useTranslation();
    return (
        <Box>
            <Box
                sx = {{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                }}
            >
                <Typography variant='h1'>{t('blog-welcome-text')}</Typography>

            </Box>
        </Box>
    )
}

export default BlogMainPage