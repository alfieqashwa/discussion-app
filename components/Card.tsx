import { PostProps } from 'data/posts';

const Card = ({ title, body, tag }: PostProps) => (
  <>
    <h1 className='text-4xl'>{title}</h1>
    <p className='leading-6'>{body}</p>
    <button>{tag}</button>
  </>
);

export default Card;
