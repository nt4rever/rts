export const MainLayout = (props) => {
  const { children } = props;
  return (
    <>
      <div className="rts">header</div>
      {children}
    </>
  );
};
