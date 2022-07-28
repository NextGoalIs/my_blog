import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <div className="container">
        <Link href="/">
          <h2>JK's 개발노트</h2>
        </Link>
      </div>
    </header>
  );
};

export default Header;
