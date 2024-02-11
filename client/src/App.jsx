import { useState } from 'react'
import Navigation from './components/Navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import { useSelector } from 'react-redux';
import { AppContext, socket } from './context/appContext';
import CreatePost from './pages/CreatePost';

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const user = useSelector((state) => state.user)
  return (
    <AppContext.Provider value={{socket ,currentRoom,setCurrentRoom , members,setMembers,messages,setMessages,
    privateMemberMsg,setPrivateMemberMsg ,rooms,setRooms ,newMessages,setNewMessages}}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" exact element={<Home />} />
          {!user &&
            (<>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>)
          }
          <Route path="/chat" element={<Chat />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
export default App
