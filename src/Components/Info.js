import React from 'react';
import Layout from './Layout';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Info = () => {
  return (
    <Layout headerText={"Informationen"}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Häufig gestellte Fragen (FAQ)
        </Typography>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Ansprechpartner für Personalangelegenheiten</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Max Mustermann<br />
              Telefon: 01234 567890<br />
              Email: max.mustermann@behoerde.de
            </Typography>
            <Typography>
              Erika Musterfrau<br />
              Telefon: 09876 543210<br />
              Email: erika.musterfrau@behoerde.de
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Ansprechpartner für IT-Angelegenheiten</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              IT Support Team<br />
              Telefon: 01111 222333<br />
              Email: it.support@behoerde.de
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Öffnungszeiten der Behörde</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Montag - Freitag: 08:00 - 16:00 Uhr<br />
              Samstag: 09:00 - 12:00 Uhr<br />
              Sonntag: Geschlossen
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Verhaltensregeln in der Behörde</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1. Freundlicher und respektvoller Umgang miteinander.<br />
              2. Pünktlichkeit bei Terminen.<br />
              3. Einhaltung der Datenschutzrichtlinien.<br />
              4. Sauberkeit und Ordnung in den Büroräumen.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Layout>
  );
};

export default Info;
