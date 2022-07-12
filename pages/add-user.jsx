import React, { useState, useEffect } from "react";
import styles from "styled-components";
import Image from "next/image";
import { userState,dataState } from "../states/data";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router'

function AddContact() {
  const router = useRouter()
  const [_, setUserData] = useRecoilState(userState);
  const [user,setUser]=useState({
    name:"",
    age:"",
    gender:"",
  });
  const [state,setState]=useState(null);
  // const [userState, setUserState] = useRecoilState(userState);
  const [listState, setListState] = useRecoilState(dataState);
function userSubmit(){
  if(state==="loading") return;
  setState("loading");
  if(user.name==="" || user.age==="" || user.gender==="" ) {
    setState("missing");
    return;
  }
  const id=uuidv4();
  const userInfo={...user, id: id};
  localStorage.setItem(`${id}`, JSON.stringify(userInfo))
  setUserData(userInfo);
  setState("success");
  router.push('/seat');
}
  return (
    <MainDiv>
      <div className="topImg">
        <Image src={listState.image ? listState.image :  "/dummyImg.jpg"} layout="fill" />
        <h1>{listState.title}</h1>
      </div>
      <div className="infoCont">
        <span>
          Details1: 
          <span>{listState.detail1}</span>
        </span>
        <span>
        Details2: 

          <span>{listState.detail2}</span>
        </span>
        <span>
          Deadline: 
          <span>{listState.exam_date}</span>
        </span>
        <span>
          Eligibility: 
          <span>{listState.Eligibility}</span>
        </span>
      </div>
      <div className="userDetails">
        <p className="enterDetails">Enter Details:</p>
        <input value={user.name} onChange={(e)=>setUser((val)=>({...val,name:e.target.value}))} type="text" placeholder="Name"/>
        <input value={user.age} onChange={(e)=>setUser((val)=>({...val,age:e.target.value}))} type="number" placeholder="Age"/>
        <select value={user.gender} onChange={(e)=>setUser((val)=>({...val,gender:e.target.value}))}  name="gender" id="gender">
        <option value="">Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="other">Other</option>
</select>
{ state === "loading" && <p>Loading....</p> }
{ state === "missing" && <p>All fields are required</p> }
{ state === "success" && <p>Successfully submitted</p> }
<span onClick={userSubmit} className="selectSeat">Select Seat</span>
      </div>
    </MainDiv>
  );
}

export default AddContact;

const MainDiv = styles.div`
width: 100%;
.topImg{
  margin-right:20px;
  position:relative;
  width:100%;
  height:40vw;
  max-height: 220px;
  img{
    object-fit:cover;
  }
}
h1{
  z-index: 9;
    position: absolute;
    bottom: 0;
    left: 30px;
    font-size: 20px;
}
.infoCont{
  margin-top:20px;
  span{
    font-size:16px;
    font-weight:bold;
    display:block;
    margin: 6px 25px;
    font-size: 18px;
span{
  display:inline-block;
  color:grey;
}
  }
}
.userDetails{
  width:fit-content;
  p{
    text-align: center;
    font-size: 17px;
  }
  .enterDetails{
    font-size: 22px;
    margin-left: 35px;
    margin-top: 45px;
    text-align: initial;
  }
  input, select{
    display: block;
    padding: 10px;
    margin: 16px 26px;
    border: none;
    background: gray;
    color: black;
    width:350px;
  }
  input::placeholder {
    color: black;
  }
  .selectSeat{
    display: block;
    background: #008000a1;
    width: 130px;
    text-align: center;
    padding: 8px;
    margin: 30px auto;
    cursor:pointer;
  }
  }
`;
