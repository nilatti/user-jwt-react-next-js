import Theaters from '../components/Theaters'
const Home = props => (
  <div>
    <Theaters page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Home;
