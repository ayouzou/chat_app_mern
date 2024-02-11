import React , {useContext, useState} from 'react'
import "./Login.css";
import { Container, Row ,Form ,Col ,Button, Spinner } from 'react-bootstrap';
import  {useLoginUserMutation} from '../services/appApi.js'
import { Link ,useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser ,{isLoading , error}] = useLoginUserMutation();
  const {socket} =useContext(AppContext)

  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    loginUser({email,password}).then(({data})=>{
      if(data){
        socket.emit('new-user')
          navigate('/chat')
      }
    })

  }
  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg">
        </Col>
        <Col md={7} className='d-flex align-items-center justify-content-center flex-direction-column'>
          <Form style={{width:"80%",maxWidth:500}} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                {error && <p className='alert alert-danger'>{error.data}</p>}
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
            <Button variant="primary" type="submit" >
              {isLoading?<Spinner animation='grow'/> :"Login"}
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Don`t have an account ?<Link to="/signup">Sign-Up</Link> 
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login