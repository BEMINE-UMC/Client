import React, { useState } from "react";
import styled from "styled-components";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";


const PdfViewer: React.FC<{ file: string }> = ({ file }) => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  // PDF 로드 완료 시 호출
  const handleDocumentLoad = () => setIsLoading(false);

  return (
    <Container>
      {file ? (
        <Worker workerUrl="/node_modules/pdfjs-dist/build/pdf.worker.min.mjs">
          <ViewerWrapper>
            {/* 로딩 인디케이터 표시 */}
            {isLoading && <LoadingMessage>PDF 로드 중...</LoadingMessage>}
            <Viewer 
              fileUrl={file} 
              onDocumentLoad={handleDocumentLoad} 
            />
          </ViewerWrapper>
        </Worker>
      ) : (
        <Placeholder>파일이 없습니다.</Placeholder>
      )}
    </Container>
  );
};

export default PdfViewer;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 16px;
  overflow: auto;
  scrollbar-width: none; /* Firefox에서 스크롤 바 숨기기 */
  -ms-overflow-style: none; /* IE에서 스크롤 바 숨기기 */

  ::-webkit-scrollbar {
    display: none; /* Webkit 브라우저에서 스크롤 바 숨기기 */
  }
`;

const ViewerWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  max-height: 1200px;
  overflow: auto;

  // .rpv-core__viewer {
  //   transform: scale(1.35); /* 1.35배 확대 */
  //   transform-origin: top center;
  // }

  .rpv-core__inner-page {
    background-color: transparent !important;
  }
  
`;

const Placeholder = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
  background-color: transparent;
`;

const LoadingMessage = styled.div`
  position: absolute;
  font-size: 18px;
  color: #888;
  text-align: center;
  background-color: transparent;
`;