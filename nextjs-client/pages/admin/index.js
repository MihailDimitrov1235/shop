import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home = () => {
    const { t } = useTranslation()

    return (
        <>
            <h1>dasdasfasfa</h1>
        </>
    );
}

export async function getStaticProps({ locale }) {
  return {
      props: {
          ... (await serverSideTranslations(locale))
      }
  }
}

export default Home;