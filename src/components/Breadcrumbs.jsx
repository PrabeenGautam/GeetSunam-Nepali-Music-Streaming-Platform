import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function CustomBreadcrumbs({ link, textName, search = false }) {
  const { t } = useTranslation("translation", { keyPrefix: "common" });

  return (
    <section className="breadcrumbs">
      <Link to="/home" style={{ marginRight: 7 }}>
        <span className="root-link">{t("geetsunam")}</span>
      </Link>
      <span style={{ color: "#f6f6f6" }}> {">"} </span>
      {link && (
        <Link to={link} style={{ marginLeft: 7, textDecoration: "underline" }}>
          <span>{textName}</span>
        </Link>
      )}

      {search && (
        <span
          style={{
            marginLeft: 7,
            color: "white",
          }}>
          Search Results
        </span>
      )}
    </section>
  );
}

export default CustomBreadcrumbs;
