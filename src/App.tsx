import { useMemo, useState } from "react";
import { API_KEY } from "../apiKey";
import Header from "./components/header/Header";
import { useFetch } from "./components/hook/useFetch";
import InfoCard from "./components/infoCard/InfoCard";
import { MapView } from "./components/MapView";
import type { Data } from "./components/types/types";
import Loading from "./components/utils/Loading";

export default function App() {
  const [searchedValue, setSearchedValue] = useState("");

  const URL = useMemo(() => {
    if (searchedValue.trim() === "") {
      return `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;
    }
    if (searchedValue.trim().includes(".com")) {
      return `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&&domain=${searchedValue.trim()}`;
    } else {
      return `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&&ipAddress=${searchedValue.trim()}`;
    }
  }, [searchedValue]);

  const { data, loading, error: err } = useFetch<Data>(URL);

  if (loading) return <Loading size={10} />;

  if (err) {
    throw new Error(err);
  }
  return (
    <>
      <Header onSubmit={setSearchedValue} />
      <main>
        <InfoCard
          data={
            data || {
              ip: "",
              location: {
                country: "",
                region: "",
                city: "",
                lat: 1,
                lng: 1,
                postalCode: "",
                timezone: "",
                geonameId: 1,
              },
              domains: [],
              as: {
                asn: 0,
                name: "",
                route: "",
                domain: "",
                type: "",
              },
              isp: "",
            }
          }
        />

        <MapView lat={data?.location.lat || 1} lon={data?.location.lng || 1} />
      </main>
      <footer className="attribution">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </footer>
    </>
  );
}
