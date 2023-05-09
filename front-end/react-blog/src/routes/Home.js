import BlogList from '../components/BlogList';
import useFectch from '../hooks/useFetch';

const Home = () => {
  const { data, isPending, error } = useFectch('http://localhost:8000/blogs');
  return (
    <div className="home">
      {error && <div>{error} </div>}
      {isPending && <div> Loading... </div>}
      {data && <BlogList blogs={data} title="All Blogs!" />}
    </div>
  );
};
export default Home;
