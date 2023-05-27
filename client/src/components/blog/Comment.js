import { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/bg';
import { useTranslation } from 'react-i18next';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Comment = ( {props} ) =>{

    const { t, i18n } = useTranslation();
    moment.locale(i18n.language);

    const userData = {
        id: props.userId,
        name: props.user.name,
        image: props.user.avatar_path
    }

    const commentData = {
        id: props.commentId,
        createdAt: moment(props.created_at).fromNow(),
        text: props.comment,
    }

    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)
    const [likes, setLikes] = useState(props.comment_likes.length)

    props.comment_likes.forEach(element => {
        if(element.liked){
            // TODO CHECK ID OF CURRENT USER
            setLikes(likes+1)
        }else{
            setLikes(likes-1)
        }
    });

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
            {userData.image? (
                <Avatar sx={{width:'100%', color:'white', bgcolor:'#96011c'}} src={userData.image} variant='rounded'></Avatar>
            ):(
                <Avatar sx={{width:'100%', height:'100%', color:'white', bgcolor:'#96011c', overflow:'hidden', fontSize:'60px'}} variant='rounded'>{userData.name[0]}</Avatar>
            )}
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