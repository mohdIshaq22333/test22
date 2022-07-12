import React, { useState } from "react";
import styles from "styled-components";
import { userState } from "../states/data";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useRouter } from 'next/router'

function Seat() {
  const [userData, setUserData] = useRecoilState(userState);
  const [selected, setSelected] = useState("");
  const [limits, setLimits] = useState([]);
  const [state,setState]=useState(null);
  const router = useRouter()

  const alp = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
  useEffect(() => {
    setLimits([]);
    if (userData.gender === "female") {
      let arr = [];
      for (let o = 0; o < alp.length; o++) {
        arr.push(alp[o] + 3);
        arr.push(alp[o] + 4);
      }
      setLimits((val) => [...arr, ...val]);
    }
    if (userData.age <= 20) {
      let arr2 = [];
      for (let o = 0; o < alp.length; o++) {
        arr2.push(alp[o] + 1);
        arr2.push(alp[o] + 6);
      }
      setLimits((val) => [...arr2, ...val]);
    } else if (userData.age >= 30) {
      let skip = ["H", "I", "J", "K", "L", "M"];
      let arr3 = [];
      for (let o = 0; o < skip.length; o++) {
        for (let y = 1; y < 7; y++) {
          arr3.push(skip[o] + y);
        }
      }
      setLimits((val) => [...arr3, ...val]);
    }
    let userList = [],
    keys = Object.keys(localStorage),
    i = keys.length;
    // userList.push( JSON.parse(localStorage.getItem(keys[i])) );

while ( i-- ) {
  userList.push(JSON.parse(localStorage.getItem(keys[i])));
}
for (let i = 0; i < userList.length; i++) {
  if(userList[i].seat){
      setLimits((val) => {
        let tempp=[ ...val];
      tempp.push( userList[i].seat );
      return tempp;
      });
    }
  
}
  }, []);
  function selectSeat(seat) {
    if (limits.includes(seat) || selected.includes(seat)) return;
    setSelected(seat);
  }
  function submit(){
    if(state==="loading")return;
    setState("loading");
    if (userData.gender && selected!=="") {
      localStorage.setItem(`${userData.id}`, JSON.stringify({ seat: selected,...userData}));
  setState("success");
  router.push('/');
    }else {
      setState("missing");
      return;
    }
  }
  return (
    <MainDiv>
      <div className="innerMainCont">
        <h1>Select Seat</h1>
        <div className="seatsCont">
          <div className="block1">
            <div className="num">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
            <div className="innerBlock">
              {alp.map((val, index) => (
                <div className="rowCont" key={index}>
                  <h3>{val}</h3>
                  <div className="seats">
                    {[...new Array(3)].map((_, ind) => (
                      <span
                        id={
                          !(
                            limits.includes(`${val + (ind + 1)}`) ||
                            selected.includes(`${val + (ind + 1)}`)
                          )
                            ? "available"
                            : ""
                        }
                        onClick={() => {
                          selectSeat(`${val + (ind + 1)}`);
                        }}
                        className="seat"
                        key={ind}
                      ></span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="block2">
            <div className="num">
              <span>4</span>
              <span>5</span>
              <span>6</span>
            </div>
            <div className="innerBlock">
              {alp.map((val, index) => (
                <div className="rowCont" key={index}>
                  <div className="seats">
                    {[...new Array(3)].map((_, ind) => (
                      <span
                      id={
                        !(
                          limits.includes(`${val + (ind + 4)}`) ||
                          selected.includes(`${val + (ind + 4)}`)
                        )
                          ? "available"
                          : ""
                      }
                      onClick={() => {
                        selectSeat(`${val + (ind + 4)}`);
                      }}
                      className="seat" key={ind}></span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        { state === "loading" && <p>Loading....</p> }
{ state === "missing" && <p>User is missing or seat is not selected</p> }
{ state === "success" && <p>Successfully submitted</p> }
        <span onClick={submit} className="submit">
          Submit
        </span>
      </div>
    </MainDiv>
  );
}

export default Seat;

const MainDiv = styles.div`
.innerMainCont{
  margin: 40px 0px 0px 100px;
  width: 300px;
}
.submit{
  display: block;
  background: #008000a1;
  width: 130px;
  text-align: center;
  padding: 8px;
  margin: 30px auto;
  cursor:pointer;
  color:white;
}
.seatsCont{
    display:flex;
    justify-content:space-between;
    .block1, .block2{
        width: 45%;
        h1{
            font-size: 24px;
        }
        .num{
            display: flex;
       font-size: 20px;
        justify-content: space-between;
        span:nth-child(1){
        margin-left:25%;
        }
        span{
        width:25%;
        display:inline-block;
        text-align:center;
        }
        }
        .rowCont{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            height: 40px;
            h3{
            width: 25%;
            text-align: center;
            }
            .seats{
                display:inline-block;
                width:75%;
                display: flex;
    justify-content: space-between;
    cursor:pointer;
                .seat{
                    display:inline-block;
                    width:27%;
                    background:#8080809c;
                    aspect-ratio: 1/1;
                }
                #available{
                  background:#0080008f;
                }
            }
        }
    }
    .block2{
        .num{
          margin-bottom: 10px;
          padding: 0 12.5%;
          span:nth-child(1){
            margin-left:0%;
            }
        }
    }
}
`;
