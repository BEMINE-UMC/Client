import UserImage from "../../../assets/images/main/modal/image 7.png"
import ContentImage from  "../../../assets/images/main/modal/image 8.png"

export interface Post {
    image: string; //
    author: string; //
    title: string; // 
    liked: boolean; //
    category: string;   //
    likesCount: number; //

    id: number,
    userImage: string; 
    userInformation: string;
    contentImage: string;
    content: string;
  }

export const postMockData: Post[] = [
    {
      id: 1,
      image: "",  
      author: "김현수",
      title: "SNS 콘텐츠의 도달률을 높이는 5가지 비밀",
      liked: false,
      category: "콘텐츠 마케터",
      likesCount: 1,

      userImage: UserImage,
      userInformation: `
1. 학력 및 전공
- 전공: 미디어 커뮤니케이션 학과
- 관련 과목: 디지털 마케팅, 콘텐츠 기획, 커뮤니케이션 전략

2. 주요 경험
- 인턴십: 스타트업 A사 (6개월): SNS 콘텐츠 기획 및 운영. 주력 플랫폼: Instagram, YouTube. 2개월 만에 팔로워 3,000명 증가 성과. 
- 대기업 B사 (4개월): 디지털 광고 캠페인 분석 및 보고서 작성. 구글 애널리틱스를 활용한 성과 분석.
- 서포터즈 활동: 디지털 마케팅 서포터즈 (3기, 6개월): 콘텐츠 공모전 1위 수상. 브랜딩 캠페인 팀 프로젝트 참여. 
- 지역 브랜드 홍보단: 블로그 및 SNS 콘텐츠 작성, 지역 축제 홍보. 

3. 기타 활동  
- 개인 프로젝트: "커피 브랜드 C사" 가상 마케팅 캠페인 기획. Google Ads와 페이스북 광고 시뮬레이션 제작.
- 온라인 강의 수료: 구글 디지털 마케팅 전문가 과정. Meta Blueprint: Facebook 마케팅.

4. 주요 역량 및 성과
- 마케팅 툴: Google Analytics, Facebook Ads Manager, Canva.
- 성과 중심의 기획 능력: 이전 회사에서 월간 콘텐츠 도달률 200% 증가 달성. 팀 프로젝트로 캠페인 기획 및 실행.
    `.trim(),
      contentImage: ContentImage,
      content: `인터뷰 준비: 전략적 사고를 보여주기
면접에서 가장 자주 받았던 질문 중 하나는 
“당신의 콘텐츠 전략은 어떤 과정을 거쳐 나왔는가?"**였습니다.

여기서 중요한 건 전략의 논리적 흐름을 보여주는 것이었어요.
문제 정의: 왜 이 콘텐츠가 필요한가?
타겟 설정: 고객의 페인포인트와 니즈는 무엇인가?
성과 측정: 성공 여부를 판단할 수 있는 데이터는 무엇인가?

이처럼 구체적이고 체계적인 접근 방식이 면접관들에게 긍정적인 인상을 남겼습니다.
이직 준비를 하며 느낀 점
이직은 단순히 회사만 바꾸는 것이 아니라, 스스로를 돌아보고 새로운 목표를 설정하는 과정이었습니다. 무엇보다 스스로를 어떻게 표현할 것인가를 고민하며 제 커리어를 재정리할 수 있었어요.
제가 여러분께 드리고 싶은 조언은 다음과 같습니다:
포트폴리오는 계속 업데이트하라: 이직을 결심하지 않아도, 매년 성과를 기록하고 자료를 정리하는 습관을 들이세요.
데이터를 강조하라: 단순히 감각적인 기획보다는 성과와 과정을 데이터로 설명하세요.
멘토를 찾아라: 현직자와 대화하며 조언을 구하는 것도 큰 도움이 됩니다.
이 글이 콘텐츠 마케터로 이직을 준비하는 분들에게 작은 도움이 되었기를 바랍니다. 여러분의 커리어 여정에 좋은 일이 가득하길 응원합니다! 😊`.trim(),
    },
    {
      image: "",
      author: "유메",
      title: "Sample 2",
      liked: true,
      category: "브랜드 마케터",
      likesCount: 2,

      id: 2,
      userImage: "", 
      userInformation: "",
      contentImage: "",
      content: "",
    },
    {
      image: "",
      author: "윤슬",
      title: "Sample 3",
      liked: false,
      category: "퍼포먼스 마케터",
      likesCount: 3,

      id: 3,
      userImage: "", 
      userInformation: "",
      contentImage: "",
      content: "",
    },
    {
      image: "",
      author: "궁둔",
      title: "Sample 4",
      liked: false,
      category: "바이럴 마케터",
      likesCount: 4,

      id: 4,
      userImage: "", 
      userInformation: "",
      contentImage: "",
      content: "",
    },
    {
      image: "",
      author: "유메",
      title: "Sample 2",
      liked: true,
      category: "브랜드 마케터",
      likesCount: 2,

      id: 2,
      userImage: "", 
      userInformation: "",
      contentImage: "",
      content: "",
    },
    {
      image: "",
      author: "윤슬",
      title: "Sample 3",
      liked: false,
      category: "퍼포먼스 마케터",
      likesCount: 3,

      id: 3,
      userImage: "", 
      userInformation: "",
      contentImage: "",
      content: "",
    },
    {
      image: "",
      author: "궁둔",
      title: "Sample 4",
      liked: false,
      category: "바이럴 마케터",
      likesCount: 4,

      id: 4,
      userImage: "", 
      userInformation: "",
      contentImage: "",
      content: "",
    },
  ];