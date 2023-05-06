import { Dialog, DialogTitle, DialogContent, DialogContentText, Button } from "@mui/material"
import * as Yup from 'yup';
import FormBuilder from "../../../FormBuilder"
import { useTranslation } from "react-i18next";
import AddIcon from '@mui/icons-material/Add';

const EditPartDialog = ( { open, setOpen, onSubmit } ) => {

    const {t} = useTranslation();

    const handleClose = () =>{
        setOpen(false)
    }
    const fields = [
              {type: 'array', name: 'parts', label: t('parts'), itemLabel: t('part'), fields: [
                { type: 'number', name: 'price', label: t('price') },
                { type: 'upload', name: 'uploader', label: t('files'), accept: '.jpg,.png,.jpeg,.docx,.pdf,.doc', multiple: true },
              ]}
            
          ]
      
    
      const validationSchema = Yup.object().shape({
        parts: Yup.array().of(Yup.object().shape({
          price: Yup.number().required(t('price-required'))
        }))
      });

    return (
        <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Edit Part</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('edit-part-msg')}?
          </DialogContentText>
          <FormBuilder
            fields={fields}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button onClick={handlePartsChange} color="secondary">
            {t('change')}
          </Button>
        </DialogActions> */}
      </Dialog>
    )
}

export default EditPartDialog