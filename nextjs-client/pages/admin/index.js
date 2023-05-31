import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react';

const Home = () => {
    const router = useRouter()

    useEffect( props => {
        router.push('admin/dashboard')
    }, [])

    return (
        <>
        </>
    );
}
export async function getServerSideProps(context) {
    context.res.writeHead(302, { Location: '/admin/dashboard' });
    context.res.end();
    return { props: {
        ... (await serverSideTranslations(locale))
    } };
  }

export default Home;