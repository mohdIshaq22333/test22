import React, { useState, useEffect } from "react";
import styles from "styled-components";
import storage from "../firebase/index.js"
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,  
} from "firebase/storage";

function AddContact() {
  const [status, setStatus] = useState(false);
  const [list, setList] = useState([]);
  const [file, setFile] = useState();
  useEffect(() => {
    if (window) {
      let temp = JSON.parse(window.localStorage.getItem("list"));
      setList(() => (temp ? temp : []));
    }
  }, []);
  useEffect(() => {
    if (window && list[0]) {
      window.localStorage.setItem("list", JSON.stringify(list));
    }
  }, [list]);
  const [details, setDetails] = useState({
    name: "",
    number: "",
    whatsapp: false,
    type: "",
  });
  function submit(url) {
    if(!url){
      setStatus(-2);
return;
    }
    setList((val) => {
      let obj=details;
      obj.url=url
      let temp = [obj, ...list];
      return temp;
    });
    setStatus(1);
  }
    function mainSubmit(e){
    e.preventDefault();
    setStatus(0);
    if (details.name == "" || details.number == "" || details.type == "" || !file) {
      setStatus(-1);
      return;
    }
    const storageRef = ref(storage, `/imgs2/${details.name}`);
   const uploadTask= uploadBytesResumable(storageRef, file);
    const url=  uploadTask.then(()=>getDownloadURL(uploadTask.snapshot.ref).then((url) => {
       submit(url);
    }));
  }
  return (
    <MainDiv>
      <form>
        <h1>Add Contact</h1>
        <input
          placeholder="Name"
          type="text"
          value={details.name}
          onChange={(e) =>
            setDetails((val) => ({ ...val, name: e.target.value }))
          }
        />
        <input
          placeholder="Number"
          type="number"
          value={details.number}
          onChange={(e) =>
            setDetails((val) => ({ ...val, number: e.target.value }))
          }
        />
        <select
          name="type"
          id="type"
          value={{ label: details.type, value: details.value }}
          onChange={(e) =>
            setDetails((val) => ({ ...val, type: e.target.value }))
          }
        >
          <option disabled selected value>
            {" "}
            -- select type --{" "}
          </option>
          <option value="personal">Personal</option>
          <option value="office">Office</option>
        </select>
        <div className="checkBox">
          <span>Whatsapp</span>
          <input
            type="checkbox"
            checked={details.whatsapp}
            onChange={(e) =>
              setDetails((val) => ({ ...val, whatsapp: e.target.checked }))
            }
          />
          
        </div>
        <label style={{marginBottom:"20px"}} htmlFor="profile">User Image:</label>
        <input
          placeholder="User profile"
          type="file"
          id="profile"
          accept="image/*"
          onChange={(e) =>{
           setFile(e.target.files[0]);
          }
          }
        />
        {status === -1 && <p>All fields are required</p>}
        {status === 0 && <p>Loading....</p>}
        {status === 1 && <p>Form Submitted</p>}
        {status === -2 && <p>Something went wrong</p>}

        <input
          className="submit"
          type="submit"
          value="Submit"
          onClick={mainSubmit}
        />
      </form>
    </MainDiv>
  );
}

export default AddContact;

const MainDiv = styles.div`
font-family: Poppins;
form{
    width: 95%;
    margin: auto;
    max-width: 500px;
    input, select, .checkBox{
        width:100%;
        height: 36px;
        border: none;
        margin-bottom: 25px;
        box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
        padding: 2px 8px;
        border-radius: 6px;
        display:block;
        color:grey;
    }
    .checkBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        input{
            all:revert;
        }
    }
}
`;
