import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box } from '@mui/material';
import RequestCard from '@/components/ControlPanel/Requests/RequestCard'

const RequestPage = () =>{

    const { t, i18n } = useTranslation();

    return(
        <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
            {/* <RequestCard heading={t('authors')} image={'/static/images/requests/authors.jpg'} href={'authors'}/> */}
            {/* <RequestCard heading={t('products')} image={'/static/images/requests/products.jpg'} href={'products'}/> */}
            <RequestCard heading={t('posts')} image={'/static/images/requests/authors.jpg'} href={'posts'}/>
        </Box>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ... (await serverSideTranslations(locale))
        }
    }
  }

export default RequestPage