import { useContext } from "react";
import FilterSection from "../../components/FilterSection/FilterSection";
import { DepContext } from "../../context/context";

export default function HomePage() {
  const contextData = useContext(DepContext);
  const departments = contextData.departments;

  return (
    <>
      <FilterSection departments={departments} />
    </>
  );
}
