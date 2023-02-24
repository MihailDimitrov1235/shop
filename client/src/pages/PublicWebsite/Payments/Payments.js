import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, CardElement, PayButtonElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51MBFWyKHDivJN7JNeeQzpBW01h7AXlGSKOVxisYjac5EoBgv7nAwfS9IunUZqjHdPXCrXBizVVepjhaUbvGO0rwM00B9rpWzi4');

function Payments() {
    const { t } = useTranslation();
    const options = {
        // passing the client secret obtained from the server
        clientSecret: 'pi_1GigR4F540OZ8hRRBFXYdT3F_secret_Zyd1Rnf2Y7ggSPs3rvmXjqM8F',
    };

    return (
        <>
            <Helmet>
                <title>{t('category-create')} | {t('ban')}</title>
            </Helmet>
            <Card sx={{ p: 2 }}>
                <PerfectScrollbar>
                    <Box>
                        <Elements stripe={stripePromise}>
                            <CardElement />
                        </Elements>
                        <button>
                                Pay
                            </button>
                        {/* <Elements stripe={stripePromise} options={options}>
                            <form>
                                <PaymentElement />
                                <button>Submit</button>
                            </form>
                        </Elements> */}
                    </Box>
                </PerfectScrollbar>
            </Card>
        </>
    );
};

export default Payments;