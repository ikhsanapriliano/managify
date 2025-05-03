type Props = {
  children: React.ReactNode;
};

const AuthContainer = ({ children }: Props) => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      {children}
    </main>
  );
};

export default AuthContainer;
