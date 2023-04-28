import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import RequestCard from '../../../components/ControlPanel/Requests/RequestCard'

const RequestPage = () =>{

    const { t, i18n } = useTranslation();

    return(
        <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
            <RequestCard heading={t('authors')} image={''} href={'authors'}/>
            <RequestCard heading={t('products')} image={''} href={'products'}/>
        </Box>
    )
}

export default RequestPage