interface LayoutProps {
  children: React.ReactNode;
}

const LayoutPage = ({ children }: LayoutProps) => {
  return <section className=" flex justify-center mt-24">{children}</section>;
};

export default LayoutPage;
