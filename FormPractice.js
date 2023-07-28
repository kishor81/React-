import { FormControl, FormControlLabel, FormLabel, RadioGroup, TextField, Radio, Button} from "@mui/material";
import { useState } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";

function FormPractice() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
   
  });

  const validatorSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    gender: Joi.string().required(),
    rating: Joi.number().required(),
  });

  const [errorData, setErrorData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
   
  });

  const validateData = () => {
    const { error } = validatorSchema.validate(data, { abortEarly: false });
    if (error) {
      let updatedError = {};
      for (let item of error.details) {
        updatedError[item.path[0]] = item.message;
      }
      setErrorData(updatedError);
      return false;
    }
    setErrorData({
      name: "",
      email: "",
      phone: "",
      gender: "",
    
    });
    return true;
  };

  const save = () => {
    const validate = validateData();
    if (validate) {
      alert("Form is Success!");
    }
  };

  const handleChange = (event) => {
    let updatedData = { ...data };
    updatedData[event.target.name] = event.target.value;
    setData(updatedData);
  };

  return (
    <div style={{ padding: 12 }}>
      <TextField
        required
        error={errorData.name ? true : false}
        helperText={errorData.name}
        name="name"
        value={data.name}
        onChange={handleChange}
        style={{ width: "100%", marginTop: 12 }}
        id="filled-basic"
        label="Name"
        variant="filled"
      />

      <TextField
        required
        error={errorData.email ? true : false}
        helperText={errorData.email}
        name="email"
        value={data.email}
        onChange={handleChange}
        style={{ width: "100%", marginTop: 12 }}
        id="filled-basic"
        label="Email"
        variant="filled"
      />

      <TextField
        required
        error={errorData.phone ? true : false}
        helperText={errorData.phone}
        name="phone"
        value={data.phone}
        onChange={handleChange}
        type="number"
        style={{ width: "100%", marginTop: 12 }}
        id="filled-basic"
        label="Phone Number"
        variant="filled"
      />

      <FormControl style={{ marginTop: 12 }}>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          error={errorData.gender ? true : false}
          helperText={errorData.gender}
          name="gender"
          value={data.gender}
          onChange={handleChange}
          aria-labelledby="demo-radio-buttons-group-label"
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>


      <div style={{ marginTop: 12 }}>
        <Button type="button" variant="contained" onClick={save}>
          Submit
        </Button><br></br>
        <Link to="/play-quiz">
          <Button type="button">Proceed to Quiz</Button>
        </Link>
      </div>
      
      <div style={{ marginTop: 12 }}>{JSON.stringify(data)}</div>
    
    </div>
 
  );
}

export default FormPractice;
