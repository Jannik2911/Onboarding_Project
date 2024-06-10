import React from "react";
import Layout from "./Layout";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "../App.css";

const faqs = [
  {
    title: "Ansprechpartner",
    details: [
      {
        name: "Max Mustermann",
        phone: "01 345 458",
        email: "mustermann@drv.de",
      },
    ],
  },
  {
    title: "Pausenregelung",
    details: [
      "Es ist eine Mittagspause von 30 Minuten beziehungsweise von 60 Minuten (nur bei Minderjährigen) vorgeschrieben.",
      "Die Mittagspause kann ab 11:30 Uhr flexibel gelegt werden.",
    ],
  },
  {
    title: "Kantine",
    details: [
      "Öffnungszeiten: 11:30 Uhr - 13:30 Uhr",
      <br />,
      "Informationen über den aktuellen Speiseplan finden Sie im Intranet. Dort ist eine Seite im Internet verlinkt.",
      "Morgens (von 07:30 Uhr bis 09:00 Uhr) kann man in der Kantine auch belegte Brötchen, Kakao, etc. kaufen.",
      "Im Vorraum der Kantine stehen Süßigkeitenautomaten und ein Getränkeautomat. Weitere Getränkeautomaten sind bei den Übergängen zum Erweiterungsbau aufgestellt (hier nur Bargeldzahlung möglich).",
      "Während der Mittagspause ist dort auch unser Café P geöffnet (sieht aus wie eine Baustelle, ist aber keine!), in dem Kaffee, Kuchen und Süßes verkauft werden.",
    ],
  },
  {
    title: "Öffnungszeiten Cafe P",
    details: ["Donnerstags 10:00 Uhr - 13:30 Uhr", "Freitags geschlossen"],
  },
  {
    title: "Mitarbeiterausweis als Casinocard",
    details: [
      "Vor der Cafeteria auf der linken Seite finden Sie Automaten, an denen Sie Ihren Mitarbeiterausweis mit Geld (nur mit Scheinen!) aufladen können.",
    ],
  },
  {
    title: "Geld",
    details: [
      "Einen Geldautomaten der Sparkasse finden Sie im Erdgeschoss neben der Auskunfts- und Beratungsstelle am Übergang vom Alt- in das Erweiterungsgebäude.",
    ],
  },
  {
    title: "Jugendaufenthaltsraum",
    details: [
      "Dies ist ein Pausenraum für alle Nachwuchskräfte, ausgestattet mit einer kleinen Sofasitzecke, mehreren Tischen und Stühlen. Bezüglich der Lage des Jugendaufenthaltsraumes wird auf Seite 5 dieser Broschüre verwiesen.",
    ],
  },
  {
    title: "Teeküchen",
    details: [
      "Die sogenannten Teeküchen befinden sich jeweils am Ende der Flügel (Seite 5) und können ebenfalls für die Pausen genutzt werden.",
      "In jeder Teeküche steht ein Kühlschrank, welcher für die Lagerung von Lebensmitteln genutzt werden darf. Die Lebensmittel sind mit Ihrem Namen und der aktuellen Abschnittsnummer zu versehen, ansonsten werden diese entsorgt.",
      "Bitte beachten Sie, dass Sie Ihre Lebensmittel beim Wechsel in einen anderen Abschnitt oder in die HSPV/Berufskolleg aus dem Kühlschrank entfernen!",
    ],
  },
  {
    title: "Kaffeeautomaten im Ausbildungsreferat",
    details: [
      "In jeder Teeküche befinden sich zwei Kaffeemaschinen. Es bietet sich an, sich mit mehreren Leuten zusammenzuschließen, um Kaffee zu kochen. Dann werden die Kaffeemaschinen nicht für einzelne Tassen in Betrieb genommen.",
      "Die Filter stehen zur Verfügung. Das Kaffeepulver muss selbst mitgebracht werden.",
      "Für einzelne Tassen Kaffee befindet sich in der Teeküche gegenüber des Jugendaufenthaltsraumes ein vollautomatischer Kaffeeautomat. Dort sind verschiedene Getränke wie Cappuccino, Kaffee, Latte Macchiato und Espresso gegen kleines Geld (jeweils 0,50 Euro) erhältlich. Heißes Wasser für Tee ist an diesem Automaten ebenfalls erhältlich und kostenfrei!",
    ],
  },
  {
    title: "Krankmeldung",
    details: [
      "Wenn Sie morgens feststellen, dass Sie arbeits- beziehungsweise dienstunfähig sind, rufen Sie bitte sofort Ihre Abschnittsleiterin/Ihren Abschnittsleiter an (vor Beginn der Kernarbeitszeit, also vor 09:00 Uhr)!",
      "Wichtig bei Sozifas: Bitte angeben, ob mit oder ohne AU-Attest.",
      "Die Krankmeldung sollte vorrangig bei dem eigenen Ausbilder erfolgen. Sollte dieser nicht erreichbar sein, so melden Sie sich bitte bei Ihrem Abschnittsleiter.",
      "Sie sind verpflichtet, spätestens ab dem vierten Krankheitstage eine entsprechende Bescheinigung Ihrer Ärztin/Ihres Arztes vorzulegen. Bitte beachten Sie hierbei, dass das Wochenende bei den Krankheitstagen berücksichtigt wird. Sollten Sie beispielsweise ab freitags arbeits- beziehungsweise dienstunfähig sein, so müssen Sie spätestens am Montag eine Arbeitsunfähigkeits-/Dienstunfähigkeitsbescheinigung vorlegen.",
      "Bitte melden Sie sich nach Ende Ihrer Arbeitsunfähigkeit am ersten Arbeitstag morgens bei Frau XXX oder Frau XXX (Referatssekretariat) wieder gesund.",
    ],
  },
];

const Info = () => {
  return (
    <Layout headerText="Informationen">
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Häufig gestellte Fragen (FAQ)
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.title}</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              {Array.isArray(faq.details) ? (
                faq.details.map((detail, detailIndex) =>
                  typeof detail === "string" ? (
                    <Typography key={detailIndex} className="faq-text" paragraph>
                      {detail}
                    </Typography>
                  ) : (
<<<<<<< HEAD
                    <Typography key={detailIndex} className="faq-text" paragraph>
=======
                    <div key={detailIndex} className="faq-text">
>>>>>>> 396383d2d2c5ede6731716a017f4098e0c52fe96
                      {detail.name && <div>{detail.name}</div>}
                      {detail.phone && (
                        <div>
                          Telefon:{" "}
                          <a href={`tel:${detail.phone}`}>{detail.phone}</a>
                        </div>
                      )}
                      {detail.email && <div>Email: {detail.email}</div>}
                      {detail.days && <div>{detail.days}</div>}
                      {detail.hours && <div>{detail.hours}</div>}
                    </div>
                  )
                )
              ) : (
                <Typography className="faq-text" paragraph>
                  {faq.details}
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Layout>
  );
};

export default Info;
