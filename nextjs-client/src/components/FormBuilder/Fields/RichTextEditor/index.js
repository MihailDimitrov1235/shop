import { Box, InputLabel } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ name, label, modules, setFieldValue, value }) => {
    if (!modules) {
        modules = {
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                [{ size: [] }],
                [{ 'align': [] }],
                [{ 'direction': 'rtl' }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' }
                ],
                ['link', 'image', 'video'],
                ['clean']
            ]
        }
    }

    const handleOnChange = (event) => {
        setFieldValue(name, event);
    }

    return (
        <Box sx={{ my: 1 }}>
            <InputLabel htmlFor='rich-text-editor' sx={{ pb: 1 }}>{label}</InputLabel>
            <ReactQuill
                id='rich-text-editor'
                theme='snow'
                value={value}
                onChange={handleOnChange}
                modules={modules}
            />
        </Box>
    );
}

export default RichTextEditor;