import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import flowerD from "./flowerData.json";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    position: relative;
`;

const Header = styled.div`
    height: 10vh;
    min-height: 10vh;
    width: 100vw;
    display: flex;
    align-items: flex-end;
    margin-bottom: 2vh;
`;

const HeaderText = styled.div`
    width: 100%;
    font-weight: bold;
    font-size: 3vh;
    text-align: center;
`;

const Body = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    width: 90vw;
    margin: 0 auto;
`;

const FlowerContainer = styled.div`
    
`;

const FlowerCard = styled.div`
    background-color: #fff;
    color: white;
    font-size: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #3A3B48;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    box-sizing: border-box; 
    padding: 3vh 2vw 3vh 2vw;
`;

const FlowerImg = styled.img`
    width: 100%;
    height: 100%;
`;


const FlowerQuestion = styled.div`
    background-color: #3A3B48;
    color: white;
    font-size: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #3A3B48;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    box-sizing: border-box; 
    padding: 3vh 2vw 3vh 2vw;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.5);
    display: ${({ show }) => (show ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    z-index: 1000;
    flex-direction: column;
`;

const ModalHeader = styled.div`
    background-color: #3A3B48;
    max-width: 400px;
    width: 70vw;
    height: 6vh;
    display: flex;
    flex-direction: row;
`;

const ModalIcon = styled.div`
    height: 100%;
    width: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalTitle = styled.div`
    height: 100%;
    width: 100%;
    color: white;
    font-size: 2vh;
    font-weight: 500;
    display: flex;
    align-items: center;
    padding-bottom: 0.2vh;
`;

const CloseButton = styled.button`
    border: none;
    height: 100%;
    width: 6vh;
    background-color: #3A3B48;
    align-items: center;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    justify-content: center;
`;

const ModalInnerIcon = styled.img`
    width: 4vw;
    margin-left: 3vw;
    margin-right: 3vw;
    height: auto;
`;

const ModalContent = styled.div`
    max-width: 400px;
    max-height: 470px;
    width: 70vw;
    height: 90vw;
    background-color: white;
    text-align: center;
`;

const ModalContentInner = styled.div`
    margin: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const ModalInnerImg = styled.img`
    height: 40vw;
    width: 40vw;
    max-height: 220px;
    max-width: 220px;
    background-color: #eee;
`;

const FlowerName = styled.div`
    width: 10vw;
`;


export default function Flower() {
    const flowerList = flowerD.information.flowerListRes.map(flower => ({
        flowerId: flower.flowerId,
        flowerImage: flower.flowerImage,
        isAcquire: flower.isAcquire
    }));
    
    const [showModal, setShowModal] = useState(false);
    const [selectedFlower, setSelectedFlower] = useState(null);

    const handleCardClick = (index) => {
        setSelectedFlower(index);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedFlower(null);
    };

    return (
        <Wrapper>
            <Header>
                <HeaderText>꽃 도감</HeaderText>
            </Header>
            <Body>
                {flowerList.map((flower, index) => (
                    <FlowerContainer key={flower.flowerId} onClick={() => handleCardClick(index)}>
                        {flower.isAcquire ? (
                            <FlowerCard>
                                <FlowerImg src={flower.flowerImage} />
                            </FlowerCard>
                        ) : (
                            <FlowerQuestion>
                                ?
                            </FlowerQuestion>
                        )}
                    </FlowerContainer>
                ))}
            </Body>

            <ModalOverlay show={showModal} onClick={closeModal}>
                <ModalContent>
                    <ModalHeader>
                        <ModalIcon>
                            <ModalInnerIcon src='./ModalIcon.png' />
                        </ModalIcon>
                        <ModalTitle>Your Bloom</ModalTitle>
                        <CloseButton onClick={closeModal}>
                            <ModalInnerIcon src='./ModalX.png' />
                        </CloseButton>
                    </ModalHeader>
                    <ModalContentInner>
                        <ModalInnerImg>
                            
                        </ModalInnerImg>
                        

                        <h2>{selectedFlower + 1}</h2>
                        {selectedFlower !== null && (
                            <p>
                                {selectedFlower + 1}번 꽃입니다. 
                                {flowerList[selectedFlower].isAcquire 
                                    ? ' 꽃이 획득되었습니다.' 
                                    : ' 꽃이 아직 획득되지 않았습니다.'}
                            </p>
                        )}
                    </ModalContentInner>
                </ModalContent>
            </ModalOverlay>
        </Wrapper>
    );
}

