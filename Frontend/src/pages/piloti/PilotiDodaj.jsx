import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PilotService from '../../services/PilotService';
import { RoutesNames } from '../../constants';


export default function PilotiDodaj() {
  const navigate = useNavigate();


  async function dodajPilot(Pilot) {
    const odgovor = await PilotService.dodaj(Pilot);
    if (odgovor.ok) {
      navigate(RoutesNames.PILOTI_PREGLED);
    } else {
      alert(odgovor.poruka.errors);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodajPilot({
      ime: podaci.get('ime'),
      prezime: podaci.get('prezime'),
      brojDozvole: podaci.get('brojDozvole'),
     
    });
  }

  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='ime'>
          <Form.Label>Ime</Form.Label>
          <Form.Control
            type='text'
            name='ime'
            placeholder='Ime Pilota'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='prezime'>
          <Form.Label>Prezime</Form.Label>
          <Form.Control
            type='text'
            name='prezime'
            placeholder='Prezime Pilota'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='brojDozvole'>
          <Form.Label>BrojDozvole</Form.Label>
          <Form.Control
            type='text'
            name='brojDozvole'
            placeholder='OIB Predavaca'
            maxLength={11}
          />
        </Form.Group>

        

        
       

        <Row>
          <Col>
            <Link className='btn btn-danger gumb' to={RoutesNames.PILOTI_PREGLED}>
              Odustani
            </Link>
          </Col>
          <Col>
            <Button variant='primary' className='gumb' type='submit'>
              Dodaj Pilota
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}