import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Link, useParams } from 'react-router-dom';
import { FormControl, MenuItem, InputLabel, Select, Box, Button, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import productService from '../../../services/product';
import { width } from '@mui/system';
import { useTranslation } from 'react-i18next';
import ProductDisplay from '../../../components/PublicWebsite/products/ProductDisplay';

const useStyles = makeStyles({
    image: {
        maxWidth: '50%',
        width: 'auto',
        height: '75vh',
        borderRadius: '0 0 35px 35px'
    },
    text: {
        flexGrow: 1
    },
    button: {
        padding: '10px',
    }
});

const ProductPage = () => {
    const props = {
        name:"Product of the bulgarian academy of sciences",
        authors:[
            "M. Dimitrov",
            "S. Kozuharov",
            "M. Balev",
        ],
        files:[
            "file1.docs",
            "file2.pdf",
            "file3.png",
            "file4.xml",
        ],
        shortDescription:"Lorem ipsum dolor sfiuwegtf qw79egfqgw ew67o 8o7wqg8o7 ftwg8oe 7gf8ow7qeg f67owetgqf67 qit amet, consectetur adipiscing elit. Ut id purus ante. Ut vena, euismod et ante vel, consectetur accumsan diam. Aenean iaculis posuere odio, sit amet pulvinar mauris convallis non. Curabitur tempor ultrices eros, mattis mollis sapien pharetra vel. Incongue vulputate. Nam non diam pellentesque, lacinia ex eget, tristique sem.",
        longDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id purus ante. Ut venenatis felis at porttitor finibus. Etiam a blandit turpis, vitae dictum mauris. Fusce eu urna ac tortor aliquam ultrices. Nullam pharetra molestie nisi eget commodo. Donec sodales, velit pretium sodales euismod, magna leo ultricies ex, pellentesque molestie enim mi sit amet dui. Nullam et nulla et odio varius vulputate nec id leo."
        + "Curabitur nec ultrices est. Donec ornare, mi eget rhoncus volutpat, erat enim dictum ipsum, nec volutpat nulla leo ac elit. In massa magna, euismod et ante vel, consectetur accumsan diam. Aenean iaculis posuere odio, sit amet pulvinar mauris convallis non. Curabitur tempor ultrices eros, mattis mollis sapien pharetra vel. Integer fringilla ligula vel ullamcorper viverra. Suspendisse consequat ligula id congue sodales. Sed elementum turpis id felis congue vulputate. Nam non diam pellentesque, lacinia ex eget, tristique sem."
        + "Nam dictum tincidunt nisl. Maecenas vitae congue urna, id blandit lorem. Mauris bibendum sodales consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo dui, pharetra quis ultricies eu, tincidunt eu nisi. Ut vel mattis sapien, et convallis nisl. Donec ullamcorper ac odio in bibendum. Proin interdum pulvinar condimentum. Etiam vitae congue dui. Pellentesque pulvinar sapien sit amet nibh tempor, in suscipit justo elementum. Vestibulum vulputate dui ac nunc malesuada molestie. Sed lobortis faucibus tortor, non eleifend velit luctus eget. Maecenas egestas, nisi id vulputate consectetur, augue felis aliquet purus, non feugiat nisl risus at velit. Nunc interdum non ex a malesuada. Maecenas mauris nisi, varius ut laoreet nec, vulputate sit amet purus."
        + "Sed tincidunt odio lorem, auctor posuere ipsum varius sit amet. Sed ac gravida urna, id varius mi. Fusce tincidunt eleifend scelerisque. Nam sed egestas leo, vitae posuere felis. Vivamus aliquet, metus ut malesuada pharetra, lacus massa viverra odio, eget pretium neque neque porta massa. Donec ligula nunc, porttitor nec accumsan sodales, tempus ac dolor. Nunc ex ex, bibendum quis purus ac, pulvinar luctus tortor. Phasellus sed finibus libero. Phasellus vitae efficitur nunc, a egestas dui. Vestibulum ac libero commodo, imperdiet ipsum nec, vulputate velit. Maecenas convallis arcu eu lectus tincidunt, quis tincidunt elit venenatis. Nam vitae augue sit amet massa lobortis posuere in et orci. Sed suscipit risus dignissim, pulvinar est sit amet, semper dolor. Maecenas id aliquet libero. Suspendisse potenti. Sed nec libero massa."
        + "Aliquam in mi congue, pulvinar purus id, congue arcu. Donec lacinia ex vitae molestie auctor. Aenean sagittis at leo finibus convallis. Duis interdum dignissim nisl sit amet convallis. Mauris volutpat ut odio quis accumsan. Quisque velit neque, imperdiet ac varius ac, dapibus et tellus. Fusce eleifend egestas risus vehicula pretium. Nam id arcu arcu. Aenean non fermentum quam. Integer in quam vitae enim feugiat facilisis."
        + "Donec velit mauris, placerat eget felis nec, sagittis hendrerit magna. Cras ac erat sit amet ex euismod interdum in sed metus. Vestibulum a placerat neque. Aliquam ac sollicitudin nisl. In fermentum, odio eu faucibus fermentum, ex eros pharetra ipsum, quis congue ex ligula eget augue. Nunc quis malesuada elit. Nunc gravida tellus at lectus posuere, eget fringilla mi congue. Vestibulum sed ullamcorper velit. Phasellus vulputate sapien id arcu scelerisque ornare. Vivamus eu libero imperdiet, tincidunt justo eu, fermentum libero. Nam tempus sit amet lectus non feugiat. Donec quis eros sed neque condimentum varius sed id elit. Donec in dapibus purus. Etiam quis lectus volutpat, vestibulum mauris in, consequat neque. Quisque placerat ultrices ex, at vulputate lorem mattis et. Donec eget odio rhoncus, pulvinar quam eget, volutpat nisl."
        + "Nullam semper nec ante ac vulputate. Duis gravida nisi in ornare hendrerit. Cras vel nisi orci. Nulla in nisl leo. Praesent congue tristique hendrerit. Maecenas hendrerit vitae quam et laoreet. Pellentesque egestas dui at sodales sagittis. Fusce arcu nulla, pellentesque quis hendrerit ut, placerat eget enim. Nunc et nisl dolor. Phasellus vitae turpis ut mauris placerat dictum. Curabitur eu rutrum mauris, id pulvinar lacus. Phasellus lacinia nulla sapien, in venenatis quam convallis id."
        + "Fusce venenatis elit et tellus scelerisque rhoncus. Donec varius lectus quis nisi faucibus, vitae mollis lectus vulputate. Ut risus ex, elementum vel augue non, laoreet facilisis odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed commodo volutpat nisi eget porttitor. Donec efficitur aliquet odio quis laoreet. Nullam scelerisque, libero eget mattis aliquet, urna mauris dignissim nibh, sed interdum tortor felis quis ex. Suspendisse potenti. Aenean accumsan, purus vel porta consequat, est nunc condimentum velit, imperdiet vulputate leo ante vitae nunc."
        + "Donec non elit ac neque varius dapibus. Proin blandit cursus nisl, sed ultrices magna imperdiet et. Nullam quam est, scelerisque et vehicula ultrices, convallis at mi. In dignissim, augue vel mollis varius, leo massa condimentum odio, quis placerat odio lorem eu nisi. Sed et elementum tellus, vitae accumsan nisi. Etiam id fringilla odio, vel ultricies elit. Aliquam efficitur pellentesque erat, quis fringilla magna tincidunt quis. Maecenas cursus faucibus arcu, ut ultricies augue tincidunt ac. Cras ante nisi, tincidunt et enim in, vestibulum sollicitudin risus. Maecenas posuere, odio eget posuere iaculis, diam ligula lacinia ex, id aliquam purus nibh vel dui. Sed euismod euismod sem ac aliquam."
        + "Sed porta tempor faucibus. Donec condimentum eget urna vel ullamcorper. Nam dignissim magna vel risus fringilla fermentum. Sed eleifend ultricies lorem, in pellentesque nibh scelerisque id. Morbi suscipit ut augue eget scelerisque. Nunc commodo dignissim est at viverra. Nunc scelerisque nibh sem, sit amet consequat orci lacinia vel. Donec egestas interdum nisl, ut dignissim diam ornare vitae. Suspendisse blandit ipsum magna, in hendrerit nunc ultrices eget. Vestibulum molestie maximus porttitor. In porta, ante a pellentesque volutpat, ex urna mollis est, ac porta diam neque vitae orci. Vivamus tristique diam tortor, eu aliquam tellus facilisis id.",
        parts:4,
    }
    const classes = useStyles();
    const { id } = useParams();
    const [part, setPart] = useState('');
    const [price, setPrice] = useState('');
    const [product, setProduct] = useState({});
    const regex = /(?:\.([^.]+))?$/;
    const { t } = useTranslation();

    useEffect(() => {
        productService.getProductById(id)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleChange = (event) => {
        product.parts.forEach(part => {
            if (part.id === event.target.value) {
                setPrice(part.price);
            }
        });
        setPart(event.target.value);
    };

    return (
        <>
        <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto', my: 5, }}>
            <Card elevation={1} style={{
                width:'100%'
            }}>
                <Box width={'100%'} height='100%' sx={{
                    display:{sm:'flex', xs:'block'}
                }}>
                    <Box sx={{
                        display:{sm:'flex'},
                        height:{sm:'100%', xs:'auto'},
                        width:{sm:'auto', xs:'100%'}
                    }}>
                        <CardMedia
                            sx={{
                                height:{sm:'100%',xxs:'auto'},
                                width:{sm:'auto', xxs:'100%'}
                            }}
                            component="img"
                            alt='img'
                            image='https://files.porsche.com/filestore/image/multimedia/none/carrange-flyout-911/small/3cf76e8c-6694-11e9-80c4-005056bbdc38;sQ;twebp;c1696;gc/porsche-small.webp'
                        />
                    </Box>
                    <Box >
                        <Box width='100%'  textAlign='center'>
                            <Typography variant='h2'>{props.name}</Typography>
                        </Box>
                        <Box width='100%' height = '100%' border='solid purple 1px' sx={{
                            display:{sm:'flex',xs:'block'}
                        }}>
                            <Box width={'150%'}  border='solid 1px red'>
                                <Box height='20%' justifyContent='center' alignItems='center' textAlign='center' display='flex'>
                                    <Typography variant='p'>by {' '}
                                        {props.authors.map((author,index) => (
                                            <> 
                                                {author}{index == props.authors.length-1? ' ' : ', '}
                                            </>
                                        ))}
                                    </Typography>
                                </Box>
                                <Box height='80%' border='solid 2px purple' padding={'10px'} sx={{ textAlign: 'center' }}>
                                    <Typography>
                                        {props.shortDescription}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box width='100%' border='solid 2px blue'sx={{
                                display:'flex',
                                flexDirection:'column',
                            }}>
                                {props.files.map((file) => (
                                    <Box width='100%' border='solid 1px green'sx={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-evenly',
                                    }}> 
                                        <Box width={'50px'}>
                                            {regex.exec(file)[1] === "pdf"? <img src="/static/images/icons/pdf.svg" width={'50px'}/>
                                            : regex.exec(file)[1] === "docs" || regex.exec(file)[1] === "doxs"? <img src="/static/images/icons/word.svg" width={'50px'}/>
                                            : regex.exec(file)[1] === "xml"? <img src="/static/images/icons/excel.svg" width={'50px'}/>
                                            : regex.exec(file)[1] === "png" || regex.exec(file)[1] === "jpg" || regex.exec(file)[1] === "jpeg" || regex.exec(file)[1] === "svg" || regex.exec(file)[1] === "tiff"? <img src="/static/images/icons/image.svg" width={'50px'}/> : "unidentified"}
                                        </Box>
                                        <Box display='flex' textAlign={'center'} justifyContent='center' alignItems={'center'}>
                                            <Typography variant='p'>{file}</Typography>
                                        </Box>
                                    </Box>
                                ))}  
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Card>
            <Card elevation={1} sx={{ mt: 4 }}>
                    <CardContent>
                        <Typography
                            variant='h3'
                            sx={{
                                textAlign: 'center',
                                position: 'relative',
                                ':after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '10%',
                                    height: '3px',
                                    bottom: '-10px',
                                    left: '45%',
                                    borderBottom: '3px dashed',
                                    borderColor: 'background.bordoRed'
                                }
                            }}
                        >
                            {t('description')}
                        </Typography>
                        <Box sx={{ mt: 4 }}>
                            <Typography variant='p'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget maximus tortor, vitae varius tellus. Morbi nec nisl et eros tempus porttitor. Phasellus mattis leo ligula, sed vehicula quam lacinia et. Ut sagittis nunc in lorem euismod faucibus. Vestibulum at lectus vel risus eleifend tristique. Vestibulum eu interdum mauris. Duis diam arcu, laoreet quis ullamcorper a, elementum sed leo. Morbi interdum mi vitae ex pellentesque cursus. Suspendisse potenti. Sed et elit pharetra, dignissim sapien id, iaculis nulla. Donec in ligula nisi. Vivamus nisl lacus, fermentum at blandit quis, condimentum vitae neque. Mauris elementum, metus a rhoncus rutrum, justo purus faucibus ligula, quis fringilla sem velit sed neque. Aliquam erat volutpat. Ut mollis dolor eros.

                                Mauris eget consequat mauris. Duis sed placerat libero. Sed ante ante, condimentum dignissim molestie rhoncus, dictum eget lacus. In ut lobortis augue. Aliquam tempus, ex vitae laoreet imperdiet, magna lorem venenatis augue, ac scelerisque orci nisi a ante. Fusce molestie, risus ac dictum semper, arcu ante convallis velit, aliquet faucibus enim enim id magna. Ut ullamcorper ipsum in est viverra rhoncus. Donec ac erat condimentum, porta dolor at, aliquam mauris. Donec euismod enim consectetur arcu mattis consectetur. Donec porttitor semper sollicitudin. Curabitur a sagittis erat. Sed et tellus ipsum. Ut pulvinar malesuada mauris et porttitor. In consectetur massa eget leo iaculis fringilla. Aliquam id sollicitudin lacus, nec gravida massa. In placerat eros in orci convallis aliquam.

                                Suspendisse potenti. Phasellus congue sed velit ut aliquam. Duis dignissim suscipit quam non condimentum. Aenean lacus odio, rutrum quis tortor sed, consectetur cursus leo. Sed eu blandit nunc, non tempus tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet quam aliquam consequat tempus. Nullam hendrerit dictum purus id ultricies. Praesent cursus pulvinar purus, quis pulvinar lacus consectetur sed. Fusce at fringilla ex. Vivamus egestas tempus urna eu consequat. Suspendisse efficitur sem eget volutpat hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus aliquam vehicula massa eu pretium.

                                Quisque ut fermentum odio, sit amet tristique urna. Phasellus tincidunt velit sem, et vehicula turpis volutpat eget. Aliquam porta ac tortor a bibendum. Curabitur fermentum cursus massa, vel egestas dui tincidunt vel. Nam sit amet euismod turpis, ac volutpat nunc. Nullam elementum aliquam elit ut consequat. Cras pulvinar orci sed lacus tristique, at finibus eros ullamcorper. Mauris at neque vitae nisi vulputate pharetra eu vitae nibh. Praesent mattis odio in aliquet laoreet. Vivamus odio nunc, efficitur vel mauris in, tristique auctor nunc. Nam lorem est, viverra pretium fermentum in, pharetra sed nisi. Curabitur nec tincidunt libero.

                                Nam sem purus, ultricies sed mollis ut, ullamcorper eu ex. Proin at nulla purus. Vestibulum ut eros sed massa fermentum placerat sed et massa. Praesent in posuere ipsum, ut sodales tellus. Vestibulum a eleifend risus. Nunc non justo quis nisi pulvinar viverra id sed velit. Suspendisse sed ex erat. Nullam nibh diam, pharetra eu felis in, vulputate tempor tortor. Pellentesque eu dolor at sapien rutrum pharetra. Sed efficitur massa quis orci consequat, non sagittis eros finibus. Donec mattis consequat facilisis.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
            <Container maxWidth={'false'} sx={{ width: '85%', margin: '0 auto', my: 5, position: 'relative' }}>
                <Typography
                    variant='h3'
                    sx={{
                        textAlign: 'center',
                        position: 'relative',
                        mb: 2,
                        ':after': {
                            content: '""',
                            position: 'absolute',
                            width: '10%',
                            height: '3px',
                            bottom: '-10px',
                            left: '45%',
                            borderBottom: '3px dashed',
                            borderColor: 'background.bordoRed'
                        }
                    }}
                >
                    {t('simular-products')}
                </Typography>
                <ProductDisplay />
        </Container>
        </>
    );
}

export default ProductPage;