import React, { Component } from "react";
import styled, { css } from "styled-components";

function Untitled(props) {
  return (
    <Rect>
      <Image src={require("../assets/images/Mask_Group_1.png")}></Image>
      <FantasySportEvent>Fantasy Sport Event</FantasySportEvent>
      <LoremIpsum>
        Please register your details to continue{"\n"}with Fantasy Sport Event
      </LoremIpsum>
      <Group5>
        <Rect6>
          <Image6Row>
            <Image6 src={require("../assets/images/user1.png")}></Image6>
            <UserName2>User Name</UserName2>
          </Image6Row>
        </Rect6>
      </Group5>
      <Group3>
        <Rect4>
          <Image4Row>
            <Image4 src={require("../assets/images/mail.png")}></Image4>
            <Email2>Email</Email2>
          </Image4Row>
        </Rect4>
      </Group3>
      <Group2>
        <Rect3>
          <Image5Row>
            <Image5 src={require("../assets/images/password.png")}></Image5>
            <Password>Password</Password>
          </Image5Row>
        </Rect3>
      </Group2>
      <Rect7>
        <SignUp>Sign Up</SignUp>
      </Rect7>
      <ConnectWith>CONNECT WITH</ConnectWith>
      <EllipseStackRow>
        <EllipseStack>
          <svg
            viewBox="0 0 67 67"
            style={{
              top: 0,
              left: 0,
              width: 60,
              height: 60,
              position: "absolute"
            }}
          >
            <ellipse
              stroke="rgba(59,89,153,1)"
              strokeWidth={1}
              cx={34}
              cy={34}
              rx={33}
              ry={33}
            ></ellipse>
          </svg>
          <Image7 src={require("../assets/images/facebook.png")}></Image7>
        </EllipseStack>
        <Ellipse1Stack>
          <svg
            viewBox="0 0 67 67"
            style={{
              top: 0,
              left: 0,
              width: 60,
              height: 60,
              position: "absolute"
            }}
          >
            <ellipse
              stroke="rgba(221,75,57,1)"
              strokeWidth={1}
              cx={34}
              cy={34}
              rx={33}
              ry={33}
            ></ellipse>
          </svg>
          <Image8 src={require("../assets/images/google.png")}></Image8>
        </Ellipse1Stack>
      </EllipseStackRow>
      <LoremIpsum2Row>
        <LoremIpsum2>Already have an account?</LoremIpsum2>
        <LogIn>Log In</LogIn>
      </LoremIpsum2Row>
    </Rect>
  );
}

const Rect = styled.div`
  display: flex;
  width: 700px;
  height: 900px;
  background-color: rgba(19,22,26,1);
  border-radius: 30px;
  flex-direction: column;
  margin-top: 90px;
  align-self: center;
`;

const Image = styled.img`
  width: 200px;
  height: 100%;
  margin-top: 50px;
  margin-left: 250px;
  align-self: center;
  object-fit: contain;
`;

const FantasySportEvent = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(255,255,255,1);
  font-size: 30px;
  margin-top: 18px;
  align-self: center;
`;

const LoremIpsum = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  color: rgba(179,179,179,1);
  text-align: center;
  font-size: 18px;
  margin-top: 19px;
  align-self: center;
`;

const Group5 = styled.div`
  width: 550px;
  height: 76px;
  flex-direction: column;
  display: flex;
  margin-top: 46px;
  margin-left: 75px;
`;

const Rect6 = styled.div`
  width: 550px;
  height: 76px;
  background-color: rgba(43,48,56,1);
  border-radius: 35px;
  flex-direction: row;
  display: flex;
`;

const Image6 = styled.img`
  width: 100%;
  height: 24px;
  object-fit: contain;
`;

const UserName2 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  color: rgba(255,255,255,1);
  font-size: 18px;
  width: 89px;
  height: 22px;
  margin-left: 19px;
  margin-top: 1px;
`;

const Image6Row = styled.div`
  height: 24px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 378px;
  margin-left: 40px;
  margin-top: 26px;
`;

const Group3 = styled.div`
  width: 550px;
  height: 76px;
  flex-direction: column;
  display: flex;
  margin-top: 14px;
  margin-left: 75px;
`;

const Rect4 = styled.div`
  width: 550px;
  height: 76px;
  background-color: rgba(43,48,56,1);
  border-radius: 35px;
  flex-direction: row;
  display: flex;
`;

const Image4 = styled.img`
  width: 100%;
  height: 24px;
  object-fit: contain;
`;

const Email2 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  color: rgba(255,255,255,1);
  font-size: 18px;
  margin-left: 19px;
  margin-top: 1px;
`;

const Image4Row = styled.div`
  height: 24px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 423px;
  margin-left: 40px;
  margin-top: 26px;
`;

const Group2 = styled.div`
  width: 550px;
  height: 76px;
  flex-direction: column;
  display: flex;
  margin-top: 15px;
  margin-left: 75px;
`;

const Rect3 = styled.div`
  width: 550px;
  height: 76px;
  background-color: rgba(43,48,56,1);
  border-radius: 35px;
  flex-direction: row;
  display: flex;
`;

const Image5 = styled.img`
  width: 100%;
  height: 24px;
  object-fit: contain;
`;

const Password = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  color: rgba(255,255,255,1);
  font-size: 18px;
  margin-left: 19px;
  margin-top: 1px;
`;

const Image5Row = styled.div`
  height: 24px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-right: 389px;
  margin-left: 40px;
  margin-top: 26px;
`;

const Rect7 = styled.div`
  width: 228px;
  height: 70px;
  background-color: rgba(24,255,0,1);
  border-radius: 35px;
  flex-direction: column;
  display: flex;
  margin-top: 33px;
  align-self: center;
`;

const SignUp = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  margin-top: 23px;
  align-self: center;
`;

const ConnectWith = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  width: 104px;
  height: 34px;
  margin-top: 29px;
  align-self: center;
`;

const Image7 = styled.img`
  top: 18px;
  left: 18px;
  width: 24px;
  height: 24px;
  position: absolute;
  object-fit: contain;
`;

const EllipseStack = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
`;

const Image8 = styled.img`
  top: 18px;
  left: 18px;
  width: 24px;
  height: 24px;
  position: absolute;
  object-fit: contain;
`;

const Ellipse1Stack = styled.div`
  width: 60px;
  height: 60px;
  margin-left: 35px;
  position: relative;
`;

const EllipseStackRow = styled.div`
  height: 60px;
  flex-direction: row;
  display: flex;
  margin-top: 15px;
  margin-left: 273px;
  margin-right: 272px;
`;

const LoremIpsum2 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  color: rgba(255,255,255,1);
  font-size: 18px;
`;

const LogIn = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  color: rgba(24,255,0,1);
  font-size: 18px;
  margin-left: 9px;
`;

const LoremIpsum2Row = styled.div`
  height: 22px;
  flex-direction: row;
  display: flex;
  margin-top: 38px;
  margin-left: 220px;
  margin-right: 222px;
`;

export default Untitled;
