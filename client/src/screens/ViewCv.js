import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewCv = () => {
  const [applicants, setApplicants] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/applicant')
      .then((response) => {
        console.log(response.data);
        setApplicants(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener solicitantes:', error);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Solicitantes</h2>
      {applicants.map((value, key) => (
        <Card
          key={key}
          className="mb-3"
          onClick={() => { navigate(`/applicant/${value.id}`); }}
          style={{ cursor: 'pointer' }}
        >
          <Card.Body>
            <Card.Title>{value.jobTitle}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{value.company}</Card.Subtitle>
            <Card.Text>
              <strong>Descripción:</strong> {value.description}
              <br />
              <strong>Educación:</strong> {value.education}
              <br />
              <strong>Años de experiencia:</strong> {value.yearsExperience}
              <br />
              <strong>Idioma:</strong> {value.languageSkills}
              <br />
              <strong>Certificaciones:</strong> {value.certifications}
              <br />
              <strong>Habilidades:</strong> {value.technicalSkills}
            </Card.Text>
            <Button variant="primary">Ver Detalles</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default ViewCv;
