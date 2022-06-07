import React from 'react'
import styles from "styled-components"

function Contact() {
  return (
    <MainDiv>
        <span className="name">Name</span>
        <span className="number">43243243234</span>
        <span className="type">personal</span>
        <span className="whatsapp"></span>
    </MainDiv>
  )
}

export default Contact


const MainDiv=styles.div`

`;