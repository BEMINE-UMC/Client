import React, { MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';
import ReactPortal from './ReactPortal';

import CustomRow from './CustomRow';

const ModalOverlay = styled.div`
    position: fixed;
	top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background-color: white;
    min-width: 30%;
    min-height: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1001;
    gap: 3rem;
	border-radius: 1rem;
`;

interface ModalProps {
	isOpen: boolean;
	onClose: MouseEventHandler<HTMLDivElement>;
	children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<ReactPortal>
			<ModalOverlay onClick={onClose}>
				<CustomRow $width='100%' $height='auto' $alignitems='flex-start' $justifycontent='center' $gap='1rem'>
					<ModalContainer onClick={(e) => e.stopPropagation()}>
						{children}
					</ModalContainer>
				</CustomRow>
			</ModalOverlay>
		</ReactPortal>
	);
};

export default Modal;
