import React, { useState } from 'react'
import './Signup.css'
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import  {useSignupUserMutation} from '../services/appApi.js'
import { Link ,useNavigate } from 'react-router-dom';
import botImg from '../assets/bot.jpeg';
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signupUser ,{isLoading , error}] = useSignupUserMutation()
  const [image, setImage] = useState(null);
  const [upladingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
   const navigate = useNavigate();
   
  function validateImg(e) {
    const file = e.target.files[0];

    if(file.size >=1048576){
        return alert("the file size is max 1MB ")
    }else{
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }
  async function uploadImage(){
      const data = new FormData();
      data.append('file',image);
      data.append('upload_preset','craabu0n');

      try{
        setUploadingImg(true);
        let res = await fetch("https://api.cloudinary.com/v1_1/dbtwal7ju/image/upload", {
          method: "post",
          body: data,
      });
      const urlData =await res.json();
      setUploadingImg(false);
      return urlData
      }catch(e){
        setUploadingImg(false)
        console.log(e)

      }
  }
  async function handleSignup(e) {
    e.preventDefault();
    if(!image){
      return alert('Please Upload your profile  picture ');
    }
    const url = await uploadImage(image);
    // console.log(url)
    //sign up the user 
//    console.log(name);
  //  console.log(email)
    //console.log(url.secure_url)
    signupUser({ name, email, password, picture: url.secure_url}).then(({ data }) => {
      if (data) {
        console.log(data);
        navigate("/chat");

      }else{
        console.log("problem here ")

      }
  });
  }
 

  return (
    <Container>
      <Row>
        <Col md={7} className='d-flex align-items-center justify-content-center flex-direction-column'>
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
            <h3 className='text-center'>Create Account </h3>
            <div className="signup-profile-pic__container">
              <img src={ imagePreview||botImg} className="signup-profile-pic" alt="" />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
            </div>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name </Form.Label>
              <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </Form.Group>

            <Button variant="primary" type="submit">
             {upladingImg ?'Signing you up...':'Signup'}
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Already have an account  ?<Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signup__bg">

        </Col>
      </Row>
    </Container>
  )
}

export default Signup