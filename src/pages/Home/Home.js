import React, { useState } from 'react';
import "./Home.css";
import { Button, MenuItem, TextField } from '@mui/material';
import Categories, { } from "../../Data/Categories"
import { useNavigate } from "react-router-dom";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const Home = ({name, setName, fetchQuestions}) => {

  const [category, setCategory] = useState ("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () =>{
    if(!category || !name){
      setError(true);
      return;
    }
    else{
      setError(false);
      fetchQuestions(category);
      navigate("/quiz");
    }
  };

  return (
    <div className='content'>
      <div className='settings'>
        <span style={{fontSize: 30}} >Quiz Settings</span>

          {error && <ErrorMessage>Please Fill all fields</ErrorMessage>}

        <div className='settings_select'>

          <TextField 
          style={{marginBottom: 25}} 
          label="Enter Your Name" 
          variant='outlined' 
          onChange={(e) => setName(e.target.value)}
          />

          <TextField 
          select 
          label="Select Category" 
          variant='outlined'
          style={{marginBottom: 30}}
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          > 
            {
              Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
              ))
            }

          </TextField>

            <Button variant='contained' color='primary' size='large' onClick={handleSubmit}>
              Start Quiz
            </Button>

        </div>

      </div>
      <img src='/quiz.svg' className='banner' alt='quiz img' />
    </div>
  )
}

export default Home
