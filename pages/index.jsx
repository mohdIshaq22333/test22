import { useEffect, useState } from "react";
import Link from "next/link";
import Style from "styled-components";

export default function Home() {
  const [list, setList] = useState([]);
  const [deletee, setDeletee] = useState(-1);

  useEffect(() => {
    if (window) {
      let temp = JSON.parse(window.localStorage.getItem("list"));
      setList(() => (temp ? temp : []));
    }
  }, []);
  function deleteFunc(num){
setList(()=>{
  let temp=list.filter((val,index)=>index!==num);
  window.localStorage.setItem("list", JSON.stringify(temp));
return temp;
})
setDeletee(-1);
  }
  // function compare( a, b ) {
  //   if ( a.name < b.name ){
  //     return -1;
  //   }
  //   if ( a.name > b.name ){
  //     return 1;
  //   }
  //   return 0;
  // }
  
  return (
    <MainDiv >
      <div className="mainCont">
        <div className="header">
          <h1>List of Contacts</h1>
          <Link href="/add-contact">
            <a> +Add </a>
          </Link>
        </div>
        <table className="listContainer">
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Type</th>
            <th>WhatsApp</th>
          </tr>
          {list.map((val, index) => 
            <tr key={index}>
              <td>
                <img src={val.url} alt="" />
                <span> {val.name}</span>
                </td>
              <td>{val.number}</td>
              <td>{val.type}</td>
              <td className="dot">{val.whatsapp ? "Yes" : "No"}</td>
              <div className="editAndDelete">
                <span>
                <Link href={`/edit-contact/${index}`}>
            <a>  edit </a>
          </Link>
                 
                  </span><span onClick={()=> setDeletee(index)}>delete</span>
              </div>
            </tr>
            
          )}

        </table>
        {
          !list[0] && <span className="noContacts">No contacts</span>
        }
      </div>
      <div className={deletee!==-1 ? "popUp active" : "popUp"}>
        <div className="confirmCont">
        <p>Are you sure</p>
        <div className="btns">
          <span onClick={()=> deleteFunc(deletee)}>Yes</span><span onClick={()=> setDeletee(-1)} >No</span>
        </div>
        </div>
      </div>
    </MainDiv>
  );
}
const MainDiv = Style.div`
.popUp{
  display:none;
}
.popUp.active{
  position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000a3;
    .confirmCont{
      background: white;
      padding: 12px;
      border-radius: 14px;
      width: 60%;
      max-width: 300px;
      height: 150px;
      p{
        font-size: 24px;
        color: black;
        text-align:center;
      }
        .btns{
          width: fit-content;
          margin: auto;
          span{
            font-size: 21px;
            color: red;
            margin-right: 20px;
            cursor:pointer;
          }
          span:nth-child(2){
            margin-right:0;
            color:grey;
          }
        
      }
    }
}
.mainCont{
font-family: Poppins;
max-width:600px;
margin:auto;
}
.noContacts{
  display: flex;
  margin: auto;
  width: fit-content;
  margin-top: 100px;
  font-size: 20px;
}
.header{
  display: flex;
    width: 95%;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    h1{
      font-size: 20px;
    }
    a{
      background: #0096FF;
      color: white;
      border-radius: 9px;
      padding: 4px 7px;
      font-size: 14px;
    }
}
.listContainer{
  width:98%;
  margin-top:30px;
tr{
  margin-bottom:15px;
}
  th{
    text-align: start;
    font-size: 13px;
  }
  td{
    font-size: 12px;
  
  }
  td:nth-child(1){
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    img{
      width:30px;
      height:30px;
      border-radius: 50%;
    }
  }
.editAndDelete{
  font-size: 12px;
    width: 46px;
    display:flex;
    span{
      color:red;
      cursor:pointer
    }
    span:nth-child(1){
      color:green;
      margin-right:10px;
    }
}
}
`;
