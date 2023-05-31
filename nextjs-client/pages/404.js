import { useRouter } from "next/router"
import { Box, Typography, Button } from "@mui/material"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { t } from "i18next"

export default function Page404(){
    const router = useRouter()
    const { t } = useTranslation()

    const [{ x, y }, api] = useSpring(() => ({
        x: "0",
        y: "0",
    }));

    const bind = useGesture({
        onHover: ({ hovering }) => api({ x: hovering ? '-5px' : '0', y: hovering ? '-5px' : '0' }),
    })

    return (
        
            <Box  height={'100vh'} display={'flex'} justifyContent={'center'} flexDirection={'column'} textAlign={'center'} alignContent={'center'}>
                <Typography fontSize={'220px'}>404</Typography>
                <Typography fontSize={'50px'} marginBottom={'50px'}>{t('page-not-found')}</Typography>
                <animated.div style={{ x: x, y: y, textAlign:'center', width:'fit-content', margin:'0 auto'}}>
                    <Link href={'/'}>
                        <Button {...bind()} sx={{ width:'300px', mx:'auto', display:'fit-content', background: '#96011c', "&:hover": {background:'#96011c'}}}><Typography variant="heroSubtitle">{t('go-back-to-store')}</Typography></Button>
                    </Link>
                </animated.div>
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