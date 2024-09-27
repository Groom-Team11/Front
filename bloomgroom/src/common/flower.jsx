import React, { useState } from 'react';
import styled from "@emotion/styled"

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

const FlowerCard = styled.div`
    background-color: #3A3B48;
    color: white;
    font-size: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
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
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    width: 90vw;
    text-align: center;
`;

const CloseButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    background-color: #555;
    color: white;
    cursor: pointer;
    border-radius: 5px;
`;

export default function Flower() {
    const flowerNum = 16;
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
                <HeaderText>
                    꽃 도감
                </HeaderText>
            </Header>
            <Body>
                {Array.from({ length: flowerNum }).map((_, index) => (
                    <FlowerCard key={index} onClick={() => handleCardClick(index)}>
                        ?
                    </FlowerCard>
                ))}
            </Body>

            <ModalOverlay show={showModal} onClick={closeModal}>
                <ModalContent>
                    <h2>꽃 {selectedFlower + 1}</h2>
                    <p>{selectedFlower + 1}번 꽃입니다.</p>
                    <CloseButton onClick={closeModal}>닫기</CloseButton>
                </ModalContent>
            </ModalOverlay>
        </Wrapper>
    );
}
