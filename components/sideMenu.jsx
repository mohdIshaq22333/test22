import Link from 'next/link'
import styles from "styled-components"

function Contact() {
    const links=[
        {
        text:"Home",
        url:"/",
    },
    {
        text:"Profile",
        url:"/",
    },
    {
        text:"Setting",
        url:"/",
    },
]
  return (
    <MainDiv>
        <h1>Text text text</h1>
        {
            links.map((val,index)=>
            <Link href={val.url} key={index}>
            <a >
                {val.text}
            </a>
            </Link>
            )
        }
    </MainDiv>
  )
}

export default Contact


const MainDiv=styles.div`
position:fixed;
font-family: Roboto;
width: 30vw;
max-width: 350px;
height: 100vh;
background: #808080a1;
margin: 0;
color: black;
padding:12px 0px;
h1{
    margin-top: 0;
    font-size: 26px;
    padding:50px 5px 5px 20px;
    text-align:center;
}
a{
    display: block;
    font-size: 22px;
    padding: 17px 15px;
    background: white;
    margin-bottom:20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
`;