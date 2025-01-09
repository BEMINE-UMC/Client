// 마이페이지의 워크스페이스 컴포넌트, 나영 담당

import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useState } from 'react';
import CustomColumn from "../components/CustomColumn";
import CustomFont from "../components/CustomFont";
import CustomButton from "../components/CustomButton";
import { FaChevronDown } from 'react-icons/fa';

import template1 from '../../../assets/images/mockData/mockData_mine_template_1.png';
import template2 from '../../../assets/images/mockData/mockData_mine_template_2.png';
import template3 from '../../../assets/images/mockData/mockData_mine_template_3.png';
import template4 from '../../../assets/images/mockData/mockData_mine_template_4.png';

const mockDataTemplates = [
	template1,
	template2,
	template3,
	template4
];

const DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 10rem;
    border-radius: 0.5rem;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 1rem;
    z-index: 10;
`;

const GridContainer = styled.div`
    width: 90%;
	display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

const ImageItem = styled.img`
    width: 100%;
    border-radius: 0.5rem;
`;

const Workspace = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const navigate = useNavigate();
	const GoTemplateEdit = () => { navigate('/writetemplatepage'); } // 템믈릿 수정 버튼 (템플릿 클릭하여)

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	return (
		<CustomColumn $width="50%" $minHeight="100vh" $alignitems="flex-start" $justifycontent="flex-start">
			<DropdownWrapper>
				<CustomButton onClick={toggleDropdown} $backgroundColor="white" $width="auto" $height='auto' $padding="0.5rem 1rem"
					$boxshadow='1px 2px 3px rgba(0, 0, 0, 0.1)' $borderRadius='3rem'>
					<CustomFont $color="black" $font="0.7rem" $fontweight='bold'>워크스페이스</CustomFont>
					<FaChevronDown style={{ color: '#595959' }} />
				</CustomButton>
				{isDropdownOpen && (
					<DropdownMenu>
						<CustomColumn $width='100%' $alignitems='flex-start' $justifycontent='center'>
							<CustomButton $backgroundColor="transparent" $width='auto' $height='auto' $padding="0">
								<CustomFont $color="black" $fontweight='bold'>최근 본 게시물</CustomFont>
							</CustomButton>
							<CustomButton $backgroundColor="transparent" $width='auto' $height='auto' $padding="0">
								<CustomFont $color="black" $fontweight='bold'>좋아요 누른 게시물</CustomFont>
							</CustomButton>
							<CustomButton $backgroundColor="transparent" $width='auto' $height='auto' $padding="0">
								<CustomFont $color="black" $fontweight='bold'>북마크한 게시물</CustomFont>
							</CustomButton>
						</CustomColumn>
					</DropdownMenu>
				)}
			</DropdownWrapper>

			<GridContainer>
				{mockDataTemplates.map((src, index) => (
					<CustomButton $width='auto' $height='auto' $padding='0' $backgroundColor='transparent' onClick={GoTemplateEdit}>
						<ImageItem key={index} src={src} alt={`Template ${index + 1}`} />
					</CustomButton>
				))}
			</GridContainer>
		</CustomColumn>
	);
};

export default Workspace;
