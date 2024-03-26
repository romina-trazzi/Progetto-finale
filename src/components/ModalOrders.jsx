import {useRef, useImperativeHandle, forwardRef} from 'react';
import {createPortal} from 'react-dom';
import styled from 'styled-components';
import { fetchUserOrder } from '../http.js';

export const Title = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1rem 0;
`
export const OrderList = styled.ul `
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
`
export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
`
export const CloseModalButton = styled.button`
  font: inherit;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #1d1a16;

  &:hover, &:active {
    color: #312c1d;
  }
`
export const LoadingModalButton = styled.button`
  font: inherit;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #1d1a16;

  &:hover, &:active {
    color: #312c1d;
  }
`

const ModalOrders = forwardRef(function ModalOrders({isOpen, setIsOpen}, ref) {
  
  const orderDialog = useRef();


  useImperativeHandle(ref, () => ({
    open: () => {
      orderDialog.current.showModal();
    },
  }));

  const handleClosing = () => {
    orderDialog.current.close();
    setIsOpen(false);
  }

  // Fetching success orders calling orders.json
  const fetchSuccessOrders = async () => { 
    setIsOpen(true);
    try {
      const successOrdersData = await fetchUserOrder();
      
      console.log('Dati ordini di successo:', successOrdersData);

    } catch (error) {
      console.error('Errore durante il recupero degli ordini.', error);
    }
  }

  return createPortal(
    <dialog id="modalOrders" className="modal" ref={orderDialog}>
      <ModalContent>
        <Title>Elenco degli ordini avvenuti con successo</Title>
        <OrderList>{ !isOpen ? "Carica ordini" : "Dati degli ordini"}</OrderList>
        <LoadingModalButton onClick={fetchSuccessOrders}>Load success orders</LoadingModalButton>
        <CloseModalButton onClick={handleClosing}>Close</CloseModalButton>
      </ModalContent>
    </dialog>,
    document.getElementById('modalOrders')
  )

});


export default ModalOrders;









 

