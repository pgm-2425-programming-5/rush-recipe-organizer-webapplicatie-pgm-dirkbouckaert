import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';

type BtnAddProps = { href: string; title?: string };

const BtnAdd = ({ href, title = 'Voeg toe' }: BtnAddProps) => {
  return (
    <Link href={href} title={title} className="btn">
      <FaPlusCircle />
    </Link>
  );
};

export default BtnAdd;
