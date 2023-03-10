import { forwardRef, useState } from 'react'
import { Typography, Box, Button } from '@mui/material';
import { ReactComponent as PdfIcon } from '../../../../assets/icons/pdf.svg';
import { ReactComponent as WordIcon } from '../../../../assets/icons/word.svg';
import { ReactComponent as ExcelIcon } from '../../../../assets/icons/excel.svg';
import { ReactComponent as ImageIcon } from '../../../../assets/icons/image.svg';
import { useTrail, animated } from '@react-spring/web'
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Files({ files }) {

    const trail = useTrail(files.length, {
        from: { opacity: 0, x: 40 },
        to: { opacity: 1, x: 0 },
        config: { mass: 5, tension: 1500, friction: 200 },
    })

    const [open, setOpen] = useState(false);
    const regex = /(?:\.([^.]+))?$/;
    const { t } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Typography variant='h5'>{t('recieve')}</Typography>
            {trail.reduce((result, { ...style }, idx) => {
                if (idx < 4) {
                    result.push(
                        <animated.div key={idx} style={{ width: '100%', ...style }}>
                            <Box width='100%' sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                py: 1
                            }}>
                                <Box width={'30px'}>
                                    {regex.exec(files[idx].path)[1] === "pdf" ? <PdfIcon fill='#f40f02' />
                                        : regex.exec(files[idx].path)[1] === "docs" || regex.exec(files[idx].path)[1] === "doxs" ? <WordIcon fill='#2D92D4' />
                                            : regex.exec(files[idx].path)[1] === "xml" ? <ExcelIcon fill='#388E3C' />
                                                : regex.exec(files[idx].path)[1] === "png" || regex.exec(files[idx].path)[1] === "jpg" || regex.exec(files[idx].path)[1] === "jpeg" || regex.exec(files[idx].path)[1] === "svg" || regex.exec(files[idx].path)[1] === "tiff" ? <ImageIcon fill='#81D4FA' /> : "unidentified"}
                                </Box>
                                <Box display='flex' textAlign={'center'} justifyContent='center' alignItems={'center'}>
                                    <Typography variant='p'>{files[idx].path.split('/').pop()}</Typography>
                                </Box>
                            </Box>
                        </animated.div>
                    );
                }
                return result;
            }, [])}

            <Button hidden={files.length <= 4} onClick={handleClickOpen} sx={{
                marginBottom: '10px',
                visibility: files.length > 4 ? 'visible' : 'hidden'
            }}>
                <Typography color={'black'} variant='p'>{t('and-more')}</Typography>
            </Button>


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <Box
                    sx={{
                        py: '30px'
                    }}
                >
                    <Typography textAlign={'center'} variant='h3'>{t('all-files')}</Typography>
                    {files.map((file, index) => (
                        <Box
                            sx={{
                                width: '500px',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                py: 1
                            }}
                            key={index}
                        >
                            <Box width={'40px'}>
                                {regex.exec(file.path)[1] === "pdf" ? <PdfIcon fill='#f40f02' />
                                    : regex.exec(file.path)[1] === "docs" || regex.exec(file.path)[1] === "doxs" ? <WordIcon fill='#2D92D4' />
                                        : regex.exec(file.path)[1] === "xml" ? <ExcelIcon fill='#388E3C' />
                                            : regex.exec(file.path)[1] === "png" || regex.exec(file.path)[1] === "jpg" || regex.exec(file.path)[1] === "jpeg" || regex.exec(file.path)[1] === "svg" || regex.exec(file.path)[1] === "tiff" ? <ImageIcon fill='#81D4FA' /> : "unidentified"}
                            </Box>
                            <Box display='flex' textAlign={'center'} justifyContent='center' alignItems={'center'}>
                                <Typography variant='p'>{file.path.split('/').pop()}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Dialog>
        </>
    )
}

export default Files;