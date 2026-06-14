import FilterSection from "./_components/FilterSection";
import Banner from "../_components/Banner";
import RoomsSection from "./_components/RoomsSection";
import { Suspense } from "react";
import Loader from "../_ui/Loader";

export const metadata = {
  title: "Accommodation | Find Your Perfect Room in Mirissa",
  description:
    "Explore our comfortable and affordable rooms in Mirissa. Whether you're a couple or a solo traveler, book your ideal accommodation at Wayside Loft.",
};

function Rooms({ searchParams }) {
  console.log({ searchParams });
  const filter = searchParams?.sort ?? "default";
  const range = searchParams?.range ?? "";

  return (
    <>
      <Banner title="Accommodation Options" />

      <div className="container py-8">
        <FilterSection filters={{ filter, range }} />

        <Suspense
          key={`${filter}-${range}`}
          fallback={
            <div className="flex items-center justify-center h-[40vh]">
              <Loader />
            </div>
          }
        >
          <RoomsSection filter={filter} range={range} />
        </Suspense>
      </div>
    </>
  );
}

export default Rooms;
