import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { RoutesNames } from '../../constants';
import { dohvatiPorukeAlert } from '../../services/httpService';
import ZrakoplovService from "../../services/ZrakoplovService";

export default function ZrakoploviPromjeni(){
    const [zrakoplov, setZrakoplov] = useState({});
  
    const routeParams = useParams();
    const navigate = useNavigate();


    async function dohvatiZrakoplov() {
      const odgovor = await ZrakoplovService.getBySifra(routeParams.sifra);
      if(!odgovor.ok){
        alert(dohvatiPorukeAlert(odgovor.podaci));
        return;
      }
      setZrakoplov(odgovor.podaci);
    }
  
    useEffect(() => {
        dohvatiZrakoplov();
    }, []);
  
  
    async function promijeniZrakoplov(zrakoplov) {
      const odgovor = await ZrakoplovService.promjeni(routeParams.sifra, zrakoplov);
      if (odgovor.ok) {
        navigate(RoutesNames.ZRAKOPLOVI_PREGLED);
      } else {
        alert(dohvatiPorukeAlert(odgovor.podaci));
      }
    }
  
    function handleSubmit(e) {
      e.preventDefault();
  
      const podaci = new FormData(e.target);
  
      promijeniZrakoplov({
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
              defaultValue={zrakoplov.tipZrakoplova}
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
              defaultValue={zrakoplov.registracija}
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
                Promijeni Zrakoplov
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
}