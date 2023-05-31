import {
    Box,
    Typography,
    Divider,
    Breadcrumbs
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Message from "../Message";

const PageLayout = ({ title, children }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const params = router.query;
    const parts = router.pathname.split('/').filter(x => x && !Object.values(params).includes(x)).slice(1);

    return (
        <Box sx={{
            p: 4,
        }}>
            {/* HEADER */}
            <Box>
                <Box sx={{ pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        // sx={{
                        //     '.MuiBreadcrumbs-separator': {
                        //         fontSize: 20
                        //     }
                        // }}
                    >
                        {parts.map((el, index, parts) => {
                            if (index + 1 === parts.length) {
                                return <Typography color='text.black' variant='h4' key={index}>{t(el)}</Typography>
                            } else {
                                return (
                                    <Link
                                        component={Link}
                                        variant='h4'
                                        underline='none'
                                        color='text.black'
                                        href=''
                                        key={index}
                                    >
                                        {t(el)}
                                    </Link>
                                );
                            }
                        })}
                    </Breadcrumbs>
                    
                    <Message />
                </Box>
                <Divider sx={{ mb: 5 }} />
            </Box>
            {/* CONTENT */}
            <Box sx={{ pb: 5 }} height={"100%"} width={"100%"} ml={"auto"} mr={"auto"}>
                {children}
            </Box>
        </Box>
    );
}

PageLayout.propTypes = {
    title: PropTypes.string.isRequired
};

export default PageLayout;