import { getProducts } from "./api/productsApi/productsApi";
import Hero from "./components/Home/Hero";


export default async function Home() {

  const products = await getProducts();
  return (
    <>
      <div className="min-h-screen">
        <div className="container-fluid mx-auto px-5">
          <section className="">
            <Hero />
          </section>
        </div>
      </div>
    </>
  );
}
