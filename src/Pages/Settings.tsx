import { ChangeEvent, useState } from "react";

const Settings: React.FC = () => {

  interface UserInfo {
    username: '',
  }

  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: ''
  })
  const [openSettings, setOpenSettings] = useState(false)
  const [submitName, setSubmitName] = useState<UserInfo[]>([])

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value } = event.target
    setUserInfo({...userInfo, [name]: value})
  }

  const handleNameClick = () => {
    setOpenSettings(!openSettings)
  }

  const handleSubmitName  = () => {
    const updateName = [...submitName, userInfo]
    setSubmitName(updateName)
  }

  return (
    <div>
      <h1>Settings</h1>
      
      {openSettings ?
      <>
        <>
          <p onClick={handleNameClick} style={{cursor: 'pointer'}}>Close</p>
        </>
        <input
            name="username"
            value={userInfo.username}
            onChange={handleUsername} />
            <button onClick={() => {
                handleSubmitName()
                setOpenSettings(false)
              }} 
            >Add</button>
      </> : 
          <>
            <p onClick={handleNameClick} style={{cursor: 'pointer'}}>Change Name</p>
          </>
            }
  {/* <div>
    {submitName.map((name, index) => (
      <div key={index}>{name.username}</div>
    ))}
  </div> */}
  <p>Name: {userInfo.username}</p>
    </div>
  );
};

export default Settings;
