import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";


type Props = {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <Footer />

      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        main {
          flex: 1;
          max-width: 80rem;
          width: 100%;
          margin: 0 auto;
          background-color: #ffffff;
        }

        @media (min-width: 768px) {
          main {
            padding: 0 2rem;
          }
        }
      `}</style>
    </div>
  );
}
