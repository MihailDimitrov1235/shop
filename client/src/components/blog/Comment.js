import { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Comment = ( {props} ) =>{

    const { t } = useTranslation();

    const userData = {
        id: props.userId,
        name: 'Elon musk',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRD3XP0y2U4ZVpcGsaFUu-tmM7-aD0Luj6FgQgqdJc&s'
    }

    const commentData = {
        id: props.commentId,
        createdAt: '2 hours ago',
        text:"Sometimes I think back on my experience with Inuyasha and my conclusions about it have always been conflicted. It was the first anime that I watched whole heartedly, and it was the first thing that brought me into the realm of Japanese media and culture. I've come to love anime and manga, appreciate the history and the different styles and subtleties that come with every genre and now consider it a very large and colorful part of my life. Naturally I look back on Inuyasha with a sense of fondness,the yellow volumes and DVD's on my shelves only a small testament to the dedication I Sometimes I think back on my experience with Inuyasha and my conclusions about it have always been conflicted. It was the first anime that I watched whole heartedly, and it was the first thing that brought me into the realm of Japanese media and culture. I've come to love anime and manga, appreciate the history and the different styles and subtleties that come with every genre and now consider it a very large and colorful part of my life. Naturally I look back on Inuyasha with a sense of fondness,the yellow volumes and DVD's on my shelves only a small testament to the dedication I "
    }

    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)
    const [likes, setLikes] = useState(3)

    const textContainerRef = useRef(null)
    const [isLong, setIsLong] = useState(false)
    const [fullLength, setFullLength] = useState(false)

    useEffect(() => {
        if (textContainerRef.current.scrollHeight > textContainerRef.current.clientHeight) {
            setIsLong(true);
            } else {
            setIsLong(false);
            }
        }, []);


    const handleLike = () =>{
        if(liked){
            setLiked(false)
            setLikes(likes-1)
        }else{
            setLiked(true)
            if(disliked){
                setLikes(likes+2)
                setDisliked(false)
            }else{
                setLikes(likes+1)
            }
        }
    }
    
    const handleDislike = () =>{
        if(disliked){
            setDisliked(false)
            setLikes(likes+1)
        }else{
            setDisliked(true)
            if(liked){
                setLiked(false)
                setLikes(likes-2)
            }else{
                setLikes(likes-1)
            }
        }
    }

    return(
        <Box display={'flex'} sx={{p:2}}>
            <Box flex={1} sx={{mr:2}}>
                <img style={{borderRadius:'5px'}} src={userData.image}/>
            </Box>
            <Box flex={11}>
                <Box display={'flex'}>
                    <Link to={"/profile/" + userData.id}>
                        <Typography variant='h6' sx={{flex:1}}>{userData.name}</Typography>
                    </Link>
                    <Typography sx={{flex:1}} textAlign={'right'}>{commentData.createdAt}</Typography>
                </Box>
                <Box
                ref={textContainerRef}
                style = {{
                        overflow: fullLength?'visible' :'hidden',
                        textOverflow: 'ellipsis',
                        display: fullLength? 'block' :'-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 5,
                    }}>
                    <Typography >{commentData.text}</Typography>
                </Box>
                {isLong && <Button sx={{ color:'#777777' }} onClick={ () => setFullLength(!fullLength)}>{fullLength? t('read-less') : t('read-more')}</Button>}
                <Box display={'flex'} alignItems={'center'}>
                    <IconButton onClick={handleLike}><ThumbUpIcon sx={{ color: liked?'#96011c': 'inherit'}}/></IconButton>
                    <Typography variant="subtitle1">{likes}</Typography>
                    <IconButton onClick={handleDislike}><ThumbDownIcon sx={{ color: disliked?'#96011c': 'inherit'}}/></IconButton>
                    <Button sx={{ml:'auto'}}><Typography sx={{ color:'#96011c' }} variant="subtitle2">{t('report')}</Typography></Button>
                </Box>

            </Box>
        </Box>
    )
}

export default Comment