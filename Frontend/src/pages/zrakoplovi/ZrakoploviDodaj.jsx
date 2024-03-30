import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ZrakoplovService from "../../services/ZrakoplovService";
import { RoutesNames } from '../../constants';

export default function ZrakoploviDodaj(){
    const navigate = useNavigate();
  
  
    async function dodajZrakoplov(zrakoplov) {
      const odgovor = await ZrakoplovService.dodaj(zrakoplov);
      if (odgovor.ok) {
        navigate(RoutesNames.ZRAKOPLOVI_PREGLED);
      } else {
        alert(odgovor.poruka.errors);
      }
    }
  
    function handleSubmit(e) {
      e.preventDefault();
  
      const podaci = new FormData(e.target);
  
  
      dodajZrakoplov({
        tipZrakoplova: podaci.get('tipZrakoplova'),
        registracija: podaci.get('registracija')
      });
    }
  
    return (
      <Container className='mt-4'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='tipZrakoplova'>
            <Form.Label>Tip zrakoplova</Form.Label>
            <Form.Control
              type='text'
              name='tipZrakoplova'
              placeholder='Tip zrakoplova'
              maxLength={50}
              required
            />
          </Form.Group>
  
          <Form.Group className='mb-3' controlId='registracija'>
            <Form.Label>Registracija</Form.Label>
            <Form.Control
              type='text'
              name='registracija'
              placeholder='Registracija'
              maxLength={15}
            />
          </Form.Group>
  
          <Row>
            <Col>
              <Link className='btn btn-danger gumb' to={RoutesNames.ZRAKOPLOVI_PREGLED}>
                Odustani
              </Link>
            </Col>
            <Col>
              <Button variant='primary' className='gumb' type='submit'>
                Dodaj Zrakoplov
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
}