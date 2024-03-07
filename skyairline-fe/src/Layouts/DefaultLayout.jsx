import Header from "../Components/Header";
function DefaultLayout({ children }) {
  return (
    <div>
      <Header></Header>
      <div>{children}</div>
    </div>
  );
}
export default DefaultLayout;
