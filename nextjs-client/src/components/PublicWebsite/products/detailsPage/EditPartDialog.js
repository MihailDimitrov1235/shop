import { Dialog, DialogTitle, DialogContent, DialogContentText, Button } from "@mui/material"
import * as Yup from 'yup';
import FormBuilder from "../../../FormBuilder"
import { useTranslation } from "react-i18next";
import formData from '../../../FormBuilder/utils/formData';
import AddIcon from '@mui/icons-material/Add';

const EditPartDialog = ( { open, setOpen, product, setProduct, setPart, setFiles, setPrice } ) => {

    const {t} = useTranslation();

    const handleClose = () =>{
        setOpen(false)
    }
    const fields = [
              {type: 'array', name: 'parts', label: t('parts'), itemLabel: t('part'), fields: [
                // { type: 'text', name: 'name', label: t('name') },
                { type: 'number', name: 'price', label: t('price') },
                { type: 'upload', name: 'upload', label: t('files'), accept: '.jpg,.png,.jpeg,.docx,.pdf,.doc', multiple: true },
              ]}
            
          ]
      
        const onSubmit = (values, { setSubmitting }) => {
        // const data = formData(values, [], ['picture']);

          let newProduct = Object.assign({}, product);
          newProduct.parts = []
          values.parts.forEach((part, index) => {
            let newPart = Object.assign({}, part);
            newPart.files = []
            newPart.id = index + 1
            part.upload.forEach(file => {
              newPart.files.push({'path':file.name})
            });
            newProduct.parts.push(newPart)
          });
          console.log(product)
          setProduct(newProduct)
          console.log(newProduct)
          setPrice(newProduct.parts[0].price)
          setPart(newProduct.parts[0].id)
          setFiles(newProduct.parts[0].files)
          setOpen(false)
        }


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
