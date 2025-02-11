import styled from 'styled-components';
import CustomBox from '../../components/CustomBox';
// DropdownWrapper, DropdownMenu, GridContainer, ImageItem, Overlay, PdfContainer, FloatingButtons, HeartModal, DownloadModal

// 스타일 속성들 창고 

export const DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 10rem;
    border-radius: 0.5rem;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 0.5rem;
    z-index: 10;
`;

export const GridContainer = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

export const ImageItem = styled.img`
    width: 100%;
    border-radius: 0.5rem;
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

export const PdfContainer = styled.div`
    max-width: 90%;
	min-width: 80%;
    height: 80%;
    background: transparent;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: row;
	gap: 1rem;
    justify-content: center;
    align-items: flex-start;
`;

export const FloatingButtons = styled.div`
	display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const HeartModal = styled(CustomBox)`
	position: absolute;
	top: 3rem;
	left: 50%;
	transform: translateX(-50%);
	z-index: 200;
	background-color: white;
	border-radius: 1rem;
	width: 80%;
	padding: 1rem;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const DownloadModal = styled(CustomBox)`
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translateX(-50%);
	z-index: 200;
	background-color: white;
	border-radius: 1rem;
	width: 60%;
	padding: 1rem;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
`;