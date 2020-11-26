import Layout from 'components/Layout';
import Card from 'components/Card';

import { postList } from 'data/posts';

// TODO:
// https://jsonplaceholder.typicode.com/posts
// https://framer.cloud/LEhhu

const Home = () => {
  return (
    <Layout>
      <div className='bg-blue-400'>
        <h1 className=''>TITLE</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <ul className='m-16 grid grid-cols-3 grid-rows-3 gap-14'>
        {postList.map((post) => (
          <li
            key={post.id}
            className='p-8 bg-gradient-to-br from-blue-300 to-blue-900 rounded-xl shadow-2xl'>
            <Card title={post.title} body={post.body} tag={post.tag} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Home;
