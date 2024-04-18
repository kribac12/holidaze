import Logo from "../Logo";
function Header() {
  return (
    <header className="bg-cardBg text-white py-4 px-6 flex justify-between items-center">
      <div className="container mx-auto px-6">
        <Logo />
      </div>
    </header>
  );
}
export default Header;
