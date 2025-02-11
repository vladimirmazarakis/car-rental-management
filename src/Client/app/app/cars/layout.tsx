export default async function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <div className="px-8 py-16">
            {children}
        </div>
    );
}