import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry,</h2>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <Link to="/">홈으로 가기</Link>
    </div>
  );
};

export default NotFound;
