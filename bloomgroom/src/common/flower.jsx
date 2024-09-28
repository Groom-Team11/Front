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

const FlowerImg = styled.img`
    width: 100%;
    height: 100%;
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
    border-top-left-radius: 10px;
    box-shadow: 
    -5px 0 5px -5px rgba(0, 0, 0, 0.5),
    0 -5px 5px -5px rgba(0, 0, 0, 0.5),
    5px 0 5px -5px rgba(0, 0, 0, 0.5);
`;

const ModalIcon = styled.div`
    height: 100%;
    width: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 10px;
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
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: 
    -5px 0 5px -5px rgba(0, 0, 0, 0.5),
    0 5px 5px -5px rgba(0, 0, 0, 0.5),
    5px 0 5px -5px rgba(0, 0, 0, 0.5);
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
    width: auto;
    max-height: 220px;
    max-width: 220px;
`;

const FlowerName = styled.div`
    height: 4vh;
    font-size: 2.8vh;
    font-weight: bold;
`;

const FlowerMean = styled.div`
    font-size: 2vh;
`;

export default function Flower() {
    const flowerList = flowerD.information.flowerList.map(flower => ({
        flowerId: flower.flowerId,
        flowerName: flower.flowerName,
        flowerImage: flower.flowerImage,
        flowerMean: flower.flowerMean,
        isAcquired: flower.isAcquired,
        cardBlur: `/flowerCard_blur/${flower.flowerName}.png`,
        cardColor: `/flowerCard_color/${flower.flowerName}.png`
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
                        {flower.isAcquired ? (
                            <FlowerImg src={flower.cardColor} alt={flower.flowerName} />
                        ) : (
                            <FlowerImg src={flower.cardBlur} alt={flower.flowerName} />
                        )}
                    </FlowerContainer>
                ))}
            </Body>

            <ModalOverlay show={showModal} onClick={closeModal}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
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
                        {selectedFlower !== null && selectedFlower >= 0 && selectedFlower < flowerList.length && flowerList[selectedFlower].isAcquired ? (
                            <ModalInnerImg src={flowerList[selectedFlower].cardColor} alt={flowerList[selectedFlower].flowerName} />
                        ) : (
                            
                                '?'
                            
                        )}

                        {selectedFlower !== null && selectedFlower >= 0 && selectedFlower < flowerList.length && (
                            flowerList[selectedFlower].isAcquired ? (
                                <div>
                                    <FlowerName>{flowerList[selectedFlower].flowerName}</FlowerName>
                                    <FlowerMean>{flowerList[selectedFlower].flowerMean}</FlowerMean>
                                </div>
                            ) : (
                                <div>
                                    <FlowerMean>공개되지 않은 꽃 입니다.</FlowerMean>
                                </div>
                            )
                        )}
                    </ModalContentInner>
                </ModalContent>
            </ModalOverlay>
        </Wrapper>
    );
}

