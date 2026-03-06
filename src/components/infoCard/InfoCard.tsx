import * as React from "react";
import type { Data } from "../types/types";
import { US_STATE_ABBREVIATIONS } from "../utils/USState";
import "./infoCard.scss";

interface InfoCardProps {
  data: Data;
}

const InfoCard: React.FC<InfoCardProps> = ({ data }) => {
  return (
    <section className="info-card">
      <article className="info-item">
        <h3 className="info-label">IP ADDRESS</h3>
        <p className="info-value">{data.ip}</p>
      </article>
      <div className="info-divider"></div>
      <article className="info-item">
        <h3 className="info-label">LOCATION</h3>
        <p className="info-value">
          {data.location.city}, {US_STATE_ABBREVIATIONS[data.location.region]}
          {data.location.postalCode}
        </p>
      </article>
      <div className="info-divider"></div>
      <article className="info-item">
        <h3 className="info-label">TIMEZONE</h3>
        <p className="info-value">UTC {data.location.timezone}</p>
      </article>
      <div className="info-divider"></div>
      <article className="info-item">
        <h3 className="info-label">ISP</h3>
        <p className="info-value">{data.isp || data.as.name}</p>
      </article>
    </section>
  );
};

export default InfoCard;
