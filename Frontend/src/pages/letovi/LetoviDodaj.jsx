import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LetService from "../../services/LetService";
import PilotService from "../../services/PilotService";
import ZrakoplovService from "../../services/ZrakoplovService";
import { RoutesNames } from '../../constants';
import { useEffect, useState } from "react";
import { dohvatiPorukeAlert } from "../../services/httpService";

export default function LetoviDodaj(){
    const navigate = useNavigate();

    const [piloti, setPiloti] = useState([]);
    const [pilotSifra, setPilotSifra] = useState(0);
  
    const [zrakoplovi, setZrakoplovi] = useState([]);
    const [zrakoplovSifra, setZrakoplovSifra] = useState(0);
  
    async function dohvatiPilote(){
      const odgovor = await PilotService.get();
      
      if(!odgovor.ok){
          alert(dohvatiPorukeAlert(odgovor.podaci));
          return;
      }

      setPiloti(odgovor.podaci);
      setPilotSifra(odgovor.podaci[0].sifra);
    }
  
    async function dohvatiZrakoplove(){
      const odgovor = await ZrakoplovService.get();
      
      if(!odgovor.ok){
          alert(dohvatiPorukeAlert(odgovor.podaci));
          return;
      }

      setZrakoplovi(odgovor.podaci);
      setZrakoplovSifra(odgovor.podaci[0].sifra);
    }
  
    async function ucitaj(){
      await dohvatiPilote();
      await dohvatiZrakoplove();
    }
  
    useEffect(()=>{
      ucitaj();
    },[]);
  
  
    async function dodajLet(flight) {
      const odgovor = await LetService.dodaj(flight);
      if (odgovor.ok) {
        navigate(RoutesNames.LETOVI_PREGLED);
      } else {
        alert(dohvatiPorukeAlert(odgovor.podaci));
      }
    }
  
    function handleSubmit(e) {
      e.preventDefault();
  
      const podaci = new FormData(e.target);
  
      dodajLet({
        vrijemePolijetanja: podaci.get('vrijemePolijetanja'),
        vrijemeSlijetanja: podaci.get('vrijemeSlijetanja'),
        preletKm: podaci.get('preletKm'),
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
                required
            />
          </Form.Group>
          
          <Form.Group className='mb-3' controlId='vrijemeSlijetanja'>
            <Form.Label>Vrijeme slijetanja</Form.Label>
            <Form.Control
                type='datetime-local'
                name='vrijemeSlijetanja'
                required
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='preletKm'>
            <Form.Label>Prelet (km)</Form.Label>
            <Form.Control
                type='number'
                step='any'
                name='preletKm'
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
                Dodaj Let
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
}