import { useEffect, useState } from "react";
import Link from "next/link";
import Style from "styled-components";

export default function Home() {
  const [list, setList] = useState([]);
  useEffect(() => {
    if (window) {
      console.log(JSON.parse(window.localStorage.getItem("list")));
      let temp = JSON.parse(window.localStorage.getItem("list"));
      setList(() => (temp ? temp : []));
    }
  }, []);
  function deleteFunc(num){
setList(()=>{
  let temp=list.filter((val,index)=>index!==num);
  window.localStorage.setItem("list", JSON.stringify(temp));
  console.log(temp);
return temp;
})
  }
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
              <td>{val.name}</td>
              <td>{val.number}</td>
              <td>{val.type}</td>
              <td className="dot">{val.whatsapp ? "Yes" : "No"}</td>
              <div className="editAndDelete">
                <span>
                <Link href={`/edit-contact/${index}`}>
            <a>  edit </a>
          </Link>
                 
                  </span><span onClick={()=>deleteFunc(index)}>delete</span>
              </div>
            </tr>
            
          )}

        </table>
        {
          !list[0] && <span className="noContacts">No contacts</span>
        }
      </div>
    </MainDiv>
  );
}
const MainDiv = Style.div`
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
  th{
    text-align: start;
    font-size: 13px;
  }
  td{
    font-size: 12px;
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
