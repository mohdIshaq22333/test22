import {useState,useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "styled-components";

function Card({data}) {
  const [users,setUsers]=useState([]);
  useEffect(() => {
    let arr=[];
    setUsers([]);
  let  keys = Object.keys(localStorage),
    i = keys.length;
while ( i-- ) {
  arr.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  for (let i = 0; i < arr.length; i++) {
    if(arr[i].seat){
      setUsers((val)=>{
       let temp= [ ...val];
       temp.push(arr[i]);
       return temp;
      });
    }
    
  }

  },[])
  return (
    <MainDiv>
<Link href={"/add-user"}><a >
        <div className="cardInnerCont">
      <div className="imgCont">
        <Image src={data.image ? data.image :  "/dummyImg.jpg"} layout="fill" />
      </div>
      <div className="infoCont">
        <span>
          Title: <span>{data.title}</span>{" "}
        </span>
        <span>
          Year: <span>{data.year}</span>{" "}
        </span>
        <span>
          Detail: <span>{data.detail1}</span>{" "}
        </span>
      </div>
      </div>
    </a></Link>
      <div className="users">
        {
!users[0] &&
        <div className="noUser">NO user registered</div>
        }
           {
users[0] &&
       users.map((val,index)=>
       <div className="sing" key={index}>
        <span>{val.name}</span><span>{val.seat}</span>
       </div>
       )
        }
      </div>
    </MainDiv>
  );
}

export default Card;

const MainDiv = styles.div`
.sing{
  display: block;
  background: #008000a1;
  width: 200px;
  text-align: center;
  padding: 8px;
  margin: 30px auto;
  cursor:pointer;
  color:white;
  span:nth-child(1){
    margin-right:15px;
  }
}
.cardInnerCont{
background:grey;
display:flex;
align-items: center;
padding:10px;
width: 780px;
max-width: 70vw;
}
.imgCont{
    margin-right:20px;
    position:relative;
    width:300px;
    height:150px;
    img{
      object-fit:cover;
    }
}
.infoCont{
    color:black;
    font-weight:bold;
    display: flex;
    flex-direction: column;
    span{
        margin-bottom: 15px;
    }
    span span{

    }
}
.users{
    .noUser{
        color:white;
        background:red;
        widht:200px;
        padding:10px;
        width: 200px;
    margin: 30px auto;
    text-align: center;
    }
}

`;
