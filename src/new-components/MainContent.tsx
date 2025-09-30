import Header from './Header';

const MainContent = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <Header title={title} />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
};

export default MainContent;