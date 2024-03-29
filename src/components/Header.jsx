import styled from 'styled-components';
import { useState, useRef, useContext } from 'react'
import Modal from './Modal.jsx';
import ModalOrders from './ModalOrders.jsx';
import { CartContext } from './store/shoppingCartContext.jsx';


export const HeaderStyle = styled.header `
    height: min-content;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3rem 10%;
    margin-bottom: 5rem;
    color: gold;
`
export const Logo = styled.img `
    width: 4rem;
    height: 4rem;
    object-fit: contain;
    border-radius: 50%;
    border: 2px solid #ffc404;
`
export const Title = styled.h2`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left: 1rem; 
    font-weight: bold;
    font-size: 1.5rem;
`
export const ShoppingCartButton = styled.button`
  padding: 1rem;
  background-color: transparent;
  border: 0px;
  font-family: 'Lato', sans-serif;
  font-size: 1.5rem;
  font-weight: bolder;
  color: gold;
  cursor: pointer;
`
export const OrdersButton = styled.button`
  padding: 1rem;
  background-color: transparent;
  border: 0px;
  font-family: 'Lato', sans-serif;
  font-size: 1.5rem;
  font-weight: bolder;
  color: gold;
  cursor: pointer;
`

function Header() {
    const { meals } = useContext(CartContext);
    const cartMealsQuantity = meals.length;
    const modalRef = useRef();
    const modalOrdersRef = useRef(); 
    const [isOpen, setIsOpen] = useState(false);

    const openCartModal = (buyStepAction) => {
        modalRef.current.open();
        modalRef.current.setBuyStep(buyStepAction);
    };

    const openOrdersModal = () => {
        modalOrdersRef.current.open();
    };

    return (
        <>
            <ModalOrders ref={modalOrdersRef} isOpen={isOpen} setIsOpen={setIsOpen}/>
            <Modal ref={modalRef}/>
            <HeaderStyle>
            <div style={{display: "flex", alignItems: "center"}}>
                <Logo src="logo.jpg" alt="Logo"/>
                <Title>REACTFOOD</Title>
            </div>
            <OrdersButton onClick={openOrdersModal}> Success Orders </OrdersButton>
            <ShoppingCartButton onClick={() => openCartModal("openCart")}> Cart ({cartMealsQuantity}) </ShoppingCartButton>
            </HeaderStyle>
        </>
    
    )
}

export default Header

