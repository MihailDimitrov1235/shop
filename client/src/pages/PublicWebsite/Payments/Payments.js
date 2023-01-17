import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51MBFWyKHDivJN7JNeeQzpBW01h7AXlGSKOVxisYjac5EoBgv7nAwfS9IunUZqjHdPXCrXBizVVepjhaUbvGO0rwM00B9rpWzi4');

function Payments() {
    const { t } = useTranslation();
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };

    return (
        <>
            <Helmet>
                <title>{t('category-create')} | {t('ban')}</title>
            </Helmet>
            <Card sx={{ p: 2 }}>
                <PerfectScrollbar>
                    <Box>
                        <Elements stripe={stripePromise} options={options}>
                            <form>
                                <PaymentElement />
                                <button>Submit</button>
                            </form>
                        </Elements>
                    </Box>
                </PerfectScrollbar>
            </Card>
        </>
    );
};

export default Payments;