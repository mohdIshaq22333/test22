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
  return (
    <MainDiv onClick={()=>console.log(list)}>
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
            </tr>
            
          )}
        </table>
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

}
`;
