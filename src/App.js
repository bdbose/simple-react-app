import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from './store';
import './App.css';
import { ReactComponent as Loader } from './assets/loader.svg';

function App() {
  const { state, dispatch } = useContext(Context);
  const getData = async () => {
    const res = await axios('https://reqres.in/api/users?delay=1');
    dispatch({
      type: 'SET_DATA',
      payload: res.data,
    });
    console.log(res.data.data);
  };
  const getUserData = async (id) => {
    try {
      const res = await axios(`https://reqres.in/api/users/${id}?delay=1`);
      setUserData(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getData();
  }, []);
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState(null);
  return (
    <div className='App'>
      {Object.keys(state.data).length !== 0 ? (
        <div className='user-wrapper'>
          <div className='user-container'>
            {userId ? (
              Object.keys(userData).length !== 0 ? (
                UserCard(userData)
              ) : (
                <center>
                  <Loader
                    style={{
                      width: '100px',
                      height: '100px',
                    }}
                  />
                </center>
              )
            ) : (
              <center>Select A User!</center>
            )}
          </div>
          <div className='btn-wrapper'>
            {state.data.data.map((ele, indx) =>
              Buttons(indx, setUserData, setUserId, ele, getUserData),
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;

function Buttons(indx, setUserData, setUserId, ele, getUserData) {
  return (
    <button
      key={indx}
      className='user-btn-wrapper'
      onClick={() => {
        setUserData({});
        setUserId(ele.id);
        getUserData(ele.id);
      }}>
      {indx + 1}
    </button>
  );
}

function UserCard(userData) {
  return (
    <div className='user-card'>
      <img src={userData.avatar} alt='' />
      <div className='user-details'>
        <h1>
          {userData.first_name} {userData.last_name}
        </h1>
        <h3>{userData.email}</h3>
      </div>
    </div>
  );
}
