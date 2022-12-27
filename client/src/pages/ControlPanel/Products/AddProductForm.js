import React from 'react';
import { useState } from 'react';
import { 
  Box,
  Autocomplete,
  FormControl,
  TextField,
  Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  textField: {
    width:"35vw",
    paddingTop:"10px",
    paddingRight:"10px",
  }
}));

const AddProductForm = () => {

  const { t } = useTranslation();
  const classes = useStyles();

  const AuthorOptions = [
    'Miroslav Dianov Balev',
    'Mihail Vladimirov Dimitrov',
    'Stefan Ivanov? Kojuharov',
  ];

  const CategoryOptions = [
    'Zelen',
    'Biologi4en',
    'Grozen',
  ];

  const [state, setState] = useState({
    ProductName : "",
    Author : "",
    ShortDescription : "",
    LongDescription : "",
    Category : "",
    Parts : "",
  });

  const [Authors, setAuthors] = useState([]);
  const [Categories, setCategories] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // gather form data and call onSubmit callback function
  }

  function handleAddAuthorClick() {
    if(!Authors.includes(state.Author) && state.Author != ""){
      setAuthors([...Authors, state.Author]);
    }
  }

  function handleRemoveAuthorClick(index) {
    const newValues = [...Authors];
    newValues.splice(index, 1);
    setAuthors(newValues);
  }

  function handleAddCategoryClick() {
    console.log()
    if(!Categories.includes(state.Category) && state.Category != ""){
      setCategories([...Categories, state.Category]);
    }
  }

  function handleRemoveCategoryClick(index) {
    const newValues = [...Categories];
    newValues.splice(index, 1);
    setCategories(newValues);
  }

  return (
    <FormControl onSubmit={handleSubmit} style={{
      marginLeft:"auto",
      marginRight: "auto",
    }}>
      <Box display={"flex"} justifyContent={"space-between"}>
      <Box>
      <TextField className={classes.textField} label={t("product-name")} type="text" required />
      <Autocomplete
        name="Authors"
        options={AuthorOptions}
        value={state.Author}
        onChange={(event, newValue) => {
          setState({ ...state, Author: newValue });
        }}
        freeSolo
        renderInput={(params) => (
          <TextField className={classes.textField} {...params} label={t("authors")} variant="outlined" onChange={(event) => {
            const newValue = event.target.value;
            setState({ ...state, Author: newValue});
          }}/>
        )}
      />
      <Button onClick={handleAddAuthorClick}>{t("add")}</Button>
      <ul>
        {Authors.map((value, index) => (
          <li key={index}>
            {value}
            <Button onClick={() => handleRemoveAuthorClick(index)}>{t("remove")}</Button>
          </li>
        ))}
      </ul>
      <TextField
        className={classes.textField}
        name="ShortDescription"
        label={t("short-description")}
        multiline
      />
      </Box>
      <Box>
      <TextField className={classes.textField} label={t("parts")} type="number" required />
      <Autocomplete
        name="Categories"
        options={CategoryOptions}
        value={state.Category}
        onChange={(event, newValue) => {
          setState({ ...state, Category: newValue });
        }}
        freeSolo
        renderInput={(params) => (
          <TextField className={classes.textField} {...params} label={t("category")} variant="outlined" onChange={(event) => {
            const newValue = event.target.value;
            setState({ ...state, Category: newValue});
          }}/>
        )}
      />
      <Button onClick={handleAddCategoryClick}>{t("add")}</Button>
      <ul>
        {Categories.map((value, index) => (
          <li key={index}>
            {value}
            <Button onClick={() => handleRemoveCategoryClick(index)}>{t("remove")}</Button>
          </li>
        ))}
      </ul>

      <TextField
        className={classes.textField}
        name="LongDescription"
        label={t("long-description")}
        multiline
      />
      </Box>
      </Box>

      <Button variant="contained" color="primary" type="submit">
        {t("create")}
      </Button>
    </FormControl>
  );
};

export default AddProductForm;