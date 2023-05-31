import { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, Button, Avatar } from '@mui/material';
import Link from 'next/link';
import commentService from '../../services/comment';
import moment from 'moment';
import 'moment/locale/bg';
import { useTranslation } from 'next-i18next';
import useAuth from '../../hooks/useAuth';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Comment = ( {props} ) =>{

    const { user } = useAuth();
    const { t, i18n } = useTranslation();
    moment.locale(i18n.language);

    const userData = {
        id: props.userId,
        name: props.user.name,
        image: props.user.avatar_path
    }

    const commentData = {
        id: props.id,
        createdAt: moment(props.created_at).fromNow(),
        text: props.comment,
    }

    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)
    const [likes, setLikes] = useState(0)

    const likeData = {
        user_id:1,
        comment_id:props.id
    }

    useEffect(() => {
        if(user){
            props.comment_likes.forEach(element => {
                if(element.liked){
                    if(user.id == element.user_id){
                        setLiked(true)
                    }
                }else{
                    if(user.id == element.user_id){
                        setDisliked(true)
                    }
                }
            });
        }
        
        }, [user]);

        useEffect(() => {
            let currentLikes = 0
            console.log("cock")
            props.comment_likes.forEach(element => {
                if(element.liked){
                    currentLikes+=1
                }else{
                    currentLikes-=1
                }
            });
            setLikes(currentLikes);
            }, []);

    function like() {
        commentService.like(likeData)
        .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    function dislike() {
        commentService.dislike(likeData)
        .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    function clear() {
        commentService.clearLike(likeData)
        .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    

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
            clear()
            setLiked(false)
            setLikes(likes-1)
        }else{
            like()
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
            clear()
            setDisliked(false)
            setLikes(likes+1)
        }else{
            dislike()
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
                <Avatar sx={{width:'100%', color:'white', bgcolor:'#96011c'}} src={`${process.env.REACT_APP_ASSETS}/${userData.image}`} variant='rounded'></Avatar>
            ):(
                <Avatar sx={{width:'100%', height:'100%', color:'white', bgcolor:'#96011c', overflow:'hidden', fontSize:'60px'}} variant='rounded'>{userData.name[0]}</Avatar>
            )}
            </Box>
            <Box flex={11}>
                <Box display={'flex'}>
                    <Link href={"/profile/" + userData.id}>
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