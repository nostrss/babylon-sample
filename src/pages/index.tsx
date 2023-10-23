import { Inter } from 'next/font/google';
import styled from '@emotion/styled';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <main>
        <h1>Home</h1>
        <Button>emotion 버튼</Button>
      </main>
    </>
  );
}

const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;
