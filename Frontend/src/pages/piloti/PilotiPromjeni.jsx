import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { RoutesNames } from '../../constants';
import { dohvatiPorukeAlert } from '../../services/httpService';
import PilotService from '../../services/PilotService';

export default function PilotiPromjeni(){
    const [pilot, setPilot] = useState({});
  
    const routeParams = useParams();
    const navigate = useNavigate();


    async function dohvatiPilot() {
      const odgovor = await PilotService.getBySifra(routeParams.sifra);
      if(!odgovor.ok){
        alert(dohvatiPorukeAlert(odgovor.poruka));
        return;
      }
      setPilot(odgovor.poruka);
    }
  
    useEffect(() => {
        dohvatiPilot();
    }, []);
  
  
    async function promijeniPilot(pilot) {
      const odgovor = await PilotService.promjeni(routeParams.sifra, pilot);
      if (odgovor.ok) {
        navigate(RoutesNames.PILOTI_PREGLED);
      } else {
        alert(odgovor.poruka.errors);
      }
    }
  
    function handleSubmit(e) {
      e.preventDefault();
  
      const podaci = new FormData(e.target);
  
      promijeniPilot({
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
              placeholder='Ime pilota'
              defaultValue={pilot.ime}
              maxLength={50}
              required
            />
          </Form.Group>
  
          <Form.Group className='mb-3' controlId='prezime'>
            <Form.Label>Prezime</Form.Label>
            <Form.Control
              type='text'
              name='prezime'
              placeholder='Prezime pilota'
              defaultValue={pilot.prezime}
              maxLength={50}
              required
            />
          </Form.Group>
  
          <Form.Group className='mb-3' controlId='brojDozvole'>
            <Form.Label>Broj dozvole</Form.Label>
            <Form.Control
              type='text'
              name='brojDozvole'
              placeholder='Broj dozvole'
              defaultValue={pilot.brojDozvole}
              maxLength={15}
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
                Promijeni Pilota
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
}