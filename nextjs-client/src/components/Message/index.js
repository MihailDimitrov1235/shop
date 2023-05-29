import { Alert, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useMessage from '../../hooks/useMessage';

const Message = () => {
    const { message, removeMessage } = useMessage();

    return (
        <Collapse in={!!message}>
            {!!message &&
                <Alert
                    severity={message.status}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                removeMessage();
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message.text}
                </Alert>
            }
        </Collapse>
    );
};

export default Message;