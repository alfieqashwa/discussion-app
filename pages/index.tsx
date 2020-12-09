import Layout from 'components/Layout';
import Card from 'components/Card';

import { postList } from 'data/posts';

// TODO:
// https://jsonplaceholder.typicode.com/posts
// https://framer.cloud/LEhhu

const Home = () => {
  return (
    <Layout title='Home'>
      <h1>Home Page</h1>
      <ul className='grid grid-cols-3 grid-rows-3 m-16 gap-14'>
        {postList.map((post) => (
          <li
            key={post.id}
            className='p-8 shadow-2xl bg-gradient-to-br from-blue-300 to-blue-900 rounded-xl'>
            <Card title={post.title} body={post.body} tag={post.tag} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Home;
