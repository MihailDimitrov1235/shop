import { forwardRef, useState } from 'react'
import { Typography, Box, Button } from '@mui/material';
import { ReactComponent as PdfIcon } from '../../../../assets/icons/pdf.svg';
import { ReactComponent as WordIcon } from '../../../../assets/icons/word.svg';
import { ReactComponent as ExcelIcon } from '../../../../assets/icons/excel.svg';
import { ReactComponent as ImageIcon } from '../../../../assets/icons/image.svg';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Files({files}){

    const [open, setOpen] = useState(false);
    const regex = /(?:\.([^.]+))?$/;
    const { t } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    

    return(
        <>
        <Typography variant='h5'>{t('recieve')}</Typography>
            {files.reduce((result, file, i) => {
                if (i < 4) {
                    result.push(
                        <Box width='100%' sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            py: 1
                        }}>
                            <Box width={'30px'}>
                                {regex.exec(file)[1] === "pdf" ? <PdfIcon fill='#f40f02' />
                                    : regex.exec(file)[1] === "docs" || regex.exec(file)[1] === "doxs" ? <WordIcon fill='#2D92D4' />
                                        : regex.exec(file)[1] === "xml" ? <ExcelIcon fill='#388E3C' />
                                            : regex.exec(file)[1] === "png" || regex.exec(file)[1] === "jpg" || regex.exec(file)[1] === "jpeg" || regex.exec(file)[1] === "svg" || regex.exec(file)[1] === "tiff" ? <ImageIcon fill='#81D4FA' /> : "unidentified"}
                            </Box>
                            <Box display='flex' textAlign={'center'} justifyContent='center' alignItems={'center'}>
                                <Typography variant='p'>{file}</Typography>
                            </Box>
                        </Box>
                    );
                }
                return result;
                }, [])}
                {files.length>4 &&
                <>
                    <Button onClick={handleClickOpen} sx={{
                        marginBottom:'10px'
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
                            py:'30px'
                        }}
                        >
                        <Typography textAlign={'center'} variant='h3'>{t('all-files')}</Typography>
                        {files.map((file) => (
                            <Box width='500px' sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                py: 1
                            }}>
                                <Box width={'40px'}>
                                    {regex.exec(file)[1] === "pdf" ? <PdfIcon fill='#f40f02' />
                                        : regex.exec(file)[1] === "docs" || regex.exec(file)[1] === "doxs" ? <WordIcon fill='#2D92D4' />
                                            : regex.exec(file)[1] === "xml" ? <ExcelIcon fill='#388E3C' />
                                                : regex.exec(file)[1] === "png" || regex.exec(file)[1] === "jpg" || regex.exec(file)[1] === "jpeg" || regex.exec(file)[1] === "svg" || regex.exec(file)[1] === "tiff" ? <ImageIcon fill='#81D4FA' /> : "unidentified"}
                                </Box>
                                <Box display='flex' textAlign={'center'} justifyContent='center' alignItems={'center'}>
                                    <Typography variant='p'>{file}</Typography>
                                </Box>
                            </Box>
                        ))}
                        </Box>
                    </Dialog>
                </>
                }
                {/* View all files dialog box */}
                </>
    )
}

export default Files;