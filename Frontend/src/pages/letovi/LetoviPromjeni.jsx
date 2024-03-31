import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { RoutesNames } from '../../constants';
import { dohvatiPorukeAlert } from '../../services/httpService';
import LetService from "../../services/LetService";
import PilotService from "../../services/PilotService";
import ZrakoplovService from "../../services/ZrakoplovService";

export default function PilotiPromjeni(){
    const [flight, setFlight] = useState({});

    const [piloti, setPiloti] = useState([]);
    const [pilotSifra, setPilotSifra] = useState(0);
  
    const [zrakoplovi, setZrakoplovi] = useState([]);
    const [zrakoplovSifra, setZrakoplovSifra] = useState(0);
  
    const routeParams = useParams();
    const navigate = useNavigate();


    async function dohvatiLet() {
      const odgovor = await LetService.getBySifra(routeParams.sifra);
      if(!odgovor.ok){
        alert(dohvatiPorukeAlert(odgovor.poruka));
        return;
      }
      setFlight(odgovor.poruka);
      setPilotSifra(odgovor.poruka.pilot);
      setZrakoplovSifra(odgovor.poruka.zrakoplov);
    }
  
    async function dohvatiPilote(){
      const odgovor = await PilotService.get();
      setPiloti(odgovor.data);
    }
  
    async function dohvatiZrakoplove(){
      const odgovor = await ZrakoplovService.get();
      setZrakoplovi(odgovor.data);
    }

    async function ucitaj() {
        await dohvatiLet();
        await dohvatiPilote();
        await dohvatiZrakoplove();
    }
  
    useEffect(() => {
        ucitaj();
    }, []);
  
  
    async function promijeniLet(flight) {
      const odgovor = await LetService.promjeni(routeParams.sifra, flight);
      if (odgovor.ok) {
        navigate(RoutesNames.LETOVI_PREGLED);
      } else {
        alert(odgovor.poruka.errors);
      }
    }
  
    function handleSubmit(e) {
      e.preventDefault();
  
      const podaci = new FormData(e.target);
  
      promijeniLet({
        vrijemePolijetanja: podaci.get('vrijemePolijetanja'),
        vrijemeSlijetanja: podaci.get('vrijemeSlijetanja'),
        preletKm: podaci.get('preletKm') || null,
        pilot: parseInt(pilotSifra),
        zrakoplov: parseInt(zrakoplovSifra)
      });
    }
  
    return (
      <Container className='mt-4'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='vrijemePolijetanja'>
            <Form.Label>Vrijeme polijetanja</Form.Label>
            <Form.Control
                type='datetime-local'
                name='vrijemePolijetanja'
                defaultValue={flight.vrijemePolijetanja}
                required
            />
          </Form.Group>
          
          <Form.Group className='mb-3' controlId='vrijemeSlijetanja'>
            <Form.Label>Vrijeme slijetanja</Form.Label>
            <Form.Control
                type='datetime-local'
                name='vrijemeSlijetanja'
                defaultValue={flight.vrijemeSlijetanja}
                required
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='preletKm'>
            <Form.Label>Prelet (km)</Form.Label>
            <Form.Control
                type='number'
                step='any'
                name='preletKm'
                defaultValue={flight.preletKm}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='pilot'>
            <Form.Label>Pilot</Form.Label>
            <Form.Select onChange={(e)=>{setPilotSifra(e.target.value)}}>
                {piloti && piloti.map((p, index)=>(
                    <option key={index} value={p.sifra} selected={p.sifra === pilotSifra}>
                        {p.ime} {p.prezime}
                    </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3' controlId='zrakoplov'>
            <Form.Label>Zrakoplov</Form.Label>
            <Form.Select onChange={(e)=>{setZrakoplovSifra(e.target.value)}}>
                {zrakoplovi && zrakoplovi.map((z, index)=>(
                    <option key={index} value={z.sifra} selected={z.sifra === zrakoplovSifra}>
                        {z.tipZrakoplova} ({z.registracija})
                    </option>
                ))}
            </Form.Select>
          </Form.Group>
  
          <Row>
            <Col>
              <Link className='btn btn-danger gumb' to={RoutesNames.LETOVI_PREGLED}>
                Odustani
              </Link>
            </Col>
            <Col>
              <Button variant='primary' className='gumb' type='submit'>
                Promijeni Let
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
}