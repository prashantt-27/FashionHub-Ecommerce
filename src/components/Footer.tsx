const Footer = () => {
  return (
    <>
      <footer className="text-center text-white bg-blue-600 py-4 mt-10 flex justify-center">
        <p className="text-sm">
          © {new Date().getFullYear()} MyBrand. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
