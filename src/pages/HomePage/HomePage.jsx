import { useContext } from "react";
import FilterSection from "../../components/FilterSection/FilterSection";
import { DepContext } from "../../context/context";

export default function HomePage() {
  const departments = useContext(DepContext);

  return (
    <>
      <FilterSection departments={departments} />
    </>
  );
}
