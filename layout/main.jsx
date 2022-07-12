import { useState, useEffect } from "react";
import styles from "styled-components";
import SideMenu from "../components/sideMenu";
import { useRecoilState } from "recoil";
import { dataState } from "../states/data";
import axios from "axios";

export default function Main({ children }) {
  const [listState, setListState] = useRecoilState(dataState);
  async function fetchData() {
    try {
      const response = await axios
        .get(
          "https://3a178515-5a1f-4da4-b47b-b9e825f92625.mock.pstmn.io/getExam"
        )
        .then(function (response) {
          console.log(response.data);
          setListState(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchData();
    console.log(listState);
  }, []);
  return (
    <MainCont>
      <div className="sidemenuCont">
      <SideMenu />
      </div>
      {children}
    </MainCont>
  );
}

const MainCont = styles.div`
display: flex;
.sidemenuCont{
  width: 42vw;
  max-width: 350px;
}
`;
