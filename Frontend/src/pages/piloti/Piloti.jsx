import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import PilotService from "../../services/PilotService";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { useNavigate } from "react-router-dom";
import { dohvatiPorukeAlert } from "../../services/httpService";

export default function Piloti(){
    const [piloti,setPiloti] = useState();
    let navigate = useNavigate(); 

    async function dohvatiPilote(){
        const odgovor = await PilotService.get();

        if (!odgovor.ok){
            alert(dohvatiPorukeAlert(odgovor.podaci));
            return;
        }

        setPiloti(odgovor.podaci);
    }

    useEffect(()=>{
        dohvatiPilote();
    }, []);

    async function obrisiPilot(sifra) {
        const odgovor = await PilotService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiPilote();
        } else {
            alert(dohvatiPorukeAlert(odgovor.podaci));
        }
      }

    return (

        <Container>
            <Link to={RoutesNames.PILOTI_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Broj dozvole</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {piloti && piloti.map((pilot,index)=>(
                        <tr key={index}>
                            <td>{pilot.ime}</td>
                            <td>{pilot.prezime}</td>
                            <td>{pilot.brojDozvole}</td>
                            
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/piloti/${pilot.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiPilot(pilot.sifra)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}